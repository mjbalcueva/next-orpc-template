"use client";

import {
  Moon02Icon,
  Sun03Icon,
  SystemUpdate01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

import { Button } from "@/core/components/ui/button";

const THEMES = ["system", "light", "dark"] as const;
type Theme = (typeof THEMES)[number];

const icons: Record<Theme, typeof Sun03Icon> = {
  system: SystemUpdate01Icon,
  light: Sun03Icon,
  dark: Moon02Icon,
};

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function cycle() {
    const current = (theme ?? "system") as Theme;
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    setTheme(next);
  }

  const current = (theme ?? "system") as Theme;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycle}
      className="fixed bottom-4 left-4 rounded-full shadow-md"
      aria-label={`Theme: ${current}. Click to cycle.`}
    >
      <HugeiconsIcon icon={icons[current]} size={18} />
    </Button>
  );
}
