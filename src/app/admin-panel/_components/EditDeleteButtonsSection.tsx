type EditDeleteButtonsSectionProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export function EditDeleteButtonsSection({
  onEdit,
  onDelete,
}: EditDeleteButtonsSectionProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <span className="h-1 w-1 rounded-full bg-primary" />
      <button
        className="text-md h-6 w-6 cursor-pointer rounded-md p-0 text-accent"
        onClick={onEdit}
        aria-label="Edit reservation"
      >
        &#x1F589;
      </button>

      <button
        className="text-md h-6 w-6 cursor-pointer rounded-md p-0 text-red-500"
        onClick={onDelete}
        aria-label="Cancel reservation"
      >
        &#x1F5D1;
      </button>
    </div>
  );
}
