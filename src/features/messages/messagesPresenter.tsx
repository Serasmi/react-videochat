import React, { useContext, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addMessage,
  loadMessages,
  selectMessages,
  selectStatus,
} from "./messagesSlice";

import { SocketContext } from "../../utils/socket/socket";
import {
  handleSocketMessage,
  parseSocketMessage,
} from "../../utils/socket/helpers";

import { MessagesView } from "./messagesView";

import { currentUser } from "../../constants/mocks";

export const MessagesPresenter = () => {
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

  const messages = useAppSelector(selectMessages);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(loadMessages());

    const handleMessageEvent = (event: MessageEvent) => {
      const message = parseSocketMessage(event.data);

      if (!message) return;

      handleSocketMessage({
        addMessage: (msg) => {
          dispatch(addMessage(msg));
        },
        message,
        user: currentUser,
      });
    };

    socket.addListener("message", handleMessageEvent);

    return () => {
      socket.removeListener("message", handleMessageEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MessagesView isLoading={status === "loading"} messages={messages} />;
};
