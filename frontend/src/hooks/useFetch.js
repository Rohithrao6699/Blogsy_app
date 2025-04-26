import axios from "axios";
import { Token } from "monaco-editor";
import { useEffect, useState } from "react";

export function useFetch(method, url, data = {}, headers = {}, params = {}) {
  const [data, setData] = useState({});
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
      setData(res.data);
      setLoader(false);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loader, error };
}
