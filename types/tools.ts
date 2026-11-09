// Alətlərim (usta tərəfi): üzərimdəkilər, sorğularım, depodakı qalıq (API.md §8)
export type ToolKind = "tool" | "material";
export type ToolInfo = { name: string; kind: string; unit: string; pack_name: string | null; pack_size: number | null };
export type MyHold = { id: number; tool_id: number; quantity: number; taken_at: string; received_at: string | null; disputed_at: string | null; tools: ToolInfo | null };
export type MyRequest = {
  id: number; type: string; status: string; tool_id: number | null; tool_name: string; tool_kind: string; unit: string; quantity: number | null;
  used: number | null; returned: number | null; assignment_id: number | null; created_at: string; decided_by_name: string | null; decision_note: string | null;
};
export type StockTool = { id: number; name: string; kind: string; unit: string; available: number; pack_name: string | null; pack_size: number | null };
export type MyToolsData = { holds: MyHold[]; requests: MyRequest[]; stock: StockTool[] };

// Qaytarma qaralaması: alətdə say; materialda "qaytarıram" + "qalanı işlətdim / məndə qalır" (+ balonla/kq ilə)
export type ReturnDraft = { qty: string; ret: string; byPack: boolean; restUsed: boolean };
export type ReturnCalc = { ok: boolean; over: boolean; quantity: number; used: number; returned: number; hint: string };

// Siyahı sətirləri (FlashList): bölmə başlığı, boş mətn, "məndə" kartı, sorğu
export type ToolRow =
  | { key: string; kind: "title"; text: string; sub?: string }
  | { key: string; kind: "empty"; text: string }
  | { key: string; kind: "hold"; hold: MyHold }
  | { key: string; kind: "req"; req: MyRequest };
