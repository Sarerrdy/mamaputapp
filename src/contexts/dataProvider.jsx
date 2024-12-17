// import { fetchUtils } from 'react-admin';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from "../services/apiClient";

// const apiUrl = 'http://127.0.0.1:5001/api';

const getList = async (resource) => {
  const { data } = await apiClient.get(`/${resource}`);
  return {
    data,
    total: data.length,
  };
};

const getOne = async (resource, { id }) => {
  const { data } = await apiClient.get(`/${resource}/${id}`);
  return { data };
};

const create = async (resource, { data: newData }) => {
  const { data } = await apiClient.post(`/${resource}`, newData);
  return { data: { ...newData, id: data.id } };
};

const update = async (resource, { id, data: updatedData }) => {
  const { data } = await apiClient.put(`/${resource}/${id}`, updatedData);
  return { data };
};

const deleteOne = async (resource, { id }) => {
  const { data } = await apiClient.delete(`/${resource}/${id}`);
  return { data };
};

const dataProvider = {
  getList,
  getOne,
  create,
  update,
  delete: deleteOne,
};

export default dataProvider;
