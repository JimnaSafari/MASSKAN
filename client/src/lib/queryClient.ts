import { QueryClient } from "@tanstack/react-query";

// Create query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Default fetch function for react-query
const defaultQueryFn = async ({ queryKey }: { queryKey: (string | number)[] }) => {
  const url = Array.isArray(queryKey) ? queryKey.join('') : queryKey;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

queryClient.setQueryDefaults([], {
  queryFn: defaultQueryFn,
});

// Helper function for API requests (POST, PATCH, DELETE)
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};