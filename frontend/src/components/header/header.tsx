import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

interface HeaderProps {
    navItems?: ReactNode;
    rightContent?: ReactNode;
    minimal?: boolean;
}

const Header: React.FC<HeaderProps> = ({ navItems, rightContent, minimal = false }) => {
    return (
        <header className={styles.header}>
            <div className={`${styles.content} ${minimal ? styles.contentMinimal : ''}`}>
                <Link to="/" className={styles.logo}>
                    <img src="/logo.svg" alt="Didacticum" />
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