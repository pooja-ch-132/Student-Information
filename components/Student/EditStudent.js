import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditStudentComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [htno, setHtno] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("male");

  useEffect(() => {
    fetch(`http://localhost:8133/getStudent/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHtno(data.htno);
        setFullname(data.fullname);
        setPassword(data.password);
        setGroup(data.group);
        setEmail(data.email);
        setMobile(data.mobile);
        setGender(data.gender);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [id]);

  const handleEditStudent = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://vercel-mongodb-server.vercel.app/updateStudent/${id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            htno,
            fullname,
            password,
            group,
            email,
            mobile,
            gender,
          }),
        }
      );

      if (!response.ok) {
        // Check if response status is not ok
        throw new Error("Failed to update student");
      } else {
        alert("Student Updated Successfully");
        navigate("/StudentPage");
      }
    } catch (err) {
      console.error("Error updating student:", err.message);
      alert("Failed: " + err.message);
    }
  };

  return (
    <div className="offset-lg-6 col-lg-6" style={{ marginLeft: 350 }}>
      <form onSubmit={handleEditStudent} className="container">
        <div className="card">
          <div className="card-title">
            <h4 style={{ textAlign: "center" }}>Edit Student</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <label>Hallticket No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={htno}
                    onChange={(e) => setHtno(e.target.value)}
                    placeholder="Enter Hallticket No."
                    required
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Enter Name"
                    required
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>Group</label>
                  <select
                    className="form-control"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    required
                  >
                    <option value="">Select Group</option>
                    <option value="Group-7">Group-7</option>
                    <option value="Group-8">Group-8</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>Mobile</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter Mobile No."
                    required
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label>Gender</label>
                  <div>
                    <label className="radio-inline">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                      />
                      Male
                    </label>
                    <label className="radio-inline">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                      />
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <button className="btn btn-sm btn-success" type="submit">
              Update
            </button>
            <Link
              className="btn btn-sm btn-danger"
              to="/StudentPage"
              style={{ marginLeft: 10 }}
            >
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStudentComponent;
