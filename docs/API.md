# Mobil app üçün API (Supabase) — usta paneli

> Mobil app **birbaşa Supabase-ə** müraciət edir (qərar A, 2026-11-06): publishable açar + istifadəçi JWT + RLS. Ayrıca REST server yoxdur.
> "Endpoint" burada = **cədvəl sorğusu** (`supabase.from`), **RPC** (`supabase.rpc`), **Storage** bucket-i, **Realtime** kanalı və ya **Auth**.
> Mənbə: web usta panelinin servisləri (`web/src/services/*`) + canlı baza (2026-11-06, miqrasiyalar `0001`–`0105`). Baza dəyişəndə bu faylı yenilə.
> Tiplər: `supabase/database.types.ts` (mobilə `scripts/split-db-types.mjs` ilə kopyalanacaq).

## 0. Ümumi qaydalar

| Mövzu | Qayda |
|---|---|
| Layihə | `roodclienblwrrlswmty` (Frankfurt). URL: `https://roodclienblwrrlswmty.supabase.co` |
| Açar | yalnız **publishable** açar (`.env`: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`). Service role açarı app-də **heç vaxt** olmur |
| Təhlükəsizlik | bütün yetki bazadadır (RLS + `security definer` funksiyalar). App-də düymə gizlətmək yalnız görünüşdür |
| Xətalar | RPC/trigger xətaları `error.message`-də **Azərbaycanca hazır mətndir** (məs. "Keçmiş günün tapşırığı dəyişmir") — birbaşa tostda göstər. `error.code === "42501"` = icazə yoxdur |
| Vaxt | iş günü **Bakı vaxtı** ilə (`Asia/Baku`, UTC+4). Tarix sütunları (`work_date`, `task_date`, `day`) `YYYY-MM-DD`; vaxt sütunları `timestamptz` (UTC gəlir, Bakıya çevir). Bazada `baku_today()` var |
| Rəqəmlər | `numeric` sütunlar (miqdar, litr, məbləğ) JSON-da **rəqəm və ya sətir** gələ bilər → həmişə `Number(x)` |
| Böyük siyahılar | PostgREST bir sorğuda max 1000 sətir qaytarır → `.range(a, b)` ilə səhifələ (web `lib/fetchAll`) |
| Geriyə uyğunluq | telefonda köhnə versiya qalır: bazada sütun silinmir/adı dəyişmir, yenisi əlavə olunur |
| Qrup tapşırığı | sayda qrup **1 tapşırıqdır**: `distinct coalesce(group_id, id)` |

### Klient (React Native)
```ts
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(URL, KEY, {
  auth: { storage: mmkvStorageAdapter, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
});
// AppState: aktiv → supabase.auth.startAutoRefresh(), fon → stopAutoRefresh()
```

---

## 1. Auth

| Əməliyyat | Çağırış | Qeyd |
|---|---|---|
| Giriş | `supabase.auth.signInWithPassword({ email, password })` | qeydiyyat (signup) **bağlıdır**, hesabları admin açır |
| Çıxış | `supabase.auth.signOut()` | sonra keşi (MMKV/TanStack) təmizlə |
| Sessiya | `supabase.auth.getSession()` / `onAuthStateChange` | token MMKV-də saxlanır |
| Parol bərpası | yoxdur (admin `admin-accounts` Edge Function ilə sıfırlayır) | |

### Giriş edəndən sonra ilk sorğular ("chrome")
| Nə | Çağırış | Cavab |
|---|---|---|
| Mənim əməkdaş id-im | `rpc("my_employee_id")` | `bigint \| null` — `null` = əməkdaş kartı yoxdur (usta funksiyaları gizlənir) |
| Əməkdaş kartım | `from("employees").select("id, full_name, position, photo_url, has_car").eq("user_id", uid).maybeSingle()` | `uid` = `session.user.id` |
| Profil | `from("profiles").select("full_name").eq("id", uid).maybeSingle()` | |
| Depo məsuluyam? | `rpc("can_manage_tools")` | `boolean` — Depo bölməsini göstər/gizlət |
| Adminəm? | `rpc("is_admin")` | `boolean` |
| Rəhbərlikdənəm? | `rpc("is_management")` | `boolean` — Elan göndərmə formu |

> Tövsiyə: bunları bir RPC-də birləşdirmək (məs. `app_bootstrap()`) — açılışda 1 sorğu. Hələ yoxdur, lazım olsa miqrasiya yazılır.

---

## 2. Panel — "Mənim günüm"

| Nə | Çağırış | Qeyd |
|---|---|---|
| Bu gün yazılan işlərim | `from("work_logs").select("id", { count: "exact", head: true }).eq("employee_id", me).eq("work_date", today)` | `count` |
| Bu ay işlərim | eyni, `.gte("work_date", "YYYY-MM-01").lte("work_date", today)` | |
| Bugünkü tapşırıqlarım | `from("tasks").select("done").eq("employee_id", me).eq("task_date", today).is("cancelled_at", null)` | cəmi / görülən |
| Məndə olanlar | `from("tool_assignments").select("quantity, tools(kind)").eq("employee_id", me).is("returned_at", null)` | alət = `kind='tool'` miqdar cəmi; material = sətir sayı |
| Bugünkü davamiyyətim | `from("attendance").select("checked_in_at, checked_out_at").eq("employee_id", me).eq("day", today).order("checked_in_at")` | gündə bir neçə seans ola bilər; açıq seans = `checked_out_at is null` |
| **İşə gəldim** | `rpc("check_in")` → `timestamptz` | bazar günü də işləyir (əlavə gün); "işdə olmayıb" qeyd olunan gün bloklanır; işi bitirəndən sonra yenidən çağırmaq = "Yenidən işə çıxdım" (yeni seans) |
| **İşi bitirdim** | `rpc("check_out")` → `timestamptz` | açıq seansı bağlayır |
| İcazəli gündə "İcazəyə ehtiyac qalmadı" | 1) `from("leave_requests").select("id").eq("employee_id", me).eq("status","approved").lte("date_from", today).gte("date_to", today).maybeSingle()` 2) `rpc("leave_cancel", { p_id })` 3) `rpc("check_in")` | |

### Panel statistikası (ay)
| Nə | Çağırış |
|---|---|
| Ayın işləri | `from("work_logs").select("id, work_date, place_text, stores(name, companies(name)), companies(name)").eq("employee_id", me).gte("work_date", from).lte("work_date", to)` |
| Keçən ayın sayı | `from("work_logs").select("id", { count: "exact", head: true }).eq("employee_id", me).gte(...).lte(...)` |

---

## 3. Görülən işlər (hamının, günə görə)

| Nə | Çağırış |
|---|---|
| Günün işləri | `from("work_logs").select("id, created_at, description, place_text, employees(full_name, photo_url), stores(name, companies(name)), companies(name)").eq("work_date", day).order("created_at", { ascending: false })` |
| Qrup xəritəsi (qrup işini bir sətirə birləşdirmək) | `from("tasks").select("work_log_id, group_id, work_logs!inner(work_date)").not("group_id","is",null).not("work_log_id","is",null).gte("work_logs.work_date", from).lte("work_logs.work_date", to)` — **iş tarixinə görə**, `task_date`-ə yox (sabaha planlanıb bu gün görülən tapşırıqda fərqlidir) |
| Fayl sayları | `rpc("work_file_counts", { p_log_ids: number[] })` → `{ work_log_id, act, photo, video }[]` (qrup üzrə cəm) |

### İş detalı (pəncərə)
```ts
from("work_logs").select(`id, work_date, created_at, description, place_text,
  employees(full_name, photo_url, specialty),
  stores(code, name, address, lat, lng, companies(name)),
  companies(name, address, lat, lng),
  work_files(id, kind, path),
  tasks(reason, note, group_id),
  work_log_materials(id, amount, tools(name, unit))`).eq("id", id).maybeSingle()
```
- Qrupdursa (`tasks[0].group_id`): üzvlər `from("tasks").select("work_log_id, employees(full_name, photo_url, specialty)").eq("group_id", g).is("cancelled_at", null)`; digər üzvlərin faylları `from("work_files").select("id, kind, path").in("work_log_id", ids)`.
- Fayl linkləri: `storage.from("work").createSignedUrls(paths, 3600)` (bucket gizlidir).

---

## 4. Tapşırıqlar

**Cədvəl `tasks`**: `id, employee_id, task_date, store_id | company_id | place_text, reason, done, done_at, note, work_log_id, cancelled_at, cancelled_by, reassigned_to, group_id, created_by, created_at`.
Tapşırığı admin/rəhbərlik verir; usta yalnız **öz** tapşırığına "görüldü" qoyur və qeyd yazır. **Keçmiş günün tapşırığı bağlıdır** (bazada bloklanır).

| Nə | Çağırış | Qeyd |
|---|---|---|
| Günün tapşırıqları (hamı) | `from("tasks").select("id, employee_id, group_id, reason, done, note, work_log_id, place_text, cancelled_at, reassigned_to, stores(name, code, companies(name)), companies(name), work_logs(description, work_files(id, kind))").eq("task_date", day).order("created_at")` | öz tapşırıqların = `employee_id === me` |
| Ustalar (komanda) | `from("employees").select("id, full_name, photo_url").eq("is_management", false).eq("is_active", true).order("full_name")` | |
| Geri alınıb → kimə | `from("tasks").select("id, employees(full_name)").in("id", reassignedIds)` | `cancelled_at` doludursa üstüxətli, işarələnmir |
| Həftə zolağı | `from("tasks").select("task_date, employee_id, group_id").gte("task_date", from).lte("task_date", to).is("cancelled_at", null)` | |
| Açıq tapşırıq sayı (nişan) | `from("tasks").select("id", { count: "exact", head: true }).eq("employee_id", me).eq("task_date", today).eq("done", false).is("cancelled_at", null)` | |
| **Görüldü / geri** | `rpc("task_set_done", { p_task_id, p_done })` | iş qeydini **avtomatik** yaradır (`work_log_id`); qrupda biri basanda hamı üçün görülür, hər üzvə öz iş qeydi. **Optimistik** et |
| **Təmir qeydi** (mətn) | `rpc("task_set_note", { p_task_id, p_note })` → `work_log_id` | sonra faylları həmin `work_log_id`-yə yüklə (§6) |
| Qeydin faylları | `from("work_files").select("id, kind, path").eq("work_log_id", logId).order("id")` + signed URL | |

---

## 5. İş qeydi (əl ilə; web-də yalnız Ctrl+K ilə açılır)

| Nə | Çağırış | Qeyd |
|---|---|---|
| Yerlər siyahısı | `from("stores").select("id, code, name, address, companies(name)")` + `from("companies").select("id, name, address, stores(count)").eq("kind","company").order("name")` | filialsız şirkət = "Sabit məkan"; ~410 mağaza — keşlə |
| Yeni | `from("work_logs").insert({ employee_id: me, work_date, store_id \| company_id \| place_text, description }).select("id").single()` | üçündən biri mütləqdir (check); `place_text` 1–120 simvol |
| Dəyiş | `from("work_logs").update(fields).eq("id", id)` | yalnız sahibi və ya admin |
| Sil | `from("work_logs").delete().eq("id", id).select("id")` → sonra `storage.from("work").remove(paths)` | boş cavab = icazə yoxdur |
| Məndəki materiallar | `from("tool_assignments").select("quantity, tools(id, name, unit, kind)").eq("employee_id", me).is("returned_at", null)` → `kind='material'` | |
| İşlədilən material | `from("work_log_materials").insert([{ work_log_id, tool_id, amount }])`; dəyişəndə əvvəl `.delete().eq("work_log_id", id)` | yalnız məlumat, depoda say dəyişmir |
| Usta+gün işləri | `from("work_logs").select("id, work_date, created_at, description, employee_id, store_id, company_id, place_text, stores(code, name, companies(name)), companies(name), work_files(id, kind, path)").eq("employee_id", id).eq("work_date", day).order("id", { ascending: false })` | |

---

## 6. Fayllar (Storage)

| Bucket | Açıq? | Limit | MIME | Yol | Kim yazır |
|---|---|---|---|---|---|
| `work` | yox → signed URL | 50 MB | jpeg, png, webp, heic, pdf, mp4 | `<work_log_id>/<uuid>.<ext>` | usta öz işinə; silmək sahibi/admin |
| `avatars` | bəli → `getPublicUrl` | 2 MB | webp, jpeg, png | `<employee_id>/<uuid>.webp` (512 px kvadrat) | özü və ya admin |
| `mileage` | yox | 6 MB | jpeg, png, webp, heic | `<employee_id>/<YYYY-MM-DD>-<start\|end>-<uuid>.webp` | özü |
| `depot` | yox | 5 MB | jpeg, png, webp, heic, pdf | `<YYYY-MM>/<uuid>.<ext>` | sənəd yaradan |

**İş faylı yükləmə ardıcıllığı** (hər fayl üçün):
1. Sıx: şəkil uzun tərəfi akt `2400`, şəkil `1600` px → webp/jpeg (`expo-image-manipulator`).
2. `storage.from("work").upload(path, body, { contentType })`
3. `from("work_files").insert({ work_log_id, kind: "act" | "photo" | "video", path })`
Silmə: `storage.remove(paths)` + `from("work_files").delete().in("id", ids)`.

**Profil şəkli**: `storage.from("avatars").upload(...)` → `rpc("set_employee_photo", { p_employee_id, p_url })` (yeganə yol; `employees.photo_url`-u birbaşa yazmaq bloklanır) → köhnə faylı `remove`.

---

## 7. Davamiyyət və icazələr

| Nə | Çağırış |
|---|---|
| Ay (hamı və ya bir usta) | `from("attendance").select("employee_id, day, checked_in_at, checked_out_at").gte("day", from).lte("day", to)` (+ `.eq("employee_id", id)`) |
| İcazələr aralıqda | `from("leave_requests").select("id, employee_id, date_from, date_to, reason, status, created_at").lte("date_from", to).gte("date_to", from)` |
| "İşdə olmayıb" qeydləri | `from("attendance_absences").select("employee_id, day").gte("day", from).lte("day", to)` |
| Ustalar | `from("employees").select("id, full_name, photo_url, specialty").eq("is_management", false).eq("is_active", true).order("full_name")` |
| İcazələrim | `from("leave_requests").select("id, employee_id, date_from, date_to, reason, status, created_at, decided_at").eq("employee_id", me).order("date_from", { ascending: false }).limit(300)` |
| **İcazə istə** | `from("leave_requests").insert({ employee_id: me, date_from, date_to, reason })` |
| Gözləyən sorğunu sil | `from("leave_requests").delete().eq("id", id)` |
| Təsdiqlənmişdən imtina | `rpc("leave_cancel", { p_id })` (başlayıbsa keçmiş günlər qalır) |

- `leave_requests.status`: `pending | approved | rejected | cancelled`. Təsdiqlənmiş icazə işdə olmaqdan üstündür.
- Sayım qaydaları (6 günlük həftə, bazar = əlavə, `ATTENDANCE_START = 2026-10-01`): web `lib/attendance.ts` — app-ə eyni məntiq köçürülməlidir.

---

## 8. Alətlərim (depo — usta tərəfi)

| Nə | Çağırış |
|---|---|
| Məndə olanlar | `from("tool_assignments").select("id, tool_id, quantity, taken_at, received_at, disputed_at, tools(name, kind, unit, pack_name, pack_size)").eq("employee_id", me).is("returned_at", null).order("taken_at")` |
| Sorğularım | `from("depot_requests").select("*").eq("employee_id", me).in("type", ["return","request","writeoff"]).order("created_at", { ascending: false }).limit(60)` |
| Depodakı qalıq | `from("tool_stock").select("*").order("name")` (view: `quantity, given_out, available, kind, unit, pieces_count, pieces_total, pack_name, pack_size, min_stock, in_repair`) |
| Kimdə nə var | `from("tool_assignments").select("id, tool_id, employee_id, quantity, taken_at, employees(full_name, photo_url), tools(name, kind, unit, pack_name, pack_size)").is("returned_at", null).order("taken_at")` |
| **Aldım / Almadım** | `rpc("assignment_confirm", { p_id, p_received })` — `received_at is null and disputed_at is null` olanlar təsdiq gözləyir |
| **Alət istə** (çoxlu) | hər sətir: `rpc("depot_request_create", { p_tool_id, p_quantity, p_note, p_batch })` — hamısında eyni `p_batch` (uuid) |
| **Qaytar** | `rpc("depot_return_create", { p_assignment_id, p_quantity, p_used, p_returned, p_note })` — alətdə yalnız `p_quantity` (tam ədəd); materialda `p_returned` qaytarılan, `p_used` işlədilən, qalan ustada qalır |
| Sorğunu geri götür | `rpc("depot_request_cancel", { p_id })` |

- `depot_requests.type`: `receipt | return | writeoff | count | request`; `status`: `pending | approved | rejected | cancelled`; `reason` (silinmə): `broken | lost | stolen | used | other`.
- Miqdar: alət yalnız tam ədəd; material kəsr ola bilər (`numeric(12,2)`). Qablı material (`pack_name` + `pack_size`, məs. balon = 11,3 kq): bazaya **həmişə vahidlə** (kq) göndər, balonu UI-da çevir.

### Depo (yalnız `can_manage_tools() = true`) — mobil 1-ci mərhələdə yoxdur
`tool_stock`, `tool_assignments`, `material_pieces`, `depot_requests (status=pending)`, `tool_repairs`; RPC-lər: `depot_decide`, `depot_receipt_create`, `depot_writeoff_create`, `depot_count_create`, `give_tool`, `give_piece`, `return_tool`, `settle_material`, `tool_repair_send`, `tool_repair_finish`. Lazım olanda web `services/depot/*`-ə bax.

---

## 9. Yanacaq (maşını olan usta: `employees.has_car`)

| Nə | Çağırış |
|---|---|
| Maşınım | `from("employees").select("id, has_car, car_plate, car_model, fuel_per_100, fuel_type").eq("id", me).maybeSingle()` |
| Yürüşlər (aralıq) | `from("mileage_logs").select("*").eq("employee_id", me).gte("day", from).lte("day", to).order("day", { ascending: false })` |
| Bu gün | `from("mileage_logs").select("*").eq("employee_id", me).eq("day", today).maybeSingle()` |
| Qiymətlər | `from("fuel_settings").select("petrol_price, diesel_price").eq("id", 1).maybeSingle()` |
| Ödənişlər | `from("fuel_payments").select("*").eq("employee_id", me).gte("day", from).lte("day", to).order("day", { ascending: false })` |
| **Səhər km** (yeni gün) | şəkil → `mileage` bucket; `from("mileage_logs").insert({ employee_id: me, start_km, start_photo })` |
| Səhəri düzəlt / **Axşam km** | `from("mileage_logs").update({ start_km, start_photo? } \| { end_km, end_photo? }).eq("id", todayId)` — km, litr, məbləğ bazada hesablanır (`mileage_guard`) |
| Şəkil linki | `storage.from("mileage").createSignedUrl(path, 3600)` |
| **Pulu aldım / almadım** | `rpc("fuel_payment_confirm", { p_id, p_received })` — "Aldım" geri alınmır; `status`: `pending | received | disputed` |

---

## 10. Elanlar

| Nə | Çağırış |
|---|---|
| Siyahı | `from("announcements").select("id, title, body, created_by, created_by_name, created_at").order("created_at", { ascending: false }).limit(100)` |
| Oxunmamış say (nişan) | `rpc("unread_announcements")` → `integer` |
| Hamısı oxundu | `rpc("mark_announcements_seen")` (Elanlar ekranı açılanda) |
| Göndər (yalnız rəhbərlik) | `from("announcements").insert({ title, body })` — `42501` = icazə yoxdur |
| Sil | `from("announcements").delete().eq("id", id)` |

---

## 11. Digər bölmələr (oxu)

| Bölmə | Çağırış |
|---|---|
| Şirkətlər / Marketlər | `from("companies").select("id, name, phone, address, contact_person, stores(lat, lng)").eq("kind", "company" \| "market").order("name")` |
| Şirkət detalı | `from("companies").select("*").eq("id", id).maybeSingle()` + `from("stores").select("*").eq("company_id", id).order("code")` |
| Yer tarixçəsi (mağaza) | `from("work_logs").select("id, work_date, created_at, description, employees(full_name, photo_url), stores(code, name)").eq("store_id", id).order("work_date", { ascending: false }).order("created_at", { ascending: false }).limit(150)` |
| Yer tarixçəsi (şirkət + filiallar) | eyni `.eq("company_id", id)` **və** `select("..., s:stores!inner(company_id)").eq("s.company_id", id)` — iki sorğu, birləşdir |
| Axtarış (şirkət/mağaza) | `from("companies").select("id, name, kind").ilike("name", "%söz%").limit(5)` + `from("stores").select("id, code, name, address, company_id, companies(name, kind)").or("name.ilike.%s%,code.ilike.%s%,address.ilike.%s%").limit(8)` — `%_,()*` simvollarını təmizlə |
| Yerin koordinatı (usta qoyur) | `rpc("place_set_location", { p_kind: "store" \| "company", p_id, p_lat, p_lng, p_address, p_accuracy })` |
| Ustalar | `from("employees").select("*").eq("is_management", false).eq("is_active", true).order("full_name")` + bugünkü `attendance`, `leave_requests (approved)` |
| Rəhbərlik | `from("employees").select("*").eq("is_management", true).eq("is_active", true).order("full_name")` |
| Xəta kodları | `from("ac_models").select("id, name").order("name")` + `from("ac_error_codes").select("id, model_id, code, title, solution").order("code")` — dəyişmir, uzun keşlə |

> "Yol tap" / naviqasiya web-də qəsdən yoxdur, **mobil app üçün nəzərdə tutulub**: `stores.lat/lng`, `companies.lat/lng` → Google Maps / Waze linki (web git `019f8e4`, `lib/navigation.ts`: `directionsUrl`, `wazeUrl`).

---

## 12. Realtime

Publikasiyadakı cədvəllər: `tasks, attendance, leave_requests, attendance_absences, tool_assignments, depot_requests, mileage_logs, fuel_payments, announcements, work_files` (0107) (`contact_requests` yalnız admin üçündür).

**Vacib**: kanal açmazdan əvvəl `await supabase.realtime.setAuth(session.access_token)` — yoxsa anon kimi qoşulur və RLS-ə görə hadisə gəlmir. Token yenilənəndə (`onAuthStateChange: TOKEN_REFRESHED`) yenidən `setAuth`.

**Bir ümumi kanal** (web `services/myTasks/panelLive.ts` ilə eyni):
```ts
supabase.channel("panel")
  .on("postgres_changes", { event: "*",      schema: "public", table: "tasks" }, onTask)
  .on("postgres_changes", { event: "UPDATE", schema: "public", table: "leave_requests" }, onLeave)
  .on("postgres_changes", { event: "*",      schema: "public", table: "tool_assignments" }, onAssign)
  .on("postgres_changes", { event: "*",      schema: "public", table: "depot_requests" }, onDepot)
  .on("postgres_changes", { event: "*",      schema: "public", table: "announcements" }, onAnnounce)
  .on("postgres_changes", { event: "*",      schema: "public", table: "attendance" }, onAttendance)
  .on("postgres_changes", { event: "*",      schema: "public", table: "attendance_absences" }, onAttendance)
  .subscribe();
// Yanacaq ekranı: filter: `employee_id=eq.${me}` ilə fuel_payments + mileage_logs
```
Hadisə gələndə uyğun TanStack açarını `invalidateQueries` et (dövri sorğu yox). App fondan qayıdanda kanal qopmuş ola bilər → yenidən qoş + açarları təzələ.

---

## 13. Push bildirişləri

Hazırkı sistem (Web Push): baza `notify_employee/notify_user/notify_all` → `notifications` cədvəli → pg_net → Edge Function `push` → `push_subscriptions` (endpoint, p256dh, auth). Abunə: `rpc("push_subscribe", { p_app, p_endpoint, p_p256dh, p_auth, p_user_agent })`, ləğv `rpc("push_unsubscribe", { p_endpoint })`.

**Mobil (Expo Push, 0106)**: ayrıca cədvəl `push_tokens (user_id, token unique, platform android|ios)`; `push_subscriptions` toxunulmayıb. Qeydiyyat hər girişdə/açılışda: `rpc("register_push_token", { p_token, p_platform })` (upsert; telefon hesab dəyişəndə token yeni sahibə keçir). Çıxışda: `rpc("unregister_push_token", { p_token })` (token MMKV-də, `pushTokenStore`). Edge Function `push` (v3) eyni bildirişi Web Push + Expo Push API-yə (`https://exp.host/--/api/v2/push/send`, kanal `default`, `data: { id, kind, url }`) göndərir; `DeviceNotRegistered` tokeni silinir. Bildirişin `url`-i app-də taba çevrilir: `shared/config/push.ts` (`URL_TAB`), toxunuş `app/hooks/useNotificationTaps.ts` → `navigation/refs/navigationRef.ts`.
**Tələb**: EAS `projectId` (`app.json` → `extra.eas.projectId`), Android üçün `google-services.json` (`android.googleServicesFile`) + FCM V1 açarı Expo-ya yüklənməlidir.

---

## 14. Ekran → sorğu xəritəsi (1-ci mərhələ: Giriş + Panel)

| Ekran | TanStack açarı (web ilə eyni) | Sorğular |
|---|---|---|
| Giriş | — | §1 `signInWithPassword` |
| Açılış (bootstrap) | `me`, `chrome` | §1 "ilk sorğular" |
| Panel — Mənim günüm | `my-day-stats`, `month-attendance`, `my-leaves` | §2 |
| Panel — işə gəldim/bitirdim | (optimistik → `invalidate`) | `check_in` / `check_out` |
| Panel — görülən işlər | `work-history` | §3 |
| Panel — ay statistikası | `month-stats` | §2 "Panel statistikası" |

Sürət qaydaları (`project-mobile-app`): keş MMKV-də persist (açılış dərhal dolu), hər düymə optimistik, yenilənmə Realtime ilə, ekran başına 1–2 sorğu (lazım olsa birləşdirən RPC).
