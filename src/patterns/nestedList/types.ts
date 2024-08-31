import type { MachineComponentProps } from "../types";
import type { NestedStore, NestedStoreUpdatePositionsEvent } from "./store";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  store: NestedStore;
  getAddListFormProps(
    override?: MachineComponentProps["form"]
  ): MachineComponentProps["form"];
  updatePositions(args: NestedStoreUpdatePositionsEvent): void;
};
