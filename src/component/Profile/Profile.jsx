import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card/Card';
import './Profile.css';
import { updateArr } from '../../counterSlice';

function Profile({ setLogin, login, setModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const docs = useSelector((state) => state.mediaArr);

  // Запрос документов с сервера
  useEffect(() => {
    if (login) {
      axios
        .get('https://js-test.kitactive.ru/api/media')
        .then((doc) => dispatch(updateArr(doc.data.files.reverse())))
        .catch((e) => console.log(e));
    }
  }, [dispatch, login]);
  // Выходи из аккаунта
  const handlerLogout = () => {
    // Возможно токен нужно было записывать в хранилище редакс
    axios
      .post(
        'https://js-test.kitactive.ru/api/logout',
        localStorage.getItem('token')
      )
      .then(() => {
        setLogin(false);
        navigate('/sign-in', { replace: true });
        localStorage.clear();
      })
      .catch((e) => console.log(e));
    // Ошибка улетает в консоль, по хорошему нужно сделать уведомление пользователю
  };

  const handlerOpenModalWondow = () => {
    setModal(true);
  };

  return (
    <div className='profile'>
      <header className='header'>
        <h2 className='header__title'>Добро пожаловать, Пользователь</h2>
        <button onClick={handlerLogout}>Выход</button>
      </header>
      <main className='main'>
        <header className='main__header'>
          <h3 className='main__header_title'>Список документов</h3>
          <span className='main__header_counter'>
            Загружено {docs.value.length} из 20 документов
          </span>
          <button
            className='main__header_button'
            onClick={handlerOpenModalWondow}
            disabled={docs.value.length > 19 ? true : false}
          >
            Загрузить новый документ
          </button>
        </header>
        <section className='docs'>
          {docs.value.length === 0 ? (
            <span>Нет загруженных документов</span>
          ) : (
            docs.value.map((d) => {
              return <Card key={d.id} data={d}></Card>;
            })
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
