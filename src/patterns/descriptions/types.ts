import type { MachineComponentProps } from "../types";
import type { DescriptionsStore, DescriptionsStoreRemoveEvent } from "./store";

export interface ItemProps {
  listId: string;
  productId: string;
}

export type MachineApi = {
  store: DescriptionsStore;
  getSetDescriptionFormProps(
    override?: MachineComponentProps["form"]
  ): MachineComponentProps["form"];
  getRemoveDescriptionButtonProps(
    props: DescriptionsStoreRemoveEvent,
    override?: MachineComponentProps["button"]
  ): MachineComponentProps["button"];
};
