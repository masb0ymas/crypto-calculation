import { TransitionProps } from "@mantine/core";

export const baseTransition:
  | Partial<Omit<TransitionProps, "mounted">>
  | undefined = { transition: "pop", duration: 300 };
