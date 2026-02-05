"use client";
import Icon from "@/components/ui/Icon";
import { ReactNode } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

export default function Modal({
  open,
  onClose,
  header,
  footer,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          {header && <div className={styles.headerContent}>{header}</div>}
          <Icon icon="xmark" aria-label="닫기" onClick={onClose} />
        </div>

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
