import React from "react";
import cn from "classnames";

import styles from "./Message.module.css";

import type { IMessage } from "./types";
import { currentUser } from "../../constants/mocks";

interface IProps extends IMessage {}

export const MessageView = ({ userId, text }: IProps) => {
  const isMyMessage = currentUser.id === userId;
  const isSystemMessage = userId === undefined;

  const className = isSystemMessage
    ? styles.systemMessageView
    : cn(styles.messageView, isMyMessage && styles.myMessageView);

  return <div className={className}>{text}</div>;
};
