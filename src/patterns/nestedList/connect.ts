import type { NestedStore } from "./store";
import type { MachineApi } from "./types";

export const connect = (store: NestedStore): MachineApi => {
  return {
    store,
    getAddListFormProps(override) {
      return {
        onSubmit(event) {
          override?.onSubmit?.(event);

          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          store.send({
            type: "addList",
            listId: formData.get("listId") as string,
            name: formData.get("name") as string,
            position: (formData.get("position") as string).split("/"),
          });
        },
      };
    },
    getRemoveListButtonProps(listId, override) {
      return {
        onClick(event) {
          override?.onClick?.(event);

          store.send({
            type: "removeList",
            listId,
          });
        },
      };
    },
    updatePositions(args) {
      store.send({ type: "updatePositions", ...args });
    },
  };
};
