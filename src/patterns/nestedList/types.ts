import type { MachineComponentProps } from "../types";
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
    override?: MachineComponentProps["form"]
  ): MachineComponentProps["form"];
  getRemoveListButtonProps(
    event: NestedStoreRemoveListEvent,
    override?: MachineComponentProps["button"]
  ): MachineComponentProps["button"];
  updatePositions(args: NestedStoreUpdatePositionsEvent): void;
};
