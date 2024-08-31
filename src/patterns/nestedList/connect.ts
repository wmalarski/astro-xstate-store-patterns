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
          const position = formData.get("position") as string;

          store.send({
            type: "addList",
            listId: formData.get("listId") as string,
            position: position.length === 0 ? [] : position.split("/"),
          });
        },
      };
    },
    getRemoveListButtonProps(args, override) {
      return {
        onClick(event) {
          override?.onClick?.(event);

          store.send({
            type: "removeList",
            listId: args.listId,
          });
        },
      };
    },
    updatePositions(args) {
      store.send({ type: "updatePositions", ...args });
    },
  };
};
