export default function IconButton({
  label,
  className = "",
  active = false,
  type = "button",
  children,
  ...props
}) {
  const classNames = ["icon-btn", active ? "active" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classNames}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}
