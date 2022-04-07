import React, { useCallback, useContext, useState } from "react";
import { Button, Input } from "antd";
import { formatISO } from "date-fns";

import { SocketContext } from "../../utils/socket/socket";
import { currentUser } from "../../constants/mocks";
import { SocketMessageType } from "../../constants";

import styles from "./MessagesInput.module.css";

export const MessagesInputView = () => {
  const [text, setText] = useState("");
  const socket = useContext(SocketContext);

  const handleSend = useCallback(() => {
    if (!text.length) return;

    socket.send(
      JSON.stringify({
        type: SocketMessageType.message,
        payload: {
          timestamp: formatISO(new Date()),
          text,
          userId: currentUser.id,
        },
      })
    );

    setText("");
  }, [socket, text]);

  const handleChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      if (newValue === text) return;

      setText(newValue);
    },
    [text]
  );

  return (
    <div className={styles.messagesInputView}>
      <Input
        placeholder="Enter you message here"
        onChange={handleChangeText}
        value={text}
      />
      <Button type="primary" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
};
