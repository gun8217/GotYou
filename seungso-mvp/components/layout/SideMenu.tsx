import Icon from "@/components/ui/Icon";
import { MenuItem } from "@/lib/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./SideMenu.module.scss";

type SideMenuProps = {
  menu: MenuItem[];
  onClose: () => void;
};

export default function SideMenu({ menu, onClose }: SideMenuProps) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const renderMenu = (items: MenuItem[]) => (
    <ul>
      {items.map((item) => (
        <li
          key={item.name}
          className={pathname === item.path ? styles.active : ""}
        >
          {item.path ? (
            <Link href={item.path} onClick={handleClose}>
              {item.name}
            </Link>
          ) : (
            <b>{item.name}</b>
          )}
          {item.children && renderMenu(item.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.show : ""}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.menu} ${visible ? styles.show : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon icon="xmark" aria-label="닫기" onClick={handleClose} />
        {renderMenu(menu)}
      </div>
    </div>
  );
}
