"use client";

import { useCallback, useEffect, useState } from "react";
import { defaultProgress, loadProgress, saveProgress, type PlayerProgress } from "@/lib/storage";

export function useProgress() {
  const [progress, setProgress] = useState<PlayerProgress>(() => defaultProgress());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  const updateProgress = useCallback((next: PlayerProgress) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  return { progress, hydrated, updateProgress };
}
