export interface Modal {
  toggle: boolean;
  open: (str: string, body: string, fn: Function) => void;
  hide: () => void;
  body: string;
  title: string;
  onConfirm: Function | null;
}
