export interface IProcess {
  id: number;
  interval?: number;
  onStart: (cb: () => void) => void;
  onCancel: (cb: () => void) => void;
}
