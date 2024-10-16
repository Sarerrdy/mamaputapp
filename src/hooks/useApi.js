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
      const { data } = await apiClient.post(endpoint, newData);
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

// Create data
export const useCreateData1 = (endpoint) => {
  const queryClient = useQueryClient();
  return useMutation({
    // queryKey:[endpoint],
    mutationFn: async (newData) => {      
      const { data } = await apiClient.post(endpoint, newData);
      console.log("RETURN MUTATION-1", data)   
      return data;
    },
    
      onSuccess: (data1) => {
        queryClient.invalidateQueries([endpoint]);
       console.log("RETURN MUTATION-2", data1)      
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
