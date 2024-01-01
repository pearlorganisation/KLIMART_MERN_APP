import React, { useEffect, useState } from "react";
import "./Vacancies.css";
import { getCurrentVacancies } from "./features/actions/careerActions";
import { useDispatch, useSelector } from "react-redux";

function Vacancies(props) {

const dispatch= useDispatch()
  const {currentVacanciesData} = useSelector(state => state.career)
  console.log(currentVacanciesData)
  useEffect(()=>{
    dispatch(getCurrentVacancies())
  },[])

  // const vacancydata = [
  //   Array.isArray(currentVacanciesData) && currentVacanciesData.length>0 && currentVacanciesData.map((data)=>{
  //     return (
  //      <>hdjfd</>
  //     )
  //   })
    // {
    //   id:1,
    //   title: "Junior Architect",
    //   description: "",
    //   // "Creative minded and self-driven individuals holding a minimum of a B.Arch degree. Should expertise in CAD and Photoshop."
    // },
    // {
    //   id:2,
    //   title: "Associate Architect",
    //   description: "",
    // },
    // {
    //   id:3,
    //   title: "Architectural Internship",
    //   description: "",
    // },
    // {
    //   id:4,
    //   title: "Architect Journalist",
    //   description: "",
    // },
  // ];



  return (
    <>
      <div className="vacancies">
     { Array.isArray(currentVacanciesData?.data) && currentVacanciesData?.data.length>0 && currentVacanciesData?.data.map((data)=>{
      return (
        <Vacancy setRoleData={props.setRoleData} setIsOpen={props.setIsOpen} data={data} handleClick={props.handleClick}/>
      )
    })}
        
      </div>
    </>
  );
}

export default Vacancies;

function Vacancy(props) {
  const { data, setIsOpen,setRoleData } = props;


  const [values,setValues] = useState(data)


const handleClick = (e)=>{
  setValues(true);
}


  return (
    <div className="vacancy_card">
      <div className="vacancy_card_content">
        <div className="vacancy_card_content_wrap">
          {}
          <div className="contenthead">{data?.role}</div>
          <div className="contentsubhead">
            {data?.experience} Years Experience <span>({data?.location}) </span>
          </div>
          <p style={{color:"gray"}}>{data?.description}</p>
          <div className="contenttext"></div>
        </div>
        <div className="vacancy_card_button_wrap"  >
          <button onClick={(e) => {setIsOpen(true);handleClick(e); setRoleData(data.role)}} className="viewmorebtn">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
