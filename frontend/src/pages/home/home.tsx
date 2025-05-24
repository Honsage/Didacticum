import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchInput from '../../components/search-input/search-input';
import MaterialCard from '../../components/material-card/material-card';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { DEMO_MATERIALS } from '../../constants/demo/materials';
import { MAIN_NAVIGATION, AUTH_NAVIGATION } from '../../constants/navigation';
import { HOME_PAGE_CONTENT } from '../../constants/content/home';
import * as headerStyles from '../../components/header/header.module.css';
import * as styles from './home.module.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearchFocus = () => {
        setIsSearchFocused(true);
        setTimeout(() => {
            navigate('/search');
        }, 300);
    };

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
                        {AUTH_NAVIGATION.map(item => (
                            <Link 
                                key={item.path}
                                to={item.path} 
                                className={`${headerStyles.authLink} ${
                                    item.path === '/register' ? headerStyles.register : ''
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
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

            <div className={styles.search}>
                <div className={styles.searchContent}>
                    <SearchInput 
                        onFocus={handleSearchFocus}
                        isExpanded={isSearchFocused}
                    />
                </div>
            </div>

            <main className={styles.main}>
                <div className={styles.content}>
                    <section className={styles.materials}>
                        <h2 className={styles.sectionTitle}>
                            {HOME_PAGE_CONTENT.sections.popularMaterials}
                        </h2>
                        <div className={styles.grid}>
                            {DEMO_MATERIALS.map(material => (
                                <div key={material.id} className={styles.gridItem}>
                                    <MaterialCard material={material} />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage; 