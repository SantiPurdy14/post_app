import api from './api';

export const ListComment = (id) =>  api.get(`https://dummyapi.io/data/v1/post/${id}/comment?limit=10`);

