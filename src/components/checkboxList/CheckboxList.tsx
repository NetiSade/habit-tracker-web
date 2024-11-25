import { useState } from "react";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CheckboxItem } from "./types";
import CheckboxListItem from "./CheckboxListItem";

interface CheckboxListProps {
  items: CheckboxItem[];
  isEditMode?: boolean;
  onItemChange?: (itemId: string, isChecked: boolean) => void;
  onReorder?: (items: CheckboxItem[]) => void;
  onEdit?: (item: CheckboxItem) => void;
  onRemove?: (itemId: string) => void;
}

const CheckboxList = ({
  items: initialItems,
  onItemChange,
  onReorder,
  onEdit,
  onRemove,
  isEditMode,
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
            <CheckboxListItem
              key={item.id}
              item={item}
              isEditMode={isEditMode}
              onCheckboxChange={handleCheckboxChange}
              onEdit={handleEdit}
              onRemove={() => {
                setItemToRemove(item);
              }}
              showEmoji
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
