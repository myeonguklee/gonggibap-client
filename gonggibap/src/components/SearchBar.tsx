import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

type SearchBarProps = {
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  isMobile?: boolean;
};

export const SearchBar = ({
  onSearch,
  placeholder = '검색어를 입력해주세요',
  className = '',
  inputClassName = '',
  isMobile = false,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      onSearch(trimmedSearchTerm);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={className}>
      <fieldset
        className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 dark:bg-gray-700"
        style={isMobile ? undefined : { border: '2px solid #FF7058' }}>
        <label htmlFor="search" className="sr-only">
          검색
        </label>
        <button
          type="submit"
          className="flex items-center"
          aria-label="검색하기">
          <FiSearch className="text-[#FF7058]" />
        </button>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={`w-full flex-1 border-none outline-none focus:outline-none dark:bg-gray-700 ${inputClassName}`}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center"
            aria-label="검색어 지우기">
            <IoMdClose className="text-gray-500" />
          </button>
        )}
      </fieldset>
    </form>
  );
};
