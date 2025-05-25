import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchInput from '../../components/search-input/search-input';
import MaterialCard from '../../components/material-card/material-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { logout } from '../../store/slices/user.slice';
import { LEARNING_MATERIALS } from '../../constants/demo/materials';
import { MAIN_NAVIGATION, AUTH_NAVIGATION } from '../../constants/navigation';
import { HOME_PAGE_CONTENT } from '../../constants/content/home';
import * as headerStyles from '../../components/header/header.module.css';
import * as styles from './home.module.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { profile, auth } = useSelector(state => state.user);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
        setTimeout(() => {
            navigate('/search');
        }, 300);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const isAuthenticated = !!auth.token && !!auth.expiresAt && Date.now() < auth.expiresAt;

    return (
        <div className={styles.container}>
            <Header 
                navItems={
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
                }
            />
            
            <div className={styles.welcome}>
                <div className={styles.welcomeContent}>
                    <h1 className={styles.title}>
                        {HOME_PAGE_CONTENT.welcome.title}
                    </h1>
                    <p className={styles.subtitle}>
                        {HOME_PAGE_CONTENT.welcome.subtitle}
                    </p>
                </div>
            </div>

            <main className={styles.main}>
                <section className={styles.search}>
                    <div className={styles.searchContent}>
                        <SearchInput 
                            onFocus={handleSearchFocus}
                            isExpanded={isSearchFocused}
                        />
                    </div>
                </section>

                <section className={styles.materials}>
                    <div className={styles.content}>
                        <h2 className={styles.sectionTitle}>
                            {HOME_PAGE_CONTENT.sections.popularMaterials}
                        </h2>
                        <div className={styles.grid}>
                            {LEARNING_MATERIALS.slice(0, 3).map((material, index) => (
                                <div key={index} className={styles.gridItem}>
                                    <MaterialCard 
                                        material={material}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage; 