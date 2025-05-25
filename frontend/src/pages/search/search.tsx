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
import { LEARNING_MATERIALS } from '../../constants/demo/materials';
import { MAIN_NAVIGATION, AUTH_NAVIGATION } from '../../constants/navigation';
import { Material } from '../../types/material.types';
import * as headerStyles from '../../components/header/header.module.css';
import * as styles from './search.module.css';

const SearchPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [isAnimating, setIsAnimating] = useState(true);
    const [filteredMaterials, setFilteredMaterials] = useState(LEARNING_MATERIALS);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const { profile, auth } = useSelector(state => state.user);

    const isAuthenticated = !!auth.token && !!auth.expiresAt && Date.now() < auth.expiresAt;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q') || '';
        handleSearch(query);
        
        // Запускаем анимацию появления
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
    }, [location.search]);

    const handleSearch = (query: string) => {
        const filtered = LEARNING_MATERIALS.filter(material => 
            material.metadata.title.toLowerCase().includes(query.toLowerCase()) ||
            material.metadata.tags?.some(tag => 
                tag.toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredMaterials(filtered);
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
                <div className={styles.searchContainer}>
                    <div className={styles.searchWrapper}>
                        <SearchInput
                            isExpanded
                            defaultValue={new URLSearchParams(location.search).get('q') || ''}
                        />
                        <div className={styles.filters}>
                            <button className={styles.filterButton}>
                                Все фильтры
                            </button>
                            <div className={styles.filterTags}>
                                <button className={styles.filterTag}>Программирование</button>
                                <button className={styles.filterTag}>Математика</button>
                                <button className={styles.filterTag}>Физика</button>
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