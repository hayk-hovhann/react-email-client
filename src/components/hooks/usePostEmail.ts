import { useCallback, useState } from "react";

const BASE_URL = `https://technotes.com`;

const usePostEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ResponseDataType | null>(null);

  const post: PostHandler = useCallback(async (form) => {
    try {
      const resp = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: form.user_name,
          to: form.user_email,
          subject: form.subject,
        }),
      });

      const data: ResponseDataType = await resp.json();
      setData(data);

      form.onSuccess(data.resp);
    } catch (e) {
      console.log(e);
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    post,
    data,
    loading,
    error,
  };
};

export default usePostEmail;

type PostHandler = (form: FormType) => void;

export type FormType = {
  user_name: string;
  user_email: string;
  subject: string;
  onSuccess: (data: ResponseDataType[`resp`]) => void;
};

export type ResponseDataType = {
  resp: {
    error?: { statusCode: string; message: string | null };
    data?: { id: string };
  };
};
