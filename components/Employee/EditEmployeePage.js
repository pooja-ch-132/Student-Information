import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();

  console.log("Empid in Edit Employee Page:", id);

  //const [empdata, setempdatachange] = useState([])

  const navigate = useNavigate();

  const [active, setchangeactive] = useState(true);
  const [validation, setvalidation] = useState(false);

  const HandleActive = (event) => {
    // const [name, checked]=event.target;
    setchangeactive(event.target.checked);
  };

  const [editemployeedata, seteditemployeedata] = useState({
    empid: "",
    empname: "",
    empemail: "",
    empphone: "",
    emprole: "",
    empactive: "true",
  });

  // useEffect function to fetch employee data through id
  useEffect(() => {
    fetch(`https://vercel-mongodb-server.vercel.app/getemployee/` + id)
      //fetch(`http://localhost:3030/employees/`+id)
      //fetch(`https://projectdata-1-viir.onrender.com/employees`+id)
      .then((res) => res.json())
      .then((resp) => seteditemployeedata(resp))
      .catch((err) => alert("Failed to get: " + err.message));
  }, [id]);

  // Handler function on employee data change
  const HandleEditEmployeeDataChange = (event) => {
    const { name, value } = event.target;
    seteditemployeedata((prevState) => ({ ...prevState, [name]: value }));
  };

  //Handler function for edit employee
  const HandleProceedEditEmployee = (event) => {
    event.preventDefault();
    const { empid, empname, empemail, empphone, emprole, empactive } =
      editemployeedata;
    fetch(`https://vercel-mongodb-server.vercel.app/updateemployee/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        empid,
        empname,
        empemail,
        empphone,
        emprole,
        empactive,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update employee details");
        }
        return res.json(); // Optionally, if server returns the updated record
      })
      .then((resp) => {
        alert("Employee Details Changed Successfully...");
        navigate("/EmployeeDetails"); // Redirect to employee details page
      })
      .catch((err) => {
        alert("Error Updating the Employee Data: " + err.message);
      });
  };

  return (
    <div>
      <h4 className="text-secondary" style={{ textAlign: "center" }}>
        Edit Employee Content Here .......
      </h4>

      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={HandleProceedEditEmployee}>
            <div className="card">
              <div className="card-title">
                <h4 className="text-primary" style={{ textAlign: "center" }}>
                  Edit Employee
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
                        value={editemployeedata.empid}
                        onChange={HandleEditEmployeeDataChange}
                      />
                    </div>
                    <span className="errmsg">Enter ID</span>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Name <span className="errmsg">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="empname"
                        value={editemployeedata.empname}
                        onChange={HandleEditEmployeeDataChange}
                      />
                    </div>
                    <span className="errmsg">Enter Name</span>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Email <span className="errmsg">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="empemail"
                        value={editemployeedata.empemail}
                        onChange={HandleEditEmployeeDataChange}
                      />
                    </div>
                    && <span className="errmsg">Enter email</span>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Phone <span className="errmsg">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="empphone"
                        value={editemployeedata.empphone}
                        onChange={HandleEditEmployeeDataChange}
                      />
                    </div>
                    <span className="errmsg">Enter Phone Number</span>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>
                        Role <span className="errmsg">*</span>
                      </label>
                      <input
                        className="form-control"
                        name="emprole"
                        value={editemployeedata.emprole}
                        onChange={HandleEditEmployeeDataChange}
                      />
                    </div>
                    <span className="errmsg">Enter Role</span>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="empactive"
                        checked={editemployeedata.empactive}
                        onChange={HandleActive}
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
export default EditEmployee;
