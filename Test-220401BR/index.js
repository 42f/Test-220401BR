import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'http://localhost:3000';
const user = 'BankinUser';
const password = '12345678';
const clientId = 'BankinClientId';
const clientSecret = 'secret';
const auth =
  'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const getRefreshToken = async () => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/login`,
      {
        user: user,
        password: password,
      },
      {
        headers: {
          authorization: auth,
          'Content-Type': 'application/json',
        },
      }
    );
    return data?.refresh_token;
  } catch (error) {
    console.error(error);
    throw new Error('Could not get the Refresh Token');
  }
};

const getAccessToken = async (refreshToken) => {
  try {
    const body = { grant_type: 'refresh_token', refresh_token: refreshToken };
    const { data } = await axios.post(`${BASE_URL}/token`, qs.stringify(body), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return data?.access_token;
  } catch (error) {
    console.error(error);
    throw new Error('Could not get the Access Token');
  }
};




const mainTest = async () => {
  try {
    const refreshToken = await getRefreshToken();
    const accessToken = await getAccessToken(refreshToken);
  } catch (error) {
    console.error(error);
  }
};

mainTest();
