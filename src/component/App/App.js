import './App.css';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function App() {
  // нет проверки токена, при обновлении страници выкидвает на экран логина
  const [login, setLogin] = useState(false);
  const [modal, setModal] = useState(false);

  if (login)
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('token')}`;

  return (
    <div className='root'>
      <ModalWindow active={modal} setModal={setModal}></ModalWindow>
      <div className='App'>
        <Routes>
          <Route
            path='/sign-up'
            element={<Registration></Registration>}
          ></Route>
          <Route
            path='/sign-in'
            element={<Login setLogin={setLogin} />}
          ></Route>
          <Route
            path='/'
            element={
              <ProtectedRouteElement
                element={Profile}
                login={login}
                setLogin={setLogin}
                setModal={setModal}
              ></ProtectedRouteElement>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
