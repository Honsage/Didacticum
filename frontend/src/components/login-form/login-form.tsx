import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login-form.module.css';

interface LoginFormProps {
  email: string;
  password: string;
  error?: string;
  isLoading?: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  error,
  isLoading = false,
  onEmailChange,
  onPasswordChange,
  onSubmit
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title}>Вход в систему</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.inputGroup}>
        <label htmlFor="email">Электронная почта</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Ваш пароль"
          required
          disabled={isLoading}
        />
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </button>

      <div className={styles.registerLink}>
        Еще нет аккаунта?{' '}
        <Link to="/register">Зарегистрируйтесь</Link>
      </div>
    </form>
  );
};

export default LoginForm;
