import type { FlatListStore } from "./store";
import type { MachineApi } from "./types";

export const connect = (store: FlatListStore): MachineApi => {
  return {
    store,
    getAddListFormProps(override) {
      return {
        onSubmit(event) {
          override?.onSubmit?.(event);

          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const listId = formData.get("listId") as string;
          const name = formData.get("name") as string;
          const position = formData.get("position") as string;

          store.send({ type: "addList", listId, name, position });
        },
      };
    },
    getRemoveListButtonProps({ listId }, override) {
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
