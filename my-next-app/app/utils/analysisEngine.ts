// MVP 모델: S = (V * P) - C 기반 스코어링
export const calculateExecutionScore = (v: number, p: number, c: number) => {
  const rawScore = v * (p / 100) - c;
  // 0~100점 사이로 정규화하는 로직 추가
  return Math.min(Math.max(Math.round((rawScore / v) * 100), 0), 100);
};
