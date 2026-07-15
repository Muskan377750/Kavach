function StatusBadge({ status }) {
  return (
    <span
      className={
        status === "Online"
          ? "status online"
          : "status offline"
      }
    >
      {status === "Online"
        ? "🟢 Online"
        : "🔴 Offline"}
    </span>
  );
}

export default StatusBadge;