import type { ComponentProps } from "react";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  getAddListFormProps(): ComponentProps<"form">;
  getAddToListFormProps(): ComponentProps<"form">;
  getRemoveListButtonProps(listId: string): ComponentProps<"button">;
  getRemoveFromListButtonProps(args: ItemProps): ComponentProps<"button">;
};
