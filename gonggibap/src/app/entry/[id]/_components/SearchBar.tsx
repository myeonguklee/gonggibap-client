import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="w-full relative flex items-center">
      <input
        type="text"
        placeholder="음식점 검색"
        className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-500"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 w-5 h-5 text-gray-400" />
    </div>
  );
}
