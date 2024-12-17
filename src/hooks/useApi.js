import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
// import { OrderCtx } from "../contexts/OrderContext";


// Fetch data
export const useFetchData = (endpoint) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const { data } = await apiClient.get(endpoint);
      console.log("useFetchApi-Data: ", data);
      return data;
    },
    // staleTime: 1 * 60 * 1000, // 5 minutes
    // cacheTime: 1 * 60 * 1000, // 10 minutes
    // refetchOnWindowFocus: false, // Disable refetch on window focus
  });
};



// Create data
export const useCreateData = (endpoint) => {
  const queryClient = useQueryClient();
  // const { setOrderDetails } = OrderCtx();

  return useMutation(
    {
    // queryKey:[endpoint],
    mutationFn: async (newData) => {   
      const headers = newData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json'};   
      const { data } = await apiClient.post(endpoint, newData, {headers});
      return data;
    },
    
      onSuccess: (data) => {
       queryClient.invalidateQueries([endpoint]);
       console.log("RETURN RES", data)      
      //  setOrderDetails("data")
      },
      onError: (error) => {
        console.error('ERROR FROM useAPI MUTATION:', error);    
    }
    }
    
  );
};


// Update data
export const useUpdateData = (endpoint) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updatedData }) => {  
      const headers = updatedData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json'};      
      const { data } = await apiClient.put(`${endpoint}/${id}`, updatedData, {headers});
      return data;
    },
    
      onSuccess: (data) => {
        console.log('useUPDATE User :', data);  
        queryClient.invalidateQueries([endpoint]);
      },
    });
};

// Delete data
export const useDeleteData = (endpoint) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await apiClient.delete(`${endpoint}/${id}`);
      return data;
    },    
      onSuccess: () => {
        queryClient.invalidateQueries([endpoint]);
      },
    
});
};
