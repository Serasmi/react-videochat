import React from "react";

import { MessagesPresenter } from "./features/messages/messagesPresenter";
import { MessagesInputView } from "./features/messagesInput/messagesInputView";

import { makeSocket, SocketContext } from "./utils/socket/socket";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <SocketContext.Provider value={makeSocket()}>
      <div className="App">
        <MessagesPresenter />
        <MessagesInputView />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
