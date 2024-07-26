import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import config from "../config";
function AddBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addNewBook = async () => {
    const response = await axios.post(`${config.backendUrl}add-book`);
    console.log(response);
  };
  return (
    <div className="w-full h-[90vh] flex  justify-center font-primary items-center">
      <form
        onSubmit={handleSubmit(addNewBook)}
        className="flex lg:w-1/3 w-1/2 flex-col "
      >
        <label htmlFor="" className="font-semibold capitalize">
          Title
        </label>
        <input
          className="p-2 w-full border-2 my-3"
          type="text"
          id="title"
          {...register("title", { required: true })}
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
          Create Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
