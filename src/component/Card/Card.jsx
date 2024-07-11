import axios from 'axios';
import { useEffect, useState } from 'react';
import './Card.css';
import { useSelector, useDispatch } from 'react-redux';
import { updateArr } from '../../counterSlice';

function Card({ data }) {
  const [imgLink, setImgLink] = useState('');
  const dispatch = useDispatch();
  const docs = useSelector((state) => state.mediaArr);

  // Получение изображения, если файл является картинкой
  useEffect(() => {
    if (data.mimeType === 'image/jpeg') {
      axios
        .get(`https://js-test.kitactive.ru/api/media/${data.id}`, {
          responseType: 'blob',
        })
        .then((i) => {
          setImgLink(window.URL.createObjectURL(i.data));
        });
    }
  }, [data]);

  // Удаление документа
  const handlerDelDoc = (id) => {
    axios
      .delete(`https://js-test.kitactive.ru/api/media/${id}`)
      .then(() => dispatch(updateArr(docs.value.filter((i) => i.id !== id))))
      .catch((e) => console.log(e));
  };
  // Скачивание файла с сервера
  const handlerDownloadDoc = (id) => {
    axios
      .get(`https://js-test.kitactive.ru/api/media/${id}`, {
        responseType: 'blob',
      })
      .then((i) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(i.data);
        link.download = data.name;
        link.click();
        link.remove();
      });
  };

  return (
    <article className='card'>
      <h2 className='card__title'>{data.name}</h2>
      <div
        className='card__continer'
        onClick={() => handlerDownloadDoc(data.id)}
      >
        {data.mimeType === 'image/jpeg' ? (
          <img className='card__img' src={imgLink} alt={data.name}></img>
        ) : (
          <div className='card__img-doc'></div>
        )}
      </div>
      <button className='card__button' onClick={() => handlerDelDoc(data.id)}>
        Удалить
      </button>
    </article>
  );
}

export default Card;
