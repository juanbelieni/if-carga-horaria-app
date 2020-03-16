import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default {
  async index(table: string) {
    const res = await api.get(`/${table}`);
    return res.data;
  },
};
