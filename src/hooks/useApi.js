import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/apiClient';

// Fetch data
export const useFetchData = (menus) => {
  return useQuery( {
    queryKey:[menus],
    queryFn: async () => {
    const { data } = (await apiClient.get(menus));
    console.log(data);
    return data;
  }});
};

// Create data
export const useCreateData = (endpoint) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newData) => {
      const { data } = await apiClient.post(endpoint, newData);
      return data.j;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([endpoint]);
      },
    }
  );
};

// Update data
export const useUpdateData = (endpoint) => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, updatedData }) => {
      const { data } = await apiClient.put(`${endpoint}/${id}`, updatedData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([endpoint]);
      },
    }
  );
};

// Delete data
export const useDeleteData = (endpoint) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      const { data } = await apiClient.delete(`${endpoint}/${id}`);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([endpoint]);
      },
    }
  );
};
