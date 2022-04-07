/**
 * @property userId identifier of user. Does not exist for system messages.
 */
export interface IMessage
  extends Pick<ISocketChatMessage, "id" | "text" | "timestamp"> {
  userId?: string;
}

export interface ISocketBasicMessage {
  id: string;
  timestamp: string;
}

export interface ISocketConnectionMessage extends ISocketBasicMessage {
  userId: string;
}

export interface ISocketChatMessage extends ISocketBasicMessage {
  text: string;
  userId: string;
}

export interface ISocketMessageMap {
  connection: ISocketConnectionMessage;
  message: ISocketChatMessage;
}

type SocketMessageTypes = keyof ISocketMessageMap;

export interface ISocketMessage<
  T extends SocketMessageTypes = SocketMessageTypes
> {
  type: T;
  payload: ISocketMessageMap[T];
}
