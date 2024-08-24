import type { WishlistStore } from "./store";
import type { MachineApi } from "./types";

export const connect = (store: WishlistStore): MachineApi => {
  return {
    store,
    getAddButtonProps(args) {
      return {
        onClick() {
          store.send({ type: "add", ...args });
        },
      };
    },
    getEditInputProps(args) {
      return {
        onChange(event) {
          store.send({ type: "add", ...args, note: event.target.value });
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
  };
};
