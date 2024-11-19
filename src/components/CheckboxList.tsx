import React, { useState } from "react";

interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
}

interface CheckboxListProps {
  items: CheckboxItem[];
  onItemChange?: (itemId: string, isChecked: boolean) => void;
}

const CheckboxList = ({
  items: initialItems,
  onItemChange,
}: CheckboxListProps) => {
  const [items, setItems] = useState<CheckboxItem[]>(initialItems);

  const handleCheckboxChange = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;
    item.checked = !item.checked;
    setItems([...items]);
    onItemChange?.(item.id, item.checked);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <label
          key={item.id}
          className="flex cursor-pointer items-center space-x-2 rounded-md p-2 hover:bg-gray-50"
        >
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => handleCheckboxChange(item.id)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700">{item.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxList;
