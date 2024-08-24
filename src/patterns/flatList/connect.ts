import type { FlatListStore } from "./store";
import type { MachineApi } from "./types";

export const connect = (store: FlatListStore): MachineApi => {
  return {
    store,
    getAddListFormProps() {
      return {
        onSubmit(event) {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          store.send({
            type: "addList",
            listId: crypto.randomUUID(),
            name: formData.get("name") as string,
          });
        },
      };
    },
    getAddToListFormProps() {
      return {
        onSubmit(event) {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          store.send({
            type: "addToList",
            listId: formData.get("listId") as string,
            productId: formData.get("productId") as string,
          });
        },
      };
    },
    getRemoveFromListButtonProps({ listId, productId }) {
      return {
        onClick() {
          store.send({
            type: "removeFromList",
            listId,
            productId,
          });
        },
      };
    },
    getRemoveListButtonProps(listId) {
      return {
        onClick() {
          store.send({
            type: "removeList",
            listId,
          });
        },
      };
    },
  };
};
