import { useState } from "react";
import AppContext from "./ContextForProjects";

const ContextProviderProjects = (props) => {
  const [projectstate, setProjectState] = useState(0);
  const [addproject, setAddProject] = useState(0);
  const [isLoadingTag, setIsLoadingTag] = useState(0);
  const [opensidebar, setOpenSidebar] = useState(false);
  const [updateForm , setUpdateForm] = useState(false)

  return (
    <>
      <AppContext.Provider
        value={{
          projectstate,
          setProjectState,
          addproject,
          setAddProject,
          isLoadingTag,
          setIsLoadingTag,
          opensidebar,
          setOpenSidebar,
          updateForm,
          setUpdateForm
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};
export default ContextProviderProjects;
