"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  open: boolean; // 모달 열림 여부
  onClose: () => void; // 닫기 핸들러
  header?: ReactNode; // 헤더 영역
  footer?: ReactNode; // 푸터 영역
  children: ReactNode; // 바디 영역
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
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="닫기"
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>{children}</div>

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
