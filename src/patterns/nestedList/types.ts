import type { ComponentProps } from "react";
import type { NestedStore, NestedStoreUpdatePositionsEvent } from "./store";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  store: NestedStore;
  getAddListFormProps(
    override?: ComponentProps<"form">
  ): ComponentProps<"form">;
  getRemoveListButtonProps(
    listId: string,
    override?: ComponentProps<"button">
  ): ComponentProps<"button">;
  updatePositions(args: NestedStoreUpdatePositionsEvent): void;
};
