export function searchParamsToString(params: SearchParams): string {
    const query = Object.entries(params)
      .flatMap(([key, value]) => {
        if (value === undefined) return [];
        if (Array.isArray(value)) {
          return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
        }
        return [`${encodeURIComponent(key)}=${encodeURIComponent(value)}`];
      })
      .join("&");
  
    return query;
  }
  