import type { ComponentProps } from "react";
import type { FlatListStore } from "./store";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  store: FlatListStore;
  getAddListFormProps(): ComponentProps<"form">;
  getAddToListFormProps(): ComponentProps<"form">;
  getRemoveListButtonProps(listId: string): ComponentProps<"button">;
  getRemoveFromListButtonProps(args: ItemProps): ComponentProps<"button">;
};
