import { getCurrentLocation } from "@/lib/apis/location.api";
import { useQuery } from "@tanstack/react-query";

export function useLocation() {
  const { isLoading, refetch } = useQuery({
    queryKey: ["geolocation"],
    queryFn: getCurrentLocation,
    enabled: false,
    retry: false,
  });

  return {
    isLoading,
    refetchCurrentLocation: refetch,
  };
}
