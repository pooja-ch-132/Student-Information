import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailsEmployee = () => {
  const { id } = useParams();

  console.log("Empid in Employee Details Page:", id);

  const [empdata, setempdatachange] = useState([]);

  // const HandlerEmpDetails=()=>{
  //   fetch(`http://localhost:8000/getemployee/${id}`).then((res)=>{
  //   //fetch('http://localhost:3030/employees/'+id).then((res)=>{
  //   //fetch('https://projectdata-1-viir.onrender.com/employees/'+id).then((res)=>{
  //         return res.json();
  //     }).then((resp)=>{
  //         setempdatachange(resp);
  //         console.log(empdata);
  //     }).catch((err)=>{
  //         alert("Failed to get:"+err.message);
  //     })
  // }

  const HandlerEmpDetails = () => {
    fetch(`https://vercel-mongodb-server.vercel.app/getemployee/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch employee");
        }
        return res.json();
      })
      .then((resp) => {
        setempdatachange(resp); // Ensure this state update is correct
        console.log(resp); // Log to confirm the correct data
      })
      .catch((err) => {
        alert("Failed to get: " + err.message);
      });
  };

  console.log("Employee Details:", empdata);
  useEffect(() => {
    HandlerEmpDetails();
  }, []);

  return (
    <div>
      <h4 className="text-secondary" style={{ textAlign: "center" }}>
        Details Employee Content Here .......
      </h4>
      <div
        className="card"
        style={{
          width: 500,
          marginLeft: 500,
          marginTop: 100,
          backgroundColor: "#9FE2BF",
        }}
      >
        <div className="card-header">
          <h4 className="text-primary" style={{ textAlign: "center" }}>
            Employee Details
          </h4>
        </div>
        <div className="card-body">
          <div class="card text-white bg-info mb-3">
            <div
              class="card-header text-danger"
              style={{ fontSize: 18, fontWeight: "bold" }}
            >
              {empdata.empid}
            </div>
            <div class="card-body">
              <h5 class="card-title">{empdata.empname}</h5>
              <p class="card-text">
                <i>{empdata.empemail}</i>
              </p>
              <p class="card-text" style={{ fontWeight: "bold" }}>
                {empdata.empphone}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <Link to="/EmployeeDetails" className="text-danger">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DetailsEmployee;
