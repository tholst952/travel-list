import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  switch (sortBy) {
    case "input":
      sortedItems = items;
      break;

    case "description":
      sortedItems = items
        .slice()
        .toSorted((a, b) => a.description.localeCompare(b.description));
      break;

    case "packed":
      sortedItems = items
        .slice()
        .toSorted((a, b) => Number(a.packed) - Number(b.packed));
      break;

    default:
      sortedItems = items;
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed Status</option>
        </select>

        <button onClick={onClearList} disabled={!items.length}>
          Clear list
        </button>
      </div>
    </div>
  );
}
