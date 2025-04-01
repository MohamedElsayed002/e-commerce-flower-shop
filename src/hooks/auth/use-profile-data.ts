import { useQuery } from "@tanstack/react-query";

export function useGetUserData() {
  const { data, isLoading, isError, error, refetch } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: async () => {
      const payload = await fetch('/api/profile-data', {
        method: 'GET',
        credentials: 'include',
      });
      
      if ("error" in payload) {
        throw new Error(payload.error);
      }
      
      return payload.json();
    },
  });

  return { 
    userData: data, 
    isLoading, 
    isError, 
    error,
    refetchUserData: refetch
  };
}