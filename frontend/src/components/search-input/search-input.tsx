import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './search-input.module.css';

interface SearchInputProps {
    isExpanded?: boolean;
    onFocus?: () => void;
    defaultValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
    isExpanded = false, 
    onFocus,
    defaultValue = ''
}) => {
    const [value, setValue] = useState(defaultValue);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search${value.trim() ? `?q=${encodeURIComponent(value.trim())}` : ''}`);
    };

    const handleSearchClick = () => {
        navigate(`/search${value.trim() ? `?q=${encodeURIComponent(value.trim())}` : ''}`);
    };

    return (
        <form 
            className={`${styles.searchContainer} ${isExpanded ? styles.expanded : ''}`}
            onSubmit={handleSubmit}
        >
            <button 
                type="submit" 
                className={styles.searchButton}
                onClick={handleSearchClick}
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.searchIcon}>
                    <path 
                        className={styles.searchCircle}
                        d="M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                    <path 
                        className={styles.searchHandle}
                        d="M14.5 14.5L19 19" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Найти материалы по названию, автору или теме..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={onFocus}
            />
        </form>
    );
};

export default SearchInput; 