import { twMerge } from "tailwind-merge";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title: string;
};

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  title,
}: ConfirmationModalProps) {
  if (!isOpen) return null;
  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50`}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-8">
        <button onClick={onClose} className="absolute right-2 top-2">
          X
        </button>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg">{message}</p>
        <div className="flex justify-around gap-2 pt-4">
          <button
            onClick={onConfirm}
            className="rounded-md bg-primary px-4 py-2 text-white"
          >
            "Potwierdź"
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-gray-300 px-4 py-2"
          >
            "Anuluj"
          </button>
        </div>
      </div>
    </div>
  );
}
