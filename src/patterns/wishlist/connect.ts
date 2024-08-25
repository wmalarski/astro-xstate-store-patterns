import type { WishlistStore } from "./store";
import type { MachineApi } from "./types";

export const connect = (store: WishlistStore): MachineApi => {
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
          });
        },
      };
    },
    getAddProductFormProps(override) {
      return {
        onSubmit(event) {
          override?.onSubmit?.(event);

          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          store.send({
            type: "addList",
            listId: formData.get("listId") as string,
          });
        },
      };
    },
    getRemoveListButtonProps(args, override) {
      return {
        onChange(event) {
          override?.onChange?.(event);

          store.send({ type: "removeList", ...args });
        },
      };
    },
    getRemoveProductButtonProps(args, override) {
      return {
        onClick(event) {
          override?.onChange?.(event);

          store.send({ type: "removeProduct", ...args });
        },
      };
    },
    updateProduct(args) {
      store.send({ type: "updateLists", ...args });
    },
  };
};
