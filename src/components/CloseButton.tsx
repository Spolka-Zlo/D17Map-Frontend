import { twMerge } from "tailwind-merge";

type CloseButtonProps = {
  className?: string;
  onClickHandler: () => void;
};

export function CloseButton({ className, onClickHandler }: CloseButtonProps) {
  return (
    <div onClick={onClickHandler} className={twMerge("", className)}>
      <div className="relative h-1 w-8 origin-[40%] rotate-45 rounded-lg transition-transform" />
      <div className="relative h-1 w-8 origin-[40%] -rotate-45 rounded-lg transition-transform" />
    </div>
  );
}
