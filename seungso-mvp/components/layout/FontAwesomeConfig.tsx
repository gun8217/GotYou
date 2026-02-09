"use client";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faArrowRight,
  faArrowRightFromBracket,
  faBan,
  faBars,
  faCaretDown,
  faCheckCircle,
  faChevronRight,
  faCircleQuestion,
  faCoffee,
  faCompass,
  faEnvelopeCircleCheck,
  faEye,
  faEyeSlash,
  faFilePen,
  faHandPointer,
  faKey,
  faPenToSquare,
  faRotateLeft,
  faTimes,
  faTrashArrowUp,
  faTriangleExclamation,
  faUnlockKeyhole,
  faUser,
  faUserCheck,
  faUserCircle,
  faUserPen,
  faUserPlus,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

library.add(
  faArrowRight,
  faArrowRightFromBracket,
  faBars,
  faCheckCircle,
  faChevronRight,
  faCoffee,
  faCompass,
  faEnvelopeCircleCheck,
  faEye,
  faEyeSlash,
  faHandPointer,
  faKey,
  faPenToSquare,
  faRotateLeft,
  faTimes,
  faTriangleExclamation,
  faUnlockKeyhole,
  faUser,
  faUserCheck,
  faUserPen,
  faUserPlus,
  faBan,
  faCircleQuestion,
  faUserXmark,
  faUserCircle,
  faTrashArrowUp,
  faCaretDown,
  faFilePen,
);

export default function FontAwesomeConfig() {
  return null;
}
