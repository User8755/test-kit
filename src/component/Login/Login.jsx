import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setLogin }) {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      .post('https://js-test.kitactive.ru/api/login', inputValue)
      .then((user) => {
        localStorage.setItem('token', user.data.token);
        setLogin(true);
        navigate('/', { replace: true });
      })
      .catch(() => setError('Произошла ошибка, попробуйте позже'))
      .finally(() =>
        setInputValue({
          email: '',
          password: '',
        })
      );
  };

  return (
    <div className='login'>
      <form className='form_login' onSubmit={handlerSubmit}>
        <h2 className='form_login-title'>Вход в личный кабинет</h2>
        <label className='form_login-label'>
          Почта:
          <input
            className='form_login-input'
            type='email'
            name='email'
            placeholder='Укажите почту'
            onChange={handlerChange}
            value={inputValue.email}
            required
          ></input>
        </label>
        <label className='form_login-label'>
          Пароль:
          <input
            className='form_login-input'
            type='password'
            name='password'
            placeholder='Введите пароль'
            onChange={handlerChange}
            value={inputValue.password}
            maxLength={8}
            minLength={4}
            required
          ></input>
        </label>
        <span className='form_login-error'>{error}</span>
        <input type='submit'></input>
      </form>
      <span>Нет аккаунта?</span>
      <Link to='/sign-up'>Зарегистрироваться</Link>
    </div>
  );
}
export default Login;
