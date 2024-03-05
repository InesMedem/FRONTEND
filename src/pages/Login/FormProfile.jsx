import './FormProfile.css';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

import { FigureUser, Uploadfile } from '../../components';
import { useAuth } from '../../context/authContext';
import { useUpdateError } from '../../hooks';
import { update } from '../../services/user.service';
export const FormProfile = () => {
  const { user, setUser, logout } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  const defaultData = {
    userName: user?.user,
  };

  //! ------------ 1) La funcion que gestiona el formulario----
  const formSubmit = (formData) => {
    Swal.fire({
      title: 'Are you sure you want to change your data profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(73, 193, 162)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'YES',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById('file-upload').files;

        if (inputFile.length != 0) {
          const custonFormData = {
            ...formData,
            image: inputFile[0],
          };

          setSend(true);
          setRes(await update(custonFormData));
          setSend(false);
        } else {
          const custonFormData = {
            ...formData,
          };
          setSend(true);
          setRes(await update(custonFormData));
          setSend(false);
        }
      }
    });
  };

  //! -------------- 2 ) useEffect que gestiona la parte de la respuesta ------- customHook

  useEffect(() => {
    console.log(res);
    useUpdateError(res, setRes, setUser, logout);
  }, [res]);

  return (
    <>
      <div className="div-user-profile-setting">
        <div className="div-user-profile-setting-card">
          <figure className="dataProfile">
            <h4>UPDATE PROFILE</h4>
            <h4>{user.name}</h4>
            <img className="pictureProfile" src={user.image} alt="foto User" />
          </figure>
          <input
            className="input_user"
            type="text"
            id="userName"
            name="userName"
            autoComplete="false"
            defaultValue={defaultData?.name}
            {...register('userName')}
          />
          <label htmlFor="custom-input" className="custom-placeholder">
            username
          </label>
          <Uploadfile />
          <button className="button--green" type="submit" disabled={send}>
            Change data profile
          </button>
          {/* nav profile */}
          {/* update profile with update file  */}
        </div>
      </div>
      {/* <div className="containerProfile">
        <div className="containerDataNoChange">
          <FigureUser user={user} />
        </div>
        <div className="form-wrap formProfile">
          
          <p>Please, enter your new data profile</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
      
            </div>
          
            <div className="btn_container">
              
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};
