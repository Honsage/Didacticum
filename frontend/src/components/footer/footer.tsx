import React from 'react';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>© 2025 Didacticum. Все права защищены</p>
      </div>
    </footer>
  );
};

export default Footer; 