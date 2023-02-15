import moment from "moment/moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "./hook/useSocket";

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const inputRef = useRef();
  const { socket } = useSocket("http://localhost:4000");

  useEffect(() => {
    getMsj();
  }, []);

  const getMsj = useCallback(() => {
    socket.on("server:getMsj", (messages) => {
      setMessages(messages);
    });
  }, []);

  const sendMsj = (e) => {
    e.preventDefault();
    socket.emit("client:addMsj", {message,hour:Date.now()});
    setMessage("");
    inputRef.current.focus();
  };

  return (
    <div className="container mt-5">
      <div className="col-6">
        <form onSubmit={sendMsj}>
          <div className="mb-3">
            <input
              ref={inputRef}
              className="form-control rounded-3"
              type="text"
              name="message"
              value={message}
              autoFocus
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button className="btn btn-primary rounded-pill" type="submit">
            Send
          </button>
        </form>
      </div>

      {/* <div className="col-12">
        <ul className="list-group my-3">
          {messages.map((item, i) => (
            <li
              key={i}
              className="list-group-item rounded-pill item-dark border border-2 border-secondary my-1"
            >
              {item}
            </li>
          ))}
        </ul>
      </div> */}

      <div className="col-12">
        <ol className="list-group my-3">
          {messages.map((item, i) => (
            <li
              key={i}
              className="list-group-item rounded-pill item-dark border border-2 border-secondary my-1"
            >
              <div className="fw-bold">{item.message}</div>
              {/* {Date.now()} */}
              {moment(item.hour).format("MMMM Do YYYY, h:mm:ss a")}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
