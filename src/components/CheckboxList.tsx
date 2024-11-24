import { useState } from "react";
import { GripVertical, Pencil, X } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
}

interface CheckboxListProps {
  items: CheckboxItem[];
  onItemChange?: (itemId: string, isChecked: boolean) => void;
  onReorder?: (items: CheckboxItem[]) => void;
  onEdit?: (item: CheckboxItem) => void;
  onRemove?: (itemId: string) => void;
}

// Sortable item component
const SortableItem = ({
  item,
  onCheckboxChange,
  onEdit,
  onRemove,
}: {
  item: CheckboxItem;
  onCheckboxChange: (id: string) => void;
  onEdit: (item: CheckboxItem) => void;
  onRemove: (id: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(item.label);

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
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onCheckboxChange(item.id)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
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
            {item.checked ? `${item.label} 😎 🎉 🚀` : item.label}
          </span>
        )}
      </label>

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
    </div>
  );
};

const CheckboxList = ({
  items: initialItems,
  onItemChange,
  onReorder,
  onEdit,
  onRemove,
}: CheckboxListProps) => {
  const [items, setItems] = useState<CheckboxItem[]>(initialItems);
  const [itemToRemove, setItemToRemove] = useState<CheckboxItem | null>(null);

  const handleConfirmRemove = () => {
    if (!itemToRemove) return;
    handleRemove(itemToRemove.id);
    setItemToRemove(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleCheckboxChange = (id: string) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setItems(newItems);
    onItemChange?.(id, !items.find((item) => item.id === id)!.checked);
  };

  const handleEdit = (editedItem: CheckboxItem) => {
    const newItems = items.map((item) =>
      item.id === editedItem.id ? editedItem : item,
    );
    setItems(newItems);
    onEdit?.(editedItem);
  };

  const handleRemove = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    onRemove?.(id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);
      onReorder?.(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              onCheckboxChange={handleCheckboxChange}
              onEdit={handleEdit}
              onRemove={() => {
                setItemToRemove(item);
              }}
            />
          ))}
        </div>
      </SortableContext>
      {itemToRemove && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <p className="text-gray-700">
              {`Are you sure you want to remove "${itemToRemove.label}"?`}
            </p>
            <div className="mt-4 flex justify-between space-x-2">
              <button
                onClick={() => {
                  setItemToRemove(null);
                }}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </DndContext>
  );
};

export default CheckboxList;
