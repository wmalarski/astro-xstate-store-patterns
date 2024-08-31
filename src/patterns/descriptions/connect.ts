import type { DescriptionsStore } from "./store";
import type { MachineApi } from "./types";

export const connect = (store: DescriptionsStore): MachineApi => {
  return {
    store,
    getSetDescriptionFormProps(override) {
      return {
        onSubmit(event) {
          override?.onSubmit?.(event);

          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const listId = formData.get("listId") as string;
          const description = formData.get("description") as string;

          store.send({ type: "set", listId, description });
        },
      };
    },
  };
};
