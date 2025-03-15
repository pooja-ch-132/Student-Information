import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const [authenticated, setauthenticated] = useState(null);

  const [name, setname] = useState("");
  const fullname = localStorage.getItem("fullname");
  const navigate = useNavigate();

  const HandleUserData = async () => {
    const response = await fetch(
      `https://vercel-mongodb-server.vercel.app/user`
    );
    console.log(response);
    if (!response.ok) {
      if (response.status === 422) {
        window.alert("Invalid Account..");
        console.log("Invalid Account...");
      }
    } else {
      // Parse the JSON response
      const data = await response.json();

      console.log("Homepage Response Data:", data);

      // Access the username from the data object
    }

    const loggedInuser = localStorage.getItem("authenticated");

    if (!loggedInuser) {
      navigate("/");
    } else {
      setauthenticated(loggedInuser);
      console.log("HomePage Authentication:", authenticated);
    }
  };

  useEffect(() => {
    HandleUserData();
  }, []);

  function handleLogout() {
    // Clear sessionStorage
    //    sessionStorage.clear();
    localStorage.clear();
    // Redirect to the login page or any other appropriate action
    navigate("/login"); // Redirect to the login page
  }

  const loggedInuser = localStorage.getItem("authenticated");
  console.log("HomePage Authentication:", loggedInuser);

  return (
    <div className="container-fluid">
      {/* <h3 className="text-danger" style={{textAlign:'center'}}>Hello, Welcome to HomePage Component......</h3> */}
      <div className="row">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div className="col-lg-3">
            {/* <img src="clg_logo.png" style={{height: 50, width: 50}} alt="Logo"/> */}
            <Link
              to=""
              className="text-secondary"
              style={{
                textDecoration: "none",
                marginLeft: 10,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              MERN PROJECT
            </Link>
          </div>
          <div className="col-lg-3">
            <ul
              class="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ marginLeft: 500, fontSize: 14 }}
            >
              {/* <li class="nav-item">
                                                 <a class="nav-link active" aria-current="page" href="#">
                                                     <Link to="/Home" style={{textDecoration:"none"}}>Home</Link>
                                                 </a>
                                             </li> */}

              <li class="nav-item">
                <Link
                  to="/StudentPage"
                  className="btn btn-outline-primary"
                  type="button"
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  Students
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  to="/EmployeeDetails"
                  className="btn btn-outline-primary"
                  type="button"
                  style={{
                    textDecoration: "none",
                    marginLeft: 10,
                    fontWeight: "bold",
                  }}
                >
                  Employees
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-auto" style={{ marginLeft: 400 }}>
            {/* <form class="d-flex" style={{marginLeft: 10}}>
                                         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                         <button class="btn btn-outline-success" type="submit">Search</button>
                                 </form> */}
            <h6 className="text-danger" style={{ fontSize: 18 }}>
              Hi, {fullname}
            </h6>
          </div>
          <div className="col-auto" style={{ marginLeft: 30 }}>
            <Link
              to="/login"
              className="btn btn-outline-primary"
              type="button"
              style={{
                textDecoration: "none",
                marginLeft: 10,
                fontWeight: "bold",
              }}
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </nav>
      </div>

      <div className="row">
        <div className="col-lg-3">{/* <h5>First column</h5> */}</div>
        <div className="col-lg-3">{/* <h5>Second column</h5> */}</div>
        <div className="col-lg-6">{/* <Login/> */}</div>
      </div>
      <div className="row">
        <Outlet />
      </div>
    </div>
  );
};
export default HomeComponent;
