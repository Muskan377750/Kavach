function EmployeeAvatar({ name }) {
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="employee-avatar">
      {initials}
    </div>
  );
}

export default EmployeeAvatar;