import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosError } from 'axios';
import './AuthPage.scss';
import { AuthContext } from '../../store/AuthContext';
import { Loader } from '../../common/components/Loader';
import { ErrorNotification } from '../../common/components/ErrorNotification';

function validation(field: string, value: string) {
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;

  switch (field) {
    case 'username':
      return value.trim().length >= 4;

    case 'password':
      return passwordPattern.test(value) && value.length >= 6;

    default:
      return true;
  }
}

export const AuthPage: React.FC = React.memo(() => {
  const [{ username, password }, setValues] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({ username: false, password: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const isSubmitDisabled = isSubmitting
    || errors.username || !username
    || errors.password || !password;

  const loginUser = async () => {
    await login({ username, password });

    navigate(state?.pathname || '/', { replace: true });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await loginUser();
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data?.error);
      } else {
        setErrorMessage('Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = event.target;

    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: false }));
  };

  const handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: field, value } = event.currentTarget;

    setErrors(current => ({
      ...current,
      [field]: !validation(field, value),
    }));
  };

  return (
    <section className="authPage">
      <div className="container">
        <div className="authPage__content">
          <h1 className="authPage__title">
            Sign in
          </h1>

          <div className="authPage__form-body">
            <form
              action="/"
              method="POST"
              className="authPage__form"
              onSubmit={handleSubmit}
            >
              <label htmlFor="username" className="authPage__label">
                Your Username:
              </label>
              {errors.username && (
                <span className="authPage__error">
                  Username is not valid
                </span>
              )}
              <input
                id="username"
                type="text"
                name="username"
                required
                autoComplete="username"
                placeholder="Enter your username"
                className="authPage__field"
                disabled={isSubmitting}
                value={username}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />

              <label htmlFor="password" className="authPage__label">
                Your Password:
              </label>
              {errors.password && (
                <span className="authPage__error">
                  At least 6 chars with letters and numbers are required
                </span>
              )}
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="authPage__field"
                disabled={isSubmitting}
                value={password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />

              <button
                type="submit"
                className="authPage__button"
                disabled={isSubmitDisabled}
              >
                {isSubmitting ? <Loader /> : 'Login' }
              </button>
            </form>
          </div>
        </div>

        {errorMessage && <ErrorNotification message={errorMessage} />}
      </div>
    </section>
  );
});
