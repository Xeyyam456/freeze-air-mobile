import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "@shared/components/Avatar";
import Button from "@shared/components/Button";
import ScreenHeader from "@shared/components/ScreenHeader";
import SignOutConfirm from "@shared/components/SignOutConfirm";
import SourceMenu from "@shared/components/SourceMenu";
import useMe from "@shared/hooks/useMe";
import { CameraIcon, LogOutIcon } from "@shared/icons";
import useProfilePhoto from "@screens/protected/profile/hooks/useProfilePhoto";
import { c } from "@theme/colors";
import { styles } from "./ProfileScreen.styles";

// Profil (Panel → sağ üstdəki şəkil): böyük şəkil, ad, vəzifə, e-poçt; şəkli dəyiş (kamera/qalereya, 1:1 kəsilir) və ya sil; çıxış.
// Ad və digər məlumatları rəhbərlik dəyişir (web ProfileModal kimi)
function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const email = useMe().data?.email ?? "";
  const { emp, change, remove } = useProfilePhoto();
  const [menu, setMenu] = useState(false);
  const [confirm, setConfirm] = useState(false); // çıxış həmişə təsdiqlə
  const name = emp?.full_name ?? "";

  return (
    <View style={styles.flex}>
    <ScrollView style={styles.flex} contentContainerStyle={[styles.content, { paddingTop: insets.top + 12 }]}>
      <ScreenHeader title="Profil" sub={email} />
      {emp ? (
        <View style={styles.card}>
          <Pressable onPress={() => setMenu(true)} style={styles.photoWrap} accessibilityLabel="Şəkli dəyiş">
            <View style={styles.ring}><Avatar name={name} photo={emp.photo_url} size={128} /></View>
            <View style={styles.badge}><CameraIcon size={16} color={c.white} /></View>
          </Pressable>
          <View style={styles.who}>
            <Text style={styles.name}>{name}</Text>
            {emp.position ? <Text style={styles.position}>{emp.position}</Text> : null}
          </View>
          <View style={styles.actions}>
            <Button title={emp.photo_url ? "Şəkli dəyiş" : "Şəkil əlavə et"} variant="gradient" icon={CameraIcon}
              onPress={() => setMenu(true)} style={styles.grow} />
            {emp.photo_url && <Button title="Sil" variant="glass" onPress={remove} />}
          </View>
          <Text style={styles.hint}>Şəkil kvadrat kəsilir. Ad, telefon və digər məlumatları rəhbərlik dəyişir.</Text>
        </View>
      ) : (
        <Text style={styles.hint}>Bu hesab heç bir əməkdaşa bağlı deyil, ona görə profil şəkli yoxdur.</Text>
      )}
      <Button title="Hesabdan çıx" variant="glass" icon={LogOutIcon} onPress={() => setConfirm(true)} />
      {confirm && <SignOutConfirm onClose={() => setConfirm(false)} />}
      {menu && <SourceMenu title="Profil şəkli" sources={["camera", "gallery"]} onClose={() => setMenu(false)}
        onPick={(s) => void change(s === "camera" ? "camera" : "gallery")} />}
    </ScrollView>
      <View pointerEvents="none" style={[styles.statusBar, { height: insets.top }]} />
    </View>
  );
}

export default ProfileScreen;
