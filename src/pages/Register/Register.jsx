import './Register.css';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Uploadfile } from '../../components/UploadFile/Uploadfile';
import { useAuth } from '../../context/authContext';
import { useRegisterError } from '../../hooks/useRegisterError';
import { registerWithRedirect } from '../../services/user.service';

export const Register = () => {
  // allUser es la respuesta completa del 200 del service de registro
  const navigate = useNavigate();
  const { allUser, setAllUser, bridgeData, setDeleteUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setOkRegister] = useState(false);

  //------------------------------* Función para el formulario *-------------------------------------------------------------

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById('file-upload').files;

    if (inputFile.length != 0) {
      // Si no es 0 --> Hay una imagen
      const custonFormData = {
        ...formData,
        image: inputFile[0],
      };

      setSend(true);
      setRes(await registerWithRedirect(custonFormData));
      setSend(false);
    } else {
      setSend(true);
      setRes(await registerWithRedirect(formData));
      setSend(false);
    }
  };

  //------------------------------* Parte 2: Función para el formulario *-------------------------------------------------------------
  // AllUser: Los usuarios que vienen del register
  // User: Los usuarios que vienen del login

  useEffect(() => {
    console.log(res);
    useRegisterError(res, setOkRegister, setRes);
    if (res?.status == 200) bridgeData('ALLUSER');
  }, [res]);

  useEffect(() => {
    console.log('😍', allUser);
  }, [allUser]);

  useEffect(() => {
    setDeleteUser(() => false);
  }, []);

  //------------------------------* Estados de navegación *-------------------------------------------------------------
  if (okRegister) {
    return <Navigate to="/verifyCode" />;
  }

  return (
    <>
      <div className="form-wrap">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <label htmlFor="input_user">
              Username
              <input
                className="input_user"
                type="text"
                id="userName"
                name="userName"
                autoComplete="false"
                {...register('userName', { required: true })}
              />
            </label>
          </div>

          <div className="password_container form-group">
            <label htmlFor="input_password">
              Password
              <input
                className="input_password"
                type="password"
                id="password"
                name="password"
                autoComplete="false"
                {...register('password', { required: true })}
              />
            </label>
          </div>

          <div className="email_container form-group">
            <label htmlFor="input_email">
              Email
              <input
                className="input_email"
                type="email"
                id="email"
                name="email"
                autoComplete="false"
                {...register('email', { required: true })}
              />
            </label>

            <div className="gender">
              <input
                type="radio"
                name="gender"
                id="Hombre"
                value="Hombre"
                {...register('gender')}
              />
              <label htmlFor="Hombre" className="label-radio hombre">
                Hombre
              </label>
              <input
                type="radio"
                name="gender"
                id="Mujer"
                value="Mujer"
                {...register('gender')}
              />
              <label htmlFor="Mujer" className="label-radio mujer">
                Mujer
              </label>
            </div>
            <Uploadfile />
          </div>

          <div className="btn_container">
            <button
              className="btn"
              type="submit"
              disabled={send}
              style={{ background: send ? '#49c1a388' : '#2f7a67' }}
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <div className="footerForm">
        <p className="bottom-text">
          By clicking the Sign Up button, you agree to our{' '}
          <Link className="anchorCustom">Terms & Conditions</Link> and{' '}
          <Link className="anchorCustom">Privacy Policy</Link>.
        </p>
        <p className="login-text">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </>
  );
};
