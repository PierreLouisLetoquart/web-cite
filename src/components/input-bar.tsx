import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

interface InputBarProps extends React.HTMLAttributes<HTMLFormElement> {
  placeholder?: string;
  cta?: string;
  inputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputBar({
  className,
  placeholder,
  cta,
  inputChange,
  ...props
}: InputBarProps) {
  return (
    <form
      className={cn(
        "w-full max-w-[500px] flex items-center gap-2 rounded-lg border border-border pl-4 pr-2 py-2 shadow-sm",
        className,
      )}
      {...props}
    >
      <input
        type="url"
        onChange={inputChange}
        placeholder={placeholder || "https://www.youtube.com/watch..."}
        className="w-full border-none outline-none bg-transparent text-sm focus:outline-none focus-visible:outline-none"
      />
      <Button className="max-sm:size-9" type="submit">
        <span className="hidden sm:inline">{cta || "Cite"}</span>
        <span className="inline sm:hidden">
          <PaperPlaneIcon />
        </span>
        <span className="sr-only">generate a citation</span>
      </Button>
    </form>
  );
}
