import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.106:3333',
});

export default {
  async index(table: string, params: Object) {
    const res = await api.get(`/${table}`, { params });
    return res.data;
  },
  async store(table: string, data: Object) {
    await api.post(`/${table}`, data);
  },
};
