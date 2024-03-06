import './ChangePassword.css';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

import { useAuth } from '../../context/authContext';
import { useChangePasswordError } from '../../hooks';
import { modifyPassword } from '../../services/user.service';

export const ChangePassword = () => {
  const { setUser } = useAuth();
  const { handleSubmit, register } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  //! -----------------1) LA FUNCIOON QUE GESTIONA EL FORMULARIO

  const formSubmit = (formData) => {
    const { password, newPassword, confirmPassword } = formData;

    if (newPassword == confirmPassword) {
      Swal.fire({
        title: 'Are you sure you want to change your password?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(73, 193, 162)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'YES',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setSend(true);
          setRes(await modifyPassword({ password, newPassword }));
          setSend(false);
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: " New Password don't match witch confirmation password❎.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  //! ------------------2) GESTION DE LA RESPUESTA POR EL CUSTOMHOOK Y AYUDADO POR EL USEEFFECT

  useEffect(() => {
    console.log(res);
    useChangePasswordError(res, setRes, setUser);
  }, [res]);

  //! no tenemos condicionales de navegacion porque cuando me desloguee el componente protected me llevara al login

  return (
    <div className="form-wrap-background">
      <div className="form-wrap">
        <h3>Change your password</h3>
        <span className="material-symbols-outlined">lock</span>
        <h6>Please, enter your old and new passwords</h6>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="password_container">
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register('password', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              Old password
            </label>
          </div>
          <div className="newPassword_container">
            <input
              className="input_user"
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="false"
              {...register('newPassword', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              New password
            </label>
          </div>
          <div className="confirmPassword_container">
            <input
              className="input_user"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="false"
              {...register('confirmPassword', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder"></label>
          </div>
          <button className="button--green" type="submit" disabled={send}>
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};
