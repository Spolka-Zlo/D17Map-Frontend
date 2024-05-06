import { twMerge } from "tailwind-merge";

type XButtonProps = {
  className?: string;
  onClickHandler: () => void;
};

export function XButton({ className, onClickHandler }: XButtonProps) {
  return (
    <div onClick={onClickHandler} className={twMerge("", className)}>
      <div className="relative h-1 w-8 origin-[40%] rounded-lg bg-white transition-transform rotate-45" />
      <div className="relative h-1 w-8 origin-[40%] rounded-lg bg-white transition-transform -rotate-45" />
    </div>
  );
}
