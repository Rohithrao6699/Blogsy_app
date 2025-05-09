import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch(method, url, data = {}, headers = {}, params = {}) {
  const [dataa, setDataa] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({});

  async function fetchData() {
    try {
      setLoader(true);
      const res = await axios({
        method: method,
        url: url,
        params: params,
        data: data,
        headers: headers,
      });
      setDataa(res.data);
      setLoader(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { dataa, loader, error };
}
