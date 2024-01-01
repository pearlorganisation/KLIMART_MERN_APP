import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { instance } from "../services/axiosInstance";

function CommonContentModal({ idValue, onUpdateData, pathUrl }) {
  console.log("idValue******", idValue);
  //   console.log("pathURl", pathUrl);
  const [updateData, setUpdateData] = useState();
  const [defaultValue, setDefaultValue] = useState();
  const closeUpdateBtnRef = useRef(null);

  //   useEffect(() => {
  //     setUpdateData(getData);
  //   }, [getData]);

  useEffect(() => {
    if (idValue) {
      console.log("inside if statement");
      handleDefaultSection();
    }
  }, [idValue]);

  const handleDefaultSection = async () => {
    try {
      const response = await instance.get(`/${pathUrl}/${idValue}`, {
        withCredentials: true,
      });
      //   console.log("response default",response)
      setUpdateData(response?.data?.data);
    } catch (err) {
      toast.error(err);
      console.log("error", err);
    }
  };

  const handleUpdate = async () => {
    try {
      closeUpdateBtnRef.current.click();

      const { data } = await instance.put(
        `/${pathUrl}/${idValue}`,
        updateData,
        { withCredentials: true }
      );

      console.log("response %%", data);
      if (data.success) {
        onUpdateData();
        toast.success("data is updated successfully");
      }
    } catch (err) {
      toast.error(err);
      console.log("error", err);
    }
  };

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <div
          class="modal fade"
          id="EditModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Edit
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeUpdateBtnRef}
                ></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">
                      Header
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="recipient-name"
                      name="header"
                      value={updateData?.header}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">
                      Description
                    </label>
                    <textarea
                      class="form-control"
                      id="message-text"
                      name="Desc"
                      value={updateData?.Desc}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommonContentModal;
