import type { ComponentProps } from "react";
import type { NestedStore, NestedStoreSetParentsEvent } from "./store";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  store: NestedStore;
  setParents(event: NestedStoreSetParentsEvent): void;
  getAddListFormProps(): ComponentProps<"form">;
  getAddToListFormProps(): ComponentProps<"form">;
  getRemoveListButtonProps(listId: string): ComponentProps<"button">;
  getRemoveFromListButtonProps(args: ItemProps): ComponentProps<"button">;
};
