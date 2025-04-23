export const getCurrentLocation = async (): Promise<GeolocationData> => {

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("geolocation-not-supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "permission-denied";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "position-unavailable";
              break;
            case error.TIMEOUT:
              errorMessage = "request-timed-out";
              break;
            default:
              errorMessage = "unknown-error";
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  };