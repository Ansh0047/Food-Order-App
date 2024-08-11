import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send the request."
    );
  }
  return resData;
}

// custom hook
export default function useHttp(url, config, initialData) {
  // to handle the error
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  function clearData(){
    setData(initialData);
  }

  // here useCallback is used just to memozie this function when there is no change in the state
  // and if changes will make new function
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    // this is special to handle the get request and for other http requsts we will expose the sendRequest function
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest(); // because in get request, fecth don't need any config its by default get request
    }
  }, [sendRequest, config]);

  // so these are the values managed by this custom hook and these are now exposed to be used in the components
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
