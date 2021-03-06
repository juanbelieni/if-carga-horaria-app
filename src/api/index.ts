import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.106:3333',
});

type Id = string | number;

export default {
  async index(table: string, params?: Object) {
    const res = await api.get(`/${table}`, { params });
    return res.data;
  },

  async store(table: string, data: Object) {
    const res = await api.post(`/${table}`, data);

    return res.data;
  },

  async show(table: string, id: Id) {
    const res = await api.get(`/${table}/${id}`);

    return res.data;
  },

  async destroy(table: string, id: Id) {
    await api.delete(`/${table}/${id}`);
  },

  async update(table: string, id: Id, data: Object) {
    await api.put(`/${table}/${id}`, data);
  },

  async getReport(report: string, params: Object) {
    const res = await api.get(`/reports/${report}`, { params });

    return res.data;
  },
};
