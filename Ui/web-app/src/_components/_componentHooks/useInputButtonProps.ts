export interface IInputButtonProps {
  buttonType: "button" | "text";
  text: string;
  readonly: boolean;
  variant: "contained" | "text" | "outlined";
  handleClick: () => Promise<void> | void;
  children?: JSX.Element;
}

export const useInputButtonProps = (
  buttonType: "button" | "text",
  text: string,
  readonly: boolean,
  variant: "contained" | "text" | "outlined",
  handleClick: () => Promise<void> | void,
  children?: JSX.Element
): IInputButtonProps => {
  return {
    buttonType,
    text,
    readonly,
    variant,
    children,
    handleClick,
  };
};
