import type { MachineComponentProps } from "../types";
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
    override?: MachineComponentProps["form"]
  ): MachineComponentProps["form"];
  getAddProductFormProps(
    override?: MachineComponentProps["form"]
  ): MachineComponentProps["form"];
  getRemoveListButtonProps(
    props: WishlistStoreRemoveListEvent,
    override?: MachineComponentProps["button"]
  ): MachineComponentProps["button"];
  getRemoveProductButtonProps(
    props: WishlistStoreRemoveProductEvent,
    override?: MachineComponentProps["button"]
  ): MachineComponentProps["button"];
  updateProduct: (props: WishlistStoreUpdateEvent) => void;
};
