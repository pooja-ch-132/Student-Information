import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [createemployeedata, setcreateemployeedata] = useState({
    empid: "",
    empname: "",
    empemail: "",
    empphone: "",
    emprole: "",
    empactive: "true",
  });

  const navigate = useNavigate();

  const [active, setchangeactive] = useState(true);

  const HandleActive = (event) => {
    // const [name, checked]=event.target;
    //setchangeactive(event.target.checked);
    const { name, checked } = event.target;
    setchangeactive((prevactive) => {
      return { ...prevactive, name: checked };
    });
  };

  const HandleCreateEmployeeDataChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setcreateemployeedata((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  };

  const HandleProceedCreateEmployee = async (event) => {
    event.preventDefault();
    const { empid, empname, empemail, empphone, emprole, empactive } =
      createemployeedata;
    //console.log(createemployeedata);

    // fetch("http://localhost:8000/addemployee", {
    // //fetch('http://localhost:3030/employees',{
    // //fetch('https://projectdata-1-viir.onrender.com/employees',{
    //     method:'POST',
    //     headers:{'Content-type':'application/json'},
    //     body:JSON.stringify({empid, empname, empemail, empphone, emprole, empactive})
    // }).then((res)=>{
    //     alert('Employee Created Successfully...');
    //     navigate('/EmployeeDetails');

    // }).catch((err)=>{
    //     alert('Failed :'+err.message)
    // })

    try {
      const response = await fetch(
        "https://vercel-mongodb-server.vercel.app/addemployee",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            empid,
            empname,
            empemail,
            empphone,
            emprole,
            empactive,
          }),
        }
      );
      if (!response.ok) {
        if (!response || response.status === 422) {
          window.alert("Invalid Registration, Employee Already Exists ");
          console.log("Invalid Registration, Employee Already Exists..");
        } else {
          throw new Error("Registration Failed");
        }
      } else {
        window.alert("Registration Successful.....");
        console.log("Registration Successful...");
        console.log(response);
        navigate("/EmployeeDetails");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h4 className="text-secondary" style={{ textAlign: "center" }}>
        Create Employee Content Here .......
      </h4>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={HandleProceedCreateEmployee}>
            <div className="card">
              <div className="card-title">
                <h4 className="text-primary" style={{ textAlign: "center" }}>
                  Create Employee
                </h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        ID <span className="errmsg">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="empid"
                        value={createemployeedata.empid}
                        onChange={HandleCreateEmployeeDataChange}
                      />
                    </div>
                    {/* {createemployeedata.id.length==0 && <span className="errmsg">Enter ID</span>} */}
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Name <span className="errmsg">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="empname"
                        value={createemployeedata.empname}
                        onChange={HandleCreateEmployeeDataChange}
                      />
                    </div>
                    {/* {createemployeedata.name.length==0 && <span className="errmsg">Enter Name</span>} */}
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Email <span className="errmsg">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="empemail"
                        value={createemployeedata.empemail}
                        onChange={HandleCreateEmployeeDataChange}
                      />
                    </div>
                    {/* {createemployeedata.email.length==0 && <span className="errmsg">Enter email</span>} */}
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Phone <span className="errmsg">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="empphone"
                        value={createemployeedata.empphone}
                        onChange={HandleCreateEmployeeDataChange}
                      />
                    </div>
                    {/* {createemployeedata.phone.length==0 && <span className="errmsg">Enter Phone Number</span>} */}
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Role <span className="errmsg">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="emprole"
                        value={createemployeedata.emprole}
                        onChange={HandleCreateEmployeeDataChange}
                      />
                    </div>
                    {/* {createemployeedata.role.length==0 && <span className="errmsg">Enter Role</span>} */}
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="empactive"
                        checked={createemployeedata.empactive === "true"}
                        onChange={HandleCreateEmployeeDataChange}
                      />
                      <label className="form-check-label">Is Active</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-sm btn-success">
                  Save
                </button>
                <Link
                  className="btn btn-sm btn-danger"
                  style={{ marginLeft: 10 }}
                  to="/EmployeeDetails"
                >
                  Back
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateEmployee;
