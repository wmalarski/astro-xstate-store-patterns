import type { ComponentProps } from "react";
import type { FlatListStore, FlatListStoreUpdatePositionsEvent } from "./store";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  store: FlatListStore;
  getAddListFormProps(
    override?: ComponentProps<"form">
  ): ComponentProps<"form">;
  getRemoveListButtonProps(
    listId: string,
    override?: ComponentProps<"button">
  ): ComponentProps<"button">;
  updatePositions(args: FlatListStoreUpdatePositionsEvent): void;
};
