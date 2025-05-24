import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterUser } from '../../types/user.types';
import * as styles from './signup-form.module.css';

interface SignupFormProps {
  formData: RegisterUser & {
    confirmPassword: string;
  };
  error?: string;
  isLoading?: boolean;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RequiredLabel: React.FC<{ htmlFor: string; text: string }> = ({ htmlFor, text }) => (
  <label htmlFor={htmlFor}>
    {text} <span className={styles.required}>*</span>
  </label>
);

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  error,
  isLoading = false,
  onFieldChange,
  onSubmit
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title}>Регистрация</h1>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.inputGroup}>
        <RequiredLabel htmlFor="firstName" text="Имя" />
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={(e) => onFieldChange('firstName', e.target.value)}
          placeholder="Иван"
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="lastName">Фамилия</label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={(e) => onFieldChange('lastName', e.target.value)}
          placeholder="Иванов"
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="middleName">Отчество</label>
        <input
          type="text"
          id="middleName"
          value={formData.middleName}
          onChange={(e) => onFieldChange('middleName', e.target.value)}
          placeholder="Иванович"
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <RequiredLabel htmlFor="email" text="Электронная почта" />
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => onFieldChange('email', e.target.value)}
          placeholder="you@example.com"
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <RequiredLabel htmlFor="password" text="Придумайте пароль" />
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => onFieldChange('password', e.target.value)}
          placeholder="Ваш пароль"
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <RequiredLabel htmlFor="confirmPassword" text="Повторите пароль" />
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
          placeholder="Ваш пароль"
          required
          disabled={isLoading}
        />
      </div>

      <div className={styles.inputGroup}>
        <RequiredLabel htmlFor="role" text="Ваша категория" />
        <select
          id="role"
          value={formData.role}
          onChange={(e) => onFieldChange('role', e.target.value)}
          required
          disabled={isLoading}
        >
          <option value="">Выберите категорию</option>
          <option value="teacher">Преподаватель</option>
          <option value="student">Студент</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="organization">Организация</label>
        <input
          type="text"
          id="organization"
          value={formData.organization}
          onChange={(e) => onFieldChange('organization', e.target.value)}
          placeholder="Название организации"
          disabled={isLoading}
        />
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </button>

      <div className={styles.loginLink}>
        Уже есть аккаунт?{' '}
        <Link to="/login">Войти</Link>
      </div>
    </form>
  );
};

export default SignupForm; 