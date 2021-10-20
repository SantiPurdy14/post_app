import api from './api';

export const ListPostTag = (tag) =>  api.get(`https://dummyapi.io/data/v1/tag/${tag}/post?limit=10`);

