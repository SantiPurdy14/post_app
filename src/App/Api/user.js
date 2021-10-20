import api from './api';

export const FullUser = (id) =>  api.get(`https://dummyapi.io/data/v1/user/${id}`);