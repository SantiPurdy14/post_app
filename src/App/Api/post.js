import api from './api';

export const ListPost = () =>  api.get(`https://dummyapi.io/data/v1/post?limit=10`);

