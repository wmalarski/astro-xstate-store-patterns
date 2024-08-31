import type { MachineComponentProps } from "../types";
import type { FlatListStore, FlatListStoreUpdatePositionsEvent } from "./store";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  store: FlatListStore;
  getAddListFormProps(
    override?: MachineComponentProps["form"]
  ): MachineComponentProps["form"];
  updatePositions(args: FlatListStoreUpdatePositionsEvent): void;
};
