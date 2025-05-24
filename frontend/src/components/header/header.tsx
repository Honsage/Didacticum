import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './header.module.css';
import logoPath from '../../assets/logo/logo.svg';

interface HeaderProps {
    navItems?: React.ReactNode;
    rightContent?: React.ReactNode;
    minimal?: boolean;
}

const Header: React.FC<HeaderProps> = ({ navItems, rightContent, minimal = false }) => {
    return (
        <header className={styles.header}>
            <div className={`${styles.content} ${minimal ? styles.contentMinimal : ''}`}>
                <Link to="/" className={styles.logo}>
                    <img src={logoPath} alt="Didacticum" />
                    <span>Didacticum</span>
                </Link>
                {!minimal && (
                    <>
                        {navItems && (
                            <nav className={styles.nav}>
                                {navItems}
                            </nav>
                        )}
                        {rightContent && (
                            <div className={styles.rightContent}>
                                {rightContent}
                            </div>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};

export default Header; 