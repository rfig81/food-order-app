import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../config";
import tryCatch from "../helpers/tryCatch";

async function sendHttpRequest<T>(
  url: string,
  config?: RequestInit
): Promise<T> {
  const completeUrl = url.startsWith("http") ? url : `${API_URL}/${url}`;
  const response = await fetch(completeUrl, config);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Something went wrong, failed to send request."
    );
  }

  const data = await response.json();

  return data;
}

type UseHttpResult<T> = {
  isLoading: boolean;
  data: T;
  error: Error | null;
  sendRequest: (requestData?: BodyInit) => Promise<void>;
  clearData: () => void;
};

export default function useHttp<T>({
  url,
  config,
  initialData,
}: {
  url: string;
  config?: RequestInit;
  initialData: T;
}): UseHttpResult<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<Error | null>(null);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async (requestData?: BodyInit) => {
      setIsLoading(true);
      setError(null); // Reset error state before a new request

      const { data: fetchedData, error } = await tryCatch(
        sendHttpRequest<T>(url, { ...config, body: requestData })
      );

      if (error) setError(error);
      else setData(fetchedData);

      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (!config || config.method === "GET") {
      sendRequest();
    }
  }, [config, sendRequest]);

  return { isLoading, data, error, sendRequest, clearData };
}
