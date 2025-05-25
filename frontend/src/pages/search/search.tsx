import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import MaterialCard from '../../components/material-card/material-card';
import MaterialModal from '../../components/material-modal/material-modal';
import SearchInput from '../../components/search-input/search-input';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { logout } from '../../store/slices/user.slice';
import { MAIN_NAVIGATION, AUTH_NAVIGATION } from '../../constants/navigation';
import { Material } from '../../types/material.types';
import * as headerStyles from '../../components/header/header.module.css';
import * as styles from './search.module.css';
import { materialsService } from '../../services/storage/materials.service';

type SortOrder = 'asc' | 'desc';

const SearchPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [isAnimating, setIsAnimating] = useState(true);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [searchType, setSearchType] = useState<'title' | 'author'>('title');
    const { profile, auth } = useSelector(state => state.user);

    const isAuthenticated = !!auth.token && !!auth.expiresAt && Date.now() < auth.expiresAt;

    useEffect(() => {
        const loadMaterials = async () => {
            try {
                const loadedMaterials = await materialsService.getAllMaterials();
                setMaterials(loadedMaterials);
                setFilteredMaterials(loadedMaterials);
            } catch (err) {
                setError('Ошибка при загрузке материалов');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMaterials();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q') || '';
        handleSearch(query);
        
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
    }, [location.search, materials]);

    const handleSearch = async (query: string) => {
        try {
            if (!query.trim()) {
                setFilteredMaterials(sortMaterials(materials, sortOrder));
                return;
            }
            
            const searchResults = await materialsService.searchMaterials(query, { type: searchType });
            const sortedResults = sortMaterials(searchResults, sortOrder);
            setFilteredMaterials(sortedResults);
        } catch (err) {
            console.error('Ошибка при поиске:', err);
            setError('Ошибка при поиске материалов');
        }
    };

    const sortMaterials = (materialsToSort: Material[], order: SortOrder) => {
        return [...materialsToSort].sort((a, b) => {
            const titleA = a.metadata.title.toLowerCase();
            const titleB = b.metadata.title.toLowerCase();
            return order === 'asc' 
                ? titleA.localeCompare(titleB)
                : titleB.localeCompare(titleA);
        });
    };

    const handleSortOrderChange = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        setFilteredMaterials(sortMaterials(filteredMaterials, newOrder));
    };

    const handleSearchTypeChange = (type: 'title' | 'author') => {
        setSearchType(type);
        // Trigger new search with current query
        const searchParams = new URLSearchParams(location.search);
        const currentQuery = searchParams.get('q') || '';
        handleSearch(currentQuery);
    };
    
    const handleLogout = () => {
        dispatch(logout());
    };

    const handleMaterialClick = (material: Material) => {
        setSelectedMaterial(material);
    };

    const handleModalClose = () => {
        setSelectedMaterial(null);
    };

    const handleViewMaterial = () => {
        if (selectedMaterial) {
            navigate(`/viewer/${selectedMaterial.metadata.id}`);
        }
    };

    return (
        <div className={styles.container}>
            <Header navItems={
                    <>
                        {MAIN_NAVIGATION.map(item => (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                className={headerStyles.link}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </>
                }
                rightContent={
                    <div className={headerStyles.auth}>
                        {isAuthenticated ? (
                            <>
                                <span className={headerStyles.userName}>
                                    {profile?.firstName}
                                </span>
                                <Link 
                                    to="/profile" 
                                    className={headerStyles.userAvatar}
                                    title="Перейти в профиль"
                                >
                                    {profile?.firstName?.charAt(0).toUpperCase()}
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className={headerStyles.logoutButton}
                                >
                                    Выйти
                                </button>
                            </>
                        ) : (
                            AUTH_NAVIGATION.map(item => (
                                <Link 
                                    key={item.path}
                                    to={item.path} 
                                    className={`${headerStyles.authLink} ${
                                        item.path === '/signup' ? headerStyles.register : ''
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))
                        )}
                    </div>
                }/>
            
            <main className={`${styles.main} ${isAnimating ? styles.animating : ''}`}>
                {loading ? (
                    <div className={styles.loading}>Загрузка...</div>
                ) : error ? (
                    <div className={styles.error}>{error}</div>
                ) : (
                    <>
                        <div className={styles.searchContainer}>
                            <div className={styles.searchWrapper}>
                                <SearchInput
                                    isExpanded
                                    defaultValue={new URLSearchParams(location.search).get('q') || ''}
                                />
                                <div className={styles.filters}>
                                    <div className={styles.searchControls}>
                                        <div className={styles.searchTypeButtons}>
                                            <button 
                                                className={`${styles.searchTypeButton} ${searchType === 'title' ? styles.active : ''}`}
                                                onClick={() => handleSearchTypeChange('title')}
                                            >
                                                Поиск по названию
                                            </button>
                                            <button 
                                                className={`${styles.searchTypeButton} ${searchType === 'author' ? styles.active : ''}`}
                                                onClick={() => handleSearchTypeChange('author')}
                                            >
                                                Поиск по автору
                                            </button>
                                        </div>
                                        <button 
                                            className={styles.sortButton}
                                            onClick={handleSortOrderChange}
                                            title={sortOrder === 'asc' ? 'По убыванию' : 'По возрастанию'}
                                        >
                                            {sortOrder === 'asc' ? '↓' : '↑'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.resultsContainer}>
                            <div className={styles.resultsGrid}>
                                {filteredMaterials.map(material => (
                                    <div 
                                        key={material.metadata.id}
                                        onClick={() => handleMaterialClick(material)}
                                        className={styles.cardWrapper}
                                    >
                                        <MaterialCard
                                            material={material}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </main>

            {selectedMaterial && (
                <MaterialModal
                    material={selectedMaterial}
                    showAuthor={true}
                    onClose={handleModalClose}
                    onView={handleViewMaterial}
                />
            )}

            <Footer />
        </div>
    );
};

export default SearchPage; 