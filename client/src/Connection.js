import useSocket from "./hooks/useSocket";

const Connection = () => {
  const { connected } = useSocket();

  return (
    <div className="connection">
      {connected ? "🟢 Connected" : "🔴 Disconnected"}
    </div>
  );
};

export default Connection;
