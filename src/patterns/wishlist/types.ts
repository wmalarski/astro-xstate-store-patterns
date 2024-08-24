import type { ComponentProps } from "react";

export interface ItemProps {
  productId: string;
  note: string;
}

export type MachineApi = {
  getAddButtonProps(props: ItemProps): ComponentProps<"button">;
  getEditInputProps(props: ItemProps): ComponentProps<"input">;
  getRemoveButtonProps(props: ItemProps): ComponentProps<"button">;
};
