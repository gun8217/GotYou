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
);

export default function FontAwesomeConfig() {
  return null;
}
