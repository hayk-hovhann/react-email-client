import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./form.module.scss";
import { toast } from "react-toastify";
import usePostEmail, {
  FormType,
  ResponseDataType,
} from "components/hooks/usePostEmail";

export default () => {
  const [form, setForm] = useState<Partial<FormType>>({});
  const postEmailAPI = usePostEmail();

  useEffect(() => {
    if (postEmailAPI.loading) toast(`Email sending`, { type: `info` });
  }, [postEmailAPI.loading]);

  const onSubmit: SubmitHandler = async (e) => {
    e.preventDefault();

    const onSuccess = (data: ResponseDataType[`resp`]) => {
      if (data.error) {
        return toast(data.error.message, {
          type: `error`,
        });
      }

      toast(`Email sent from ${form.user_email} to ${form.user_name} `, {
        type: `success`,
      });
    };

    postEmailAPI.post({
      user_email: form.user_email || ``,
      user_name: form.user_name || ``,
      subject: form.subject || ``,
      onSuccess,
    });
  };
  const onInputChange: InputChangeHandler = (e) =>
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));

  const onTextAreaChange: TextAreaChangeHandler = (e) =>
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));

  return (
    <main>
      <div className={styles.container}>
        <form onSubmit={onSubmit}>
          <label htmlFor="user_name">Name</label>
          <input
            type="text"
            name="user_name"
            value={form.user_name}
            onChange={onInputChange}
            required
          />
          <label htmlFor="user_email" className="mt-4">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            value={form.user_email}
            onChange={onInputChange}
            required
          />
          <label htmlFor="message">Subject</label>
          <textarea
            name="subject"
            value={form.subject}
            onChange={onTextAreaChange}
            required
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </main>
  );
};

type SubmitHandler = (e: FormEvent<HTMLFormElement>) => void;
type TextAreaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => void;
type InputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
