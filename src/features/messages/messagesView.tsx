import React, { useEffect, useRef } from "react";
import { Spin } from "antd";

import { MessageView } from "../message/MessageView";

import type { IMessage } from "../message/types";

import styles from "./Messages.module.css";

interface IProps {
  isLoading?: boolean;
  messages: IMessage[];
}

export const MessagesView = ({
  isLoading = false,
  messages,
}: IProps): JSX.Element => {
  const lastDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles.messagesView}>
      {isLoading && <Spin size="large" />}

      {messages.map((m) => (
        <MessageView key={m.id} {...m} />
      ))}

      <div ref={lastDivRef} style={{ height: 0 }} />
    </div>
  );
};
