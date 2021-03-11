import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { API_URL } from '../utils/constants';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const setAuthData = ({ token, refreshToken }) => {
  localStorage.setItem('accessToken', token);
  localStorage.setItem('refreshToken', refreshToken);
};

export const resetAuthData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isAccessTokenExpired = () => {
  const decodedToken = jwtDecode(getAccessToken());
  const currentTime = Math.floor(new Date().getTime() / 1000);

  return decodedToken.exp <= currentTime + 10;
};

export const refreshTokens = () => {
  // const formData = new FormData();

  // formData.append('accessToken', getAccessToken());
  // formData.append('refreshToken', getRefreshToken());

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}account/refreshToken`, {
        refreshToken: getRefreshToken()
      }, {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      })
      .then((response) => {
        setAuthData(response.data);
        return resolve(response);
      })
      .catch((error) => {
        resetAuthData();
        return reject(error);
      });
  });
};
