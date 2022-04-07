import { formatISO, sub } from "date-fns";
import { v4 as uuidv4 } from "uuid";

import type { IMessage } from "../message/types";

export const messagesMock: IMessage[] = [
  {
    id: uuidv4(),
    timestamp: formatISO(sub(new Date(), { seconds: 31 })),
    text: "System message example",
  },
  {
    id: uuidv4(),
    timestamp: formatISO(sub(new Date(), { seconds: 30 })),
    userId: "1",
    text: "Text message 1",
  },
  {
    id: uuidv4(),
    timestamp: formatISO(sub(new Date(), { seconds: 25 })),
    userId: "2",
    text: "Text message 2",
  },
  {
    id: uuidv4(),
    timestamp: formatISO(sub(new Date(), { seconds: 20 })),
    userId: "1",
    text: "Text message 3",
  },
  {
    id: uuidv4(),
    timestamp: formatISO(sub(new Date(), { seconds: 15 })),
    userId: "1",
    text: "Text message 4",
  },
];
