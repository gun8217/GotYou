import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "default" | "primary" | "secondary" | "animate";
};

export default function Button({
  label,
  onClick,
  type = "primary",
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {label}
    </button>
  );
}
