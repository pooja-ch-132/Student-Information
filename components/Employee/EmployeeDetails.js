import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const tableheading = [
    "Emp Id",
    "Name",
    "Email",
    "Phone",
    "Role",
    "Active",
    "Action",
  ];

  const [employeedata, setemployeedata] = useState([]);

  const navigate = useNavigate();

  // const HandleFetchEmployees= async ()=>{
  //      await fetch("http://localhost:3030/employees").then((respone)=>{
  //         return respone.json;
  //      }).then((resp)=>{
  //          s
  //         })

  //      }).catch((err)=>{
  //         alert('Failed :'+err.message)

  //      })
  // }

  const HandlerLoadEmpDetails = (id) => {
    navigate(`/employee/details/${id}`);
  };
  const HandlerEditEmp = (id) => {
    navigate("/employee/edit/" + id);
  };

  const HandlerDeleteEmp = async (empid) => {
    if (window.confirm("Do you want Delete Employee")) {
      try {
        const response = await fetch(
          `https://vercel-mongodb-server.vercel.app/deleteemployee/${empid}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const error = await response.json();
          console.error("Error deleting employee:", error.error);
          return alert(error.error);
        }

        const result = await response.json();
        console.log("Success:", result.message);
        alert("Employee Deleted Successfully...");
        window.location.reload();
      } catch (error) {
        console.error("Network or server error:", error.message);
        alert("Error deleting employee");
      }
    }
  };

  const HandleFetchEmployees = async () => {
    const response = await fetch(
      "https://vercel-mongodb-server.vercel.app/getemployees"
    );
    //const response= await fetch("http://localhost:3030/employees")
    //const response= await fetch("https://projectdata-1-viir.onrender.com/employees")
    const data = await response.json();
    console.log(data);
    setemployeedata(data);
  };

  useEffect(() => {
    HandleFetchEmployees();
  }, []);

  console.log(employeedata);

  return (
    <div className="container">
      <h4 className="text-danger" style={{ textAlign: "center" }}>
        Display Employee Details Content Here
      </h4>
      <h4 className="text-secondary" style={{ textAlign: "center" }}>
        React JS CRUD Operations
      </h4>
      <div className="card">
        <div className="card-header">
          <h4 className="text-secondary" style={{ textAlign: "center" }}>
            Employee Details
          </h4>
        </div>
        <div className="card-body">
          <div>
            <Link to="/createemployee" className="btn btn-sm btn-success">
              New (+){" "}
            </Link>
          </div>
          <table
            className="table table-stripped table-bordered"
            style={{ marginTop: 10 }}
          >
            <thead
              className="thead-dark text-white"
              style={{ textAlign: "center" }}
            >
              <tr>
                <td>S.No.</td>
                {tableheading.map((item) => {
                  return <td>{item}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {employeedata.map((emp, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{emp.empid}</td>
                  <td>{emp.empname}</td>
                  <td>{emp.empemail}</td>
                  <td>{emp.empphone}</td>
                  <td>{emp.emprole}</td>
                  <td>{emp.empactive}</td>
                  {/* { emp.role === 'Admin' && */}
                  <td style={{ textAlign: "center" }}>
                    <a
                      className="text-primary"
                      onClick={() => {
                        HandlerLoadEmpDetails(emp.empid);
                      }}
                      style={{ marginLeft: 10 }}
                    >
                      Details
                    </a>
                    <a
                      className="text-success"
                      onClick={() => {
                        HandlerEditEmp(emp.empid);
                      }}
                      style={{ marginLeft: 10 }}
                    >
                      Edit
                    </a>
                    <a
                      className="text-danger"
                      onClick={() => {
                        HandlerDeleteEmp(emp.empid);
                      }}
                      style={{ marginLeft: 10 }}
                    >
                      Remove
                    </a>
                  </td>
                  {/* } */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <Link
            className="btn btn-sm btn-danger"
            style={{ marginLeft: 10 }}
            to="/home"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EmployeeDetails;
