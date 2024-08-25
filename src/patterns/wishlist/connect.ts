import type { WishlistStore } from "./store";
import type { MachineApi } from "./types";

export const connect = (store: WishlistStore): MachineApi => {
  return {
    store,
    getAddFormProps(args) {
      return {
        onSubmit(event) {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          store.send({
            type: "add",
            productId: args.productId,
            listId: formData.get("listId") as string,
            note: formData.get("note") as string,
          });
        },
      };
    },
    getChangeNoteInputProps(args) {
      return {
        onChange(event) {
          store.send({ type: "update", ...args, note: event.target.value });
        },
      };
    },
    getRemoveButtonProps(args) {
      return {
        onClick() {
          store.send({ type: "remove", ...args });
        },
      };
    },
    updateProduct(args) {
      store.send({ type: "update", ...args });
    },
  };
};
