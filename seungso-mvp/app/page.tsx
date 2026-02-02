"use client";

import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  const [phase, setPhase] = useState<"falling" | "rippling" | "finished">(
    "falling",
  );
  // 물방울 애니메이션만 반복시키기 위한 trigger 상태
  const [dropKey, setDropKey] = useState(0);

  // 5초마다 dropKey를 변경하여 애니메이션 재실행
  useEffect(() => {
    const interval = setInterval(() => {
      setDropKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.canvasContainer}>
        <AnimatePresence mode="wait">
          {/* 10초마다 dropKey가 변하면 이 내부의 모든 것이 새로 시작됩니다 */}
          <motion.div
            key={dropKey}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            {/* 1. 떨어지는 판결문 (물방울) */}
            <motion.div
              className={styles.drop}
              initial={{ y: -100, x: "50%", scale: 1.2, opacity: 1 }}
              animate={{ y: "70vh", scale: 0.5, opacity: 0.8 }}
              transition={{ duration: 1.5, ease: [0.13, 0, 0.13, 1] }}
              onAnimationComplete={() => {
                // 첫 실행 시에만 전체 페이즈를 전환
                if (phase === "falling") setPhase("rippling");
              }}
            />

            {/* 2. 퍼지는 물결 */}
            <motion.div
              className={styles.ripple}
              initial={{ scale: 0, opacity: 0.8, x: "-50%", y: "-50%" }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 2.5, delay: 1.5, ease: "easeOut" }} // 낙하 후 바로 시작되도록 delay 추가
              onAnimationComplete={() => {
                if (phase === "rippling") setPhase("finished");
              }}
              style={{ left: "50%", top: "70vh", position: "absolute" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. 메인 텍스트 (한 번 나타나면 유지됨) */}
      <motion.div
        className={styles.introSection}
        initial={{ opacity: 0, y: 20 }}
        animate={phase !== "falling" ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <p className={styles.introText}>
          승소판결문이 더 이상 종이조각이 되지 않도록
        </p>
        <p className={styles.introText}>
          법적 권리를 실질적 삶의 권리로 연결합니다.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === "finished" ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Button className={styles.mainBtn}>나의 판결문 확인하기</Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
