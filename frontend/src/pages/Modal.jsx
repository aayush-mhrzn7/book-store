import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import config from "../config";
import { useNavigate } from "react-router-dom";

function Modal({ id }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${config.backendUrl}/book/${id}`);
      setData(response.data.data);
    })();
  }, []);
  useEffect(() => {
    setValue("title", data.title);
    setValue("description", data.description);
    setValue("url", data.url);
    setValue("author", data.author);
    setValue("price", data.price);
    setValue("language", data.language);
    setValue("price", data.price);
  }, [data]);
  const updateBook = async (data) => {
    const response = await axios.patch(
      `${config.backendUrl}update-book/${id}`,
      data
    );

    if (!response) {
      alert("failed to update");
    } else {
      alert("updated");
      navigate("/all-books");
    }
  };

  return (
    <div className="  inset-0 bg-black bg-opacity-50 z-40 h-[150vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center font-primary items-center">
      <form
        onSubmit={handleSubmit(updateBook)}
        className="flex w-[80%] lg:w-[50%] p-20  inset-0   z-50 flex-col bg-white  shadow-2xl rounded-2xl "
      >
        <label htmlFor="" className="font-semibold capitalize">
          Title
        </label>
        <input
          className="p-2 w-full border-2 my-3"
          type="text"
          id="title"
          {...register("title", {
            onChange: (e) => e.target.value,
            required: true,
          })}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <label htmlFor="" className="font-semibold capitalize">
          author
        </label>
        <input
          type="text"
          className="p-2 w-full border-2 my-3"
          id="author"
          {...register("author", { required: true })}
        />
        {errors.author && <p>{errors.author.message}</p>}
        <label htmlFor="" className="font-semibold capitalize">
          description
        </label>
        <textarea
          className="p-2 w-full border-2 my-3"
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && <p>{errors.description.message}</p>}
        <label htmlFor="" className="font-semibold capitalize">
          url
        </label>
        <input
          type="text"
          className="p-2 w-full border-2 my-3"
          id="url"
          {...register("url", { required: true })}
        />
        {errors.url && <p>{errors.url.message}</p>}
        <label htmlFor="" className="font-semibold capitalize">
          language
        </label>
        <input
          type="text"
          className="p-2 w-full border-2 my-3"
          id="language"
          {...register("language", { required: true })}
        />
        {errors.language && <p>{errors.language.message}</p>}
        <label htmlFor="" className="font-semibold capitalize">
          price
        </label>
        <input
          type="text"
          className="p-2 w-full border-2 my-3"
          id="price"
          {...register("price", { required: true })}
        />
        {errors.price && <p>{errors.price.message}</p>}
        <button
          type="submit"
          className="py-2 w-full bg-blue-600 text-white rounded-md my-4 font-semibold"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default Modal;
