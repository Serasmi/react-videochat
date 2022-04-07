import React from "react";
import { currentUser } from "../../constants/mocks";

type SocketListener<T extends keyof WebSocketEventMap> = (
  event: WebSocketEventMap[T]
) => any;

interface IListeners {
  message?: SocketListener<"message">[];
}

interface IInitSocket {
  listeners?: IListeners;
}

export interface ISocket {
  addListener: <K extends keyof WebSocketEventMap>(
    type: K,
    listener: SocketListener<K>
  ) => any;
  removeListener: <K extends keyof WebSocketEventMap>(
    type: K,
    listener: SocketListener<K>
  ) => any;
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => any;
}

let socket: WebSocket | undefined;

export const makeSocket = ({ listeners = {} }: IInitSocket = {}): ISocket => {
  if (!socket) {
    socket = new WebSocket(`ws://localhost:8080?userId=${currentUser.id}`);
  }

  // Connection opened
  // socket.addEventListener("open", function (event) {
  //   socket.send("Hello Server!");
  // });

  for (let listener of listeners["message"] ?? []) {
    socket.addEventListener("message", listener);
  }

  // Listen for messages
  // socket.addEventListener("message", function (event) {
  //   console.log("Message from server ", event.data);
  // });

  const addListener: ISocket["addListener"] = (type, listener) => {
    socket!.addEventListener(type, listener);
  };

  const removeListener: ISocket["removeListener"] = (type, listener) => {
    socket!.removeEventListener(type, listener);
  };

  const send: ISocket["send"] = (data) => {
    socket!.send(data);
  };

  return { addListener, removeListener, send };
};

const contextMock: ISocket = {
  addListener: (type, listener) => {
    console.log("Add listener", { type, listener });
  },
  removeListener: (type, listener) => {
    console.log("Remove listener", { type, listener });
  },
  send: (data) => {
    console.log("Send data", { data });
  },
};

export const SocketContext = React.createContext<ISocket>(contextMock);
