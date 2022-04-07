import { messagesMock } from "./messagesMock";

import type { IMessage } from "../message/types";

export function fetchMessages() {
  return new Promise<{ data: IMessage[] }>((resolve) =>
    setTimeout(() => resolve({ data: messagesMock }), 500)
  );
}
