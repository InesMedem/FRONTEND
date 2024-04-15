import axios from 'axios';

import { updateToken } from '../utils/updateToken';

/**
 * Tenemos que cambiar la URL
 *
 */
export const extraConfig = () => {
  return axios.create({
    baseURL: 'xsolarx-f5brr5xdt-ines-s-projects.vercel.app',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${updateToken()}`,
    },
    timeout: 60000,
  });
};
