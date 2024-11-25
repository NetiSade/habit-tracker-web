import { GripVertical, Pencil, X } from "lucide-react";
import { CheckboxItem } from "./types";
import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CheckboxListItem = ({
  item,
  onCheckboxChange,
  onEdit,
  onRemove,
  isEditMode,
  showEmoji,
}: {
  item: CheckboxItem;
  showEmoji?: boolean;
  isEditMode?: boolean;
  onCheckboxChange: (id: string) => void;
  onEdit: (item: CheckboxItem) => void;
  onRemove: (id: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(item.label);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (!animate) return;
    const timeout = setTimeout(() => setAnimate(false), 3000);
    return () => clearTimeout(timeout);
  }, [animate]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditSubmit = () => {
    if (editedLabel.trim()) {
      onEdit({ ...item, label: editedLabel.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setEditedLabel(item.label);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center rounded-md border ${
        isDragging ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"
      } p-2`}
    >
      <div
        {...attributes}
        {...listeners}
        className="mr-2 cursor-grab text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={16} />
      </div>

      <label className="flex flex-1 cursor-pointer items-center space-x-2">
        {
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => {
              setAnimate(true);
              onCheckboxChange(item.id);
            }}
            className="h-4 w-4 animate-fade-in rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        }
        {isEditing ? (
          <input
            type="text"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyPress}
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <span className="text-gray-700">
            {showEmoji && item.checked && (
              <span
                className={`mr-2 inline-block ${animate ? "animate-bounce" : "animate-fade-in"}`}
              >
                🎉
              </span>
            )}
            {item.label}
          </span>
        )}
      </label>

      {isEditMode && (
        <div className="ml-2 flex space-x-1">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxListItem;
