import type { MachineComponentProps } from "../types";
import type {
  FlatListStore,
  FlatListStoreRemoveListEvent,
  FlatListStoreUpdatePositionsEvent,
} from "./store";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  store: FlatListStore;
  getAddListFormProps(
    override?: MachineComponentProps["form"]
  ): MachineComponentProps["form"];
  getRemoveListButtonProps(
    props: FlatListStoreRemoveListEvent,
    override?: MachineComponentProps["button"]
  ): MachineComponentProps["button"];
  updatePositions(args: FlatListStoreUpdatePositionsEvent): void;
};
