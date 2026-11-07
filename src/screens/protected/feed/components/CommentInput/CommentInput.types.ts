export type CommentInputProps = {
  text: string;
  onChange: (t: string) => void;
  onSend: () => void;
  keyboard: number; // klaviaturanın hündürlüyü (açıq deyilsə 0)
};
