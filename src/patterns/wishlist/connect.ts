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
          const listId = formData.get("listId") as string;
          const name = formData.get("name") as string;

          store.send({ type: "addList", listId, name });
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
            type: "addProduct",
            listId: formData.get("listId") as string,
            productId: formData.get("productId") as string,
          });
        },
      };
    },
    getRemoveListButtonProps({ listId }, override) {
      return {
        onClick(event) {
          override?.onClick?.(event);

          store.send({ type: "removeList", listId });
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
