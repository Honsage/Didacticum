import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
import { RegisterUser } from '../../types/user.types';
import SignupForm from '../../components/signup-form/signup-form';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import styles from './signup.module.css';

interface SignupFormState extends RegisterUser {
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<SignupFormState>({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    organization: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    // Валидация
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const token = await authService.register(formData);
      login(token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <Header minimal />

      <main className={styles.main}>
        <SignupForm
          formData={formData}
          error={error}
          isLoading={isLoading}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
        />
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage; 