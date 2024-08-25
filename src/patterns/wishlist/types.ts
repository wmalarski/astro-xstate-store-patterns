import type { ComponentProps } from "react";
import type { WishlistStore, WishlistStoreUpdateEvent } from "./store";

export interface ItemProps {
  productId: string;
}

export type MachineApi = {
  store: WishlistStore;
  getAddFormProps(props: ItemProps): ComponentProps<"form">;
  getChangeNoteInputProps(props: ItemProps): ComponentProps<"input">;
  getRemoveButtonProps(props: ItemProps): ComponentProps<"button">;
  updateProduct: (props: WishlistStoreUpdateEvent) => void;
};
