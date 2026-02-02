"use client";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faArrowRight,
  faArrowRightFromBracket,
  faBars,
  faCheckCircle,
  faChevronRight,
  faCoffee,
  faCompass,
  faEye,
  faEyeSlash,
  faTimes,
  faUser,
  faUserCheck,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

library.add(
  faArrowRightFromBracket,
  faBars,
  faCheckCircle,
  faCoffee,
  faUser,
  faUserCheck,
  faUserPlus,
  faTimes,
  faArrowRight,
  faChevronRight,
  faEye,
  faEyeSlash,
  faCompass,
);

export default function FontAwesomeConfig() {
  return null;
}
