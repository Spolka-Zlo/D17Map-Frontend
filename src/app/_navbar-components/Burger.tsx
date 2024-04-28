import { twMerge } from "tailwind-merge";
export const Burger = ({
  open,
  toggleOpen,
  className,
}: {
  open?: boolean;
  toggleOpen?: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={toggleOpen}
      className={twMerge(
        "z-30 flex  h-8 w-8 flex-col justify-around border-none bg-transparent p-0 focus:outline-none",
        open && "absolute right-12 top-10",
        className
      )}
    >
      <div
        className={twMerge(
          "relative h-1 w-8 origin-[1px] rotate-0 rounded-lg bg-white transition-transform",
          open && "rotate-45"
        )}
      />
      <div
        className={twMerge(
          "relative h-1 w-8 origin-[1px] translate-x-0 rounded-lg bg-white opacity-100 transition-transform",
          open && "translate-x-5  opacity-0"
        )}
      />
      <div
        className={twMerge(
          "relative h-1 w-8 origin-[1px] rotate-0 rounded-lg bg-white transition-transform",
          open && "-rotate-45 "
        )}
      />
    </button>
  );
};
