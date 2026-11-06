import ConfirmModal from "@shared/components/ConfirmModal";
import { LogOutIcon } from "@shared/icons";
import { signOut } from "@shared/services/auth.service";
import type { SignOutConfirmProps } from "./SignOutConfirm.types";

// Hesabdan çıxış HƏMİŞƏ təsdiqlə (istifadəçi qaydası): Panel başlığı və Profil
function SignOutConfirm({ onClose }: SignOutConfirmProps) {
  return (
    <ConfirmModal title="Hesabdan çıxırsan?" icon={LogOutIcon} confirmTitle="Çıx" danger onClose={onClose}
      text="Yenidən daxil olmaq üçün e-poçt və parol lazım olacaq. Bu telefona bildirişlər gəlməyəcək."
      onConfirm={() => void signOut()} />
  );
}

export default SignOutConfirm;
