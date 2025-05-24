import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../hooks/useDispatch';
import { setToken } from '../../store/slices/user.slice';
import { authService } from '../../services/auth.service';
import { RegisterUser } from '../../types/user.types';
import SignupForm from '../../components/signup-form/signup-form';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import * as styles from './signup.module.css';

interface SignupFormState extends RegisterUser {
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<SignupFormState>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    middleName: '',
    organization: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      const { token, expiresIn } = await authService.register(formData);
      dispatch(setToken({ token, expiresIn }));
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  }, [formData, isLoading, dispatch, navigate]);

  const handleInputChange = (field: keyof SignupFormState) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.signupContainer}>
      <Header minimal />

      <main className={styles.main}>
        <SignupForm
          formData={formData}
          error={error}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </main>

      <Footer />
    </div>
  );
};

export default SignupPage; 