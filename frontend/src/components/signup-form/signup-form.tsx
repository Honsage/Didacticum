import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './signup-form.module.css';

interface SignupFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    organization?: string;
}

interface SignupFormProps {
    formData: SignupFormData;
    error?: string;
    isLoading?: boolean;
    onInputChange: (field: keyof SignupFormData) => (value: string) => void;
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
    onInputChange,
    onSubmit
}) => {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h2 className={styles.title}>Регистрация</h2>
            
            {error && <div className={styles.error}>{error}</div>}
            
            <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => onInputChange('email')(e.target.value)}
                    placeholder="you@example.com"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="firstName">Имя</label>
                <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={e => onInputChange('firstName')(e.target.value)}
                    placeholder="Введите имя"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="lastName">Фамилия</label>
                <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={e => onInputChange('lastName')(e.target.value)}
                    placeholder="Введите фамилию"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="middleName">Отчество</label>
                <input
                    id="middleName"
                    type="text"
                    value={formData.middleName}
                    onChange={e => onInputChange('middleName')(e.target.value)}
                    placeholder="Введите отчество"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="organization">Организация</label>
                <input
                    id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={e => onInputChange('organization')(e.target.value)}
                    placeholder="Название организации"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="password">Пароль</label>
                <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={e => onInputChange('password')(e.target.value)}
                    placeholder="Ваш пароль"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="confirmPassword">Подтверждение пароля</label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={e => onInputChange('confirmPassword')(e.target.value)}
                    placeholder="Подтвердите пароль"
                    required
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