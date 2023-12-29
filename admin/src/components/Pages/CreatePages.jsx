import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/axiosInstance";
const AddPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm();
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    const isValid = await trigger();
    // const Formdata = new FormData()
    let data1 = {};

    console.log("content", content);
    if (isValid) {
      data1.page_name = data.page_name;
      data1.content = JSON.stringify(content);
      console.log("data1", data1);
      await instance
        .post(`/pages`, data1)
        .then((res) => {
          console.log("res", res);
          console.log("res.data addPages", res.data);
          toast.success("page is created successfully");
          navigate("/pages");
        })
        .catch((err) => {
          toast.error(err.message, { position: "top-center" });
          console.log("error", err);
        });
    }
  };
  return (
    <form
      className="row g-3"
      onSubmit={handleSubmit(onSubmit)}
      style={{ border: "2px solid #E4E4E4", margin: "1rem", padding: "1rem" }}
    >
      <h1>Add Page</h1>
      <div
        className="col-12 d-flex flex-row-reverse "
        style={{ borderBottom: "2px solid #E4E4E4", paddingBottom: "0.5rem" }}
      >
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <div className="col-md-12">
        <label htmlFor="inputTopic" className="form-label">
          Page Name
        </label>
        <input
          type="text"
          name="page_name"
          onChange={(e) => {
            setValue("page_name", e.target.value); // Use setValue to update the form state
          }}
          className={`form-control ${errors.page_name ? "is-invalid" : ""}`}
          id="inputTopic"
          {...register("page_name", { required: true })}
        />
        {errors.topic && <p style={{ color: "red" }}>Topic is required.</p>}
      </div>

      <div className="col-12">
        <label htmlFor="inputContent" className="form-label">
          Content
        </label>

        <JoditEditor
          value={content}
          ref={editor}
          onChange={setContent} // Update the content state on change
        />
        {errors.content && <p style={{ color: "red" }}>Content is required.</p>}
      </div>
    </form>
  );
};

export default AddPage;
