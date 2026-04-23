import { useTheme, type ThemeName } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const themes: { key: ThemeName; label: string; colors: string }[] = [
  { key: "blue", label: "Blue", colors: "bg-blue-500" },
  { key: "green", label: "Green", colors: "bg-emerald-500" },
  { key: "purple", label: "Purple", colors: "bg-purple-500" },
  { key: "dark", label: "Dark", colors: "bg-gray-800" },
];

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-95",
            className
          )}
        >
          <Palette className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <p className="text-xs font-medium text-muted-foreground px-2 pb-2">Theme</p>
        {themes.map((t) => (
          <button
            key={t.key}
            onClick={() => setTheme(t.key)}
            className={cn(
              "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-all duration-200",
              theme === t.key ? "bg-accent font-medium" : "hover:bg-accent/50"
            )}
          >
            <span className={cn("h-4 w-4 rounded-full border-2 border-background shadow-sm", t.colors)} />
            {t.label}
            {theme === t.key && <span className="ml-auto text-xs text-primary">✓</span>}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
