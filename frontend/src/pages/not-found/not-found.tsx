import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Страница не найдена</h2>
      <p className={styles.text}>
        Извините, но страница, которую вы ищете, не существует или была перемещена.
      </p>
      <Link to="/" className={styles.link}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound; 