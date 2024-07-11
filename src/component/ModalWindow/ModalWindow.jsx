import { useState } from 'react';
import './ModalWindow.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateArr } from '../../counterSlice';
function ModalWindow({ active, setModal }) {
  const [error, setError] = useState('');
  const [isDisabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  // Отправка файла на сервер
  const hendlerSendFile = (e) => {
    e.preventDefault();
    const fileField = document.querySelector('input[type="file"]');
    axios
      .post('https://js-test.kitactive.ru/api/media/upload', fileField.files)
      .then(() => {
        setModal(false);
        axios
          .get('https://js-test.kitactive.ru/api/media')
          .then((doc) => dispatch(updateArr(doc.data.files.reverse())))
          .catch((e) => console.log(e));
      })
      .catch(() => setError('Произошла ошибка, попробуйте позже'))
      .finally(() => {
        e.target.reset();
      });
  };

  // Проверка размера файла
  const handlerChekcFileSize = (e) => {
    if (e.target.files[0].size >= 1000000) {
      setError('Слишком большой размер файла');
      setDisabled(true);
    } else {
      setError('');
      setDisabled(false);
    }
  };
  return (
    <div
      className={active ? 'modal__overlay' : 'modal__overlay-disabled'}
      onClick={() => setModal(false)}
    >
      <div className='modal__window' onClick={(evt) => evt.stopPropagation()}>
        <form className='modal__form' onSubmit={hendlerSendFile}>
          <h2 className='modal__form_title'>Выберите файл</h2>
          <span className='modal__form_info'>
            Размер файла не должен превышать 1мб
          </span>
          <input
            className='modal__form_input-file'
            type='file'
            onChange={handlerChekcFileSize}
          ></input>
          <span className='modal__form_error'>{error}</span>
          <input type='submit' disabled={isDisabled}></input>
        </form>
        <button
          className='button_close'
          onClick={() => setModal(false)}
        ></button>
        <button className='button_close-bottom' onClick={() => setModal(false)}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default ModalWindow;
