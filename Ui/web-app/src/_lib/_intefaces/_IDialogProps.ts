export interface IDialogProps {
  open: boolean;
  keepMounted?: boolean;
  title: string;
  contentText?: string;
  actionLabel: string;
  cancelLabel?: string;
  saveDisabled?: boolean;
  onCancel?: () => void;
  onAction: () => void;
}
