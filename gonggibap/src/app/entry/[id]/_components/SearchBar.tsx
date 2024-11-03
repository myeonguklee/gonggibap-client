import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative flex w-full items-center">
      <input
        type="text"
        placeholder="음식점 검색"
        className="focus:border-primary-500 h-10 w-full rounded-lg border border-gray-300 pl-10 pr-4 focus:outline-none"
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 size-5 text-gray-400" />
    </div>
  );
}
