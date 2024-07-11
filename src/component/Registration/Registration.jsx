import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';

function Registration() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Сбор данных из ипнутов
  const handlerChange = (e) => {
    setError(e.target.validationMessage);
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://js-test.kitactive.ru/api/register', inputValue)
      .then((user) => {
        if (user) {
          navigate('/sign-in', { replace: true });
        }
      })
      .catch(() => setError('Произошла ошибка, попробуйте позже'))
      .finally(() =>
        setInputValue({
          name: '',
          email: '',
          password: '',
        })
      );
  };

  return (
    <div className='registration'>
      <form className='form_login' onSubmit={handlerSubmit}>
        <label className='form_login-label'>
          Имя
          <input
            className='form_login-input'
            type='text'
            name='name'
            onChange={handlerChange}
            value={inputValue.name}
            maxLength={30}
            minLength={2}
            placeholder='Укажите Ваше имя'
            required
          ></input>
        </label>
        <label className='form_login-label'>
          Почта
          <input
            className='form_login-input'
            type='email'
            name='email'
            onChange={handlerChange}
            value={inputValue.email}
            placeholder='Введите почту'
            required
          ></input>
        </label>
        <label className='form_login-label'>
          Пароль
          <input
            className='form_login-input'
            type='password'
            name='password'
            onChange={handlerChange}
            value={inputValue.password}
            placeholder='Введите пароль'
            maxLength={8}
            minLength={4}
            required
          ></input>
        </label>
        <span className='form_login-error'>{error}</span>
        <input type='submit'></input>
      </form>
      <span>Уже зарегистрированы?</span>
      <Link to='/sign-in'>Войти</Link>
    </div>
  );
}

export default Registration;
