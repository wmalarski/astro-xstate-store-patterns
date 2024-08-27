import type { ComponentProps } from "react";
import type {
  NestedStore,
  NestedStoreRemoveListEvent,
  NestedStoreUpdatePositionsEvent,
} from "./store";

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
    event: NestedStoreRemoveListEvent,
    override?: ComponentProps<"button">
  ): ComponentProps<"button">;
  updatePositions(args: NestedStoreUpdatePositionsEvent): void;
};
