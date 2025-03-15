//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StudentPage from "./components/Student/StudentPage";
import AddStudentComponent from "./components/Student/NewStudentPage";
import RegistrationPage from "./components/Pages/RegistrationPage";
import EmployeeDetails from "./components/Employee/EmployeeDetails";
import DetailsEmployee from "./components/Employee/DetailsEmployeePage";
import CreateEmployee from "./components/Employee/CreateEmployeePage";
import EditEmployee from "./components/Employee/EditEmployeePage";
import Login from "./components/Pages/LoginPage";
import HomeComponent from "./components/HomePage";
import EditStudentComponent from "./components/Student/EditStudent";

function App() {
  return (
    <div className="App">
      <h3 className="text-secondary" style={{ textAlign: "center" }}>
        Student Information Management System
      </h3>
      <div className="container-fluid">
        <BrowserRouter basename="Student-Information">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomeComponent />} />

            {/* <ProtectedRoute path='/Home'><HomePageComponent/></ProtectedRoute> */}
            <Route path="/StudentPage" element={<StudentPage />} />

            <Route path="/NewStudentPage" element={<AddStudentComponent />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/EmployeeDetails" element={<EmployeeDetails />} />
            <Route path="/createemployee" element={<CreateEmployee />} />
            <Route path="/employee/edit/:id" element={<EditEmployee />} />
            <Route path="/employee/details/:id" element={<DetailsEmployee />} />
            <Route
              path="/StudentPage/edit/:id"
              element={<EditStudentComponent />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
