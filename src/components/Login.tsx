import React, { useState } from 'react';
import '../style/LoginForm.css';
import { useNavigate } from 'react-router-dom';

const MOCK_LOGIN = 'test@test.test';
const MOCK_PASSWORD = 'test12';

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{6,}$/;

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const navigate = useNavigate();

  const isFormFilled = login.trim() !== '' && password.trim() !== '';

  // Валидация полей
  const validate = () => {
    let valid = true;
    
    // Сброс ошибок при новой попытке
    setLoginError(false);
    setPasswordError(false);
    setIsAuthError(false);
    setAuthMessage('');
    
    if (!emailRegex.test(login)) {
      setLoginError(true);
      valid = false;
    }
    
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      valid = false;
    }
    
    return valid;
  };

  // Обработка отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormFilled) return;
    
    // Сначала проверяем валидацию
    if (!validate()) return;
    
    // Если валидация прошла, проверяем авторизацию
    if (login === MOCK_LOGIN && password === MOCK_PASSWORD) {
      navigate('/allEvents');
    } else {
      setIsAuthError(true);
    }
  };

  // Обработчики изменения полей
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
    if (loginError) setLoginError(false);
    if (isAuthError) {
      setIsAuthError(false);
      setAuthMessage('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(false);
    if (isAuthError) {
      setIsAuthError(false);
      setAuthMessage('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" id="login-form" onSubmit={handleSubmit}>
        {/* Логин */}
        <div className="form-group">
          <div className={`input-wrapper ${isAuthError || loginError ? 'input-error' : ''}`}>
            <input
              type="text"
              id="login"
              value={login}
              onChange={handleLoginChange}
              required
              autoComplete="username"
              placeholder=" "
            />
            <label htmlFor="login">Логин</label>
          </div>
        </div>
        {/* Пароль */}
        <div className="form-group">
          <div className={`input-wrapper ${isAuthError || passwordError ? 'input-error' : ''}`} style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="current-password"
              placeholder=" "
            />
            <label htmlFor="password">Пароль</label>
            {/* Кнопка-глаз */}
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: 18,
                color: '#888'
              }}
              tabIndex={-1}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        {/* Сообщение об ошибке авторизации */}
        {authMessage && (
          <div className="input-hint" style={{ textAlign: 'center' }}>
            {authMessage}
          </div>
        )}
        {/* Кнопка входа */}
        <button
          type="submit"
          className={`submit-btn fixed-submit-btn${!isFormFilled ? ' submit-btn--disabled' : ''}`}
          disabled={!isFormFilled}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;