import type { MachineComponentProps } from "../types";
import type { DescriptionsStore } from "./store";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  store: DescriptionsStore;
  getSetDescriptionFormProps(
    override?: MachineComponentProps["form"]
  ): MachineComponentProps["form"];
};
