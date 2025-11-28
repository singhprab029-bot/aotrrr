import React, { useState, useMemo } from "react";
import { ItemCard } from "./ItemCard";
import { SearchAndFilter } from "./SearchAndFilter";
import { Item } from "../types/Item";

interface ItemFlipGridProps {
  items: Item[];
  mode: "regular" | "permanent";
}

export const ItemFlipGrid: React.FC<ItemFlipGridProps> = ({ items, mode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))).sort(),
    [items]
  );

  const filteredItems = useMemo(() => {
    let f = items.filter((item) => {
      const s = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const c = !selectedCategory || item.category === selectedCategory;
      return s && c;
    });

    f.sort((a, b) =>
      sortOrder === "asc" ? a.value - b.value : b.value - a.value
    );

    return f;
  }, [items, searchTerm, selectedCategory, sortOrder]);

  return (
    <div className="space-y-6">
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
        {filteredItems.map((i) => (
          <ItemCard key={i.id} item={i} mode={mode} />
        ))}
      </div>
    </div>
  );
};
