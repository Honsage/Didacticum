import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
import LoginForm from '../../components/login-form/login-form';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import * as styles from './login.module.css';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (value: string) => {
    setFormData(prev => ({ ...prev, email: value }));
  };

  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({ ...prev, password: value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setError('');
    setIsLoading(true);

    try {
      const token = await authService.login(formData);
      login(token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  }, [formData, isLoading, login, navigate]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e as unknown as React.FormEvent);
    }
  }, [handleSubmit, isLoading]);

  React.useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={styles.loginContainer}>
      <Header minimal />

      <main className={styles.main}>
        <LoginForm
          email={formData.email}
          password={formData.password}
          error={error}
          isLoading={isLoading}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleSubmit}
        />
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
