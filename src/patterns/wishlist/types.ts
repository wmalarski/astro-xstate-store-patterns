import type { ComponentProps } from "react";
import type {
  WishlistStore,
  WishlistStoreRemoveListEvent,
  WishlistStoreRemoveProductEvent,
  WishlistStoreUpdateEvent,
} from "./store";

export interface ItemProps {
  productId: string;
}

export type MachineApi = {
  store: WishlistStore;
  getAddListFormProps(
    override?: ComponentProps<"form">
  ): ComponentProps<"form">;
  getAddProductFormProps(
    override?: ComponentProps<"form">
  ): ComponentProps<"form">;
  getRemoveListButtonProps(
    props: WishlistStoreRemoveListEvent,
    override?: ComponentProps<"button">
  ): ComponentProps<"button">;
  getRemoveProductButtonProps(
    props: WishlistStoreRemoveProductEvent,
    override?: ComponentProps<"button">
  ): ComponentProps<"button">;
  updateProduct: (props: WishlistStoreUpdateEvent) => void;
};
