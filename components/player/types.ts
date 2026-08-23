export type PlayerResult = {
  score: number;
  timeSeconds: number;
  attempts: number;
  hintsUsed: number;
  streak: number;
};

export type PlayerFeedback = {
  kind: "error" | "success";
  message: string;
};
