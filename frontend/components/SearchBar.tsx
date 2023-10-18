import React from 'react';
import { HiOutlineXMark } from "react-icons/hi2";

interface SearchBarProps {
    searchTerm: string;
    DarkMode: boolean;
    onSearchTermChange: (newSearchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ DarkMode, searchTerm, onSearchTermChange }) => {
    const handleReset = () => {
        onSearchTermChange(''); // Reset the search term to an empty string
    };
    return (
        <div className="mb-4 flex">
            <div
                className={`flex items-center text-white justify-center w-full px-4 py-2 border rounded w-full ${DarkMode ? 'bg-gray-700 border-gray-500' : 'border-white'}`}
            >
                <input
                    type="text"
                    placeholder="Recherche..."
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                    className='text-white w-full border-0 bg-transparent focus:outline-none focus:ring-none'
                />
                {searchTerm !== '' &&
                    <HiOutlineXMark
                        onClick={handleReset}
                        className='cursor-pointer h-5 w-5'
                    />
                }
            </div>
        </div>
    );
};

export default SearchBar;
