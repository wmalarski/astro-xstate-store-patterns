export type MachineComponentProps = {
  form: {
    onSubmit: (event: {
      currentTarget: HTMLFormElement;
      preventDefault: () => void;
    }) => void;
  };
  button: {
    onClick: (event: any) => void;
  };
};
