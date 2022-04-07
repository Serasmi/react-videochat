import { SocketMessageType } from "../../constants";

import type { IMessage, ISocketMessage } from "../../features/message/types";
import type { IUser } from "../../types";

export const parseSocketMessage = (
  data: string
): ISocketMessage | undefined => {
  try {
    return JSON.parse(data) as ISocketMessage;
  } catch (e) {
    console.error("Can not parse ws data", e);
  }
};

interface ISocketMessageHandlerParams {
  addMessage?: (msg: IMessage) => void;
  message: ISocketMessage;
  user: IUser;
}

export const handleSocketMessage = ({
  addMessage,
  message,
  user,
}: ISocketMessageHandlerParams) => {
  if (message.type === SocketMessageType.connection) {
    const { id, timestamp, userId } = (message as ISocketMessage<"connection">)
      .payload;

    if (userId === user.id) return;

    const newMessage: IMessage = {
      id,
      text: `User ${userId} connected`,
      timestamp,
    };

    addMessage?.(newMessage);
  }

  if (message.type === SocketMessageType.message) {
    const newMessage = (message as ISocketMessage<"message">).payload;
    addMessage?.(newMessage);
  }
};
