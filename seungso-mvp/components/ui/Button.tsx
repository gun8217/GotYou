import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  styleType?:
    | "default"
    | "primary"
    | "secondary"
    | "animate"
    | "error"
    | "icon";
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  onClick,
  styleType = "default",
  type = "button",
  fullWidth = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[styleType]} ${fullWidth ? styles.fullWidth : ""} ${className}`}
    >
      {children}
    </button>
  );
}
