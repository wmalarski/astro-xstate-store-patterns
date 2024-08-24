import type { ComponentProps } from "react";
import type { WishlistStore } from "./store";

export interface ItemProps {
  productId: string;
  note: string;
}

export type MachineApi = {
  store: WishlistStore;
  getAddButtonProps(props: ItemProps): ComponentProps<"button">;
  getEditInputProps(props: ItemProps): ComponentProps<"input">;
  getRemoveButtonProps(props: ItemProps): ComponentProps<"button">;
};
