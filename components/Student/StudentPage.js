import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const StudentPage = () => {
  const [studentData, setStudentData] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  const handleFetchStudent = async () => {
    try {
      const response = await fetch("http://localhost:8133/getStudents");
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      const studentsData = await response.json();
      setStudentData(studentsData);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    handleFetchStudent();
  }, []);

  const handleLoadStdDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleEditStd = (id) => {
    navigate(`/StudentPage/edit/${id}`);
  };

  const handleDeleteStd = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `https://vercel-mongodb-server.vercel.app/deleteStudent/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete student");
        }
        handleFetchStudent(); // Fetch updated student data after deletion
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  return (
    <div>
      <h4 className="text-danger" style={{ textAlign: "center" }}>
        Display StudentPage Content Here .......
      </h4>
      <div className="card" style={{ width: "80%", margin: "auto" }}>
        <div className="card-header">
          <div className="card-title">
            <h4 style={{ textAlign: "center" }}>Students Data</h4>
          </div>
        </div>
        <div className="card-body">
          <table
            className="table table-striped table-bordered table-hover"
            style={{ textAlign: "center" }}
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Ht No.</th>
                <th scope="col">Name</th>
                <th scope="col">Group</th>
                <th scope="col">EmailId</th>
                <th scope="col">Mobile</th>
                <th scope="col">Gender</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={student.std_htno}>
                  <th>{index + 1}</th>
                  <td>{student.htno}</td>
                  <td>{student.fullname}</td>
                  <td>{student.group}</td>
                  <td>{student.email}</td>
                  <td>{student.mobile}</td>
                  <td>{student.gender}</td>
                  <td style={{ textAlign: "center" }}>
                    <a
                      className="text-primary"
                      onClick={() => handleLoadStdDetails(student)}
                      style={{ marginLeft: 10 }}
                    >
                      View
                    </a>
                    <a
                      className="text-success"
                      onClick={() => handleEditStd(student._id)}
                      style={{ marginLeft: 10 }}
                    >
                      Edit
                    </a>
                    <a
                      className="text-danger"
                      onClick={() => handleDeleteStd(student._id)}
                      style={{ marginLeft: 10 }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <Link className="btn btn-sm btn-success" to="/NewStudentPage">
            Add Student
          </Link>
          <Link
            className="btn btn-sm btn-danger"
            to="/home"
            style={{ marginLeft: 10 }}
          >
            Back
          </Link>
        </div>
      </div>
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <p>Student Name: {selectedStudent.fullname}</p>
              <p>Hallticket No: {selectedStudent.htno}</p>
              <p>Group: {selectedStudent.group}</p>
              <p>Email: {selectedStudent.email}</p>
              <p>Mobile: {selectedStudent.mobile}</p>
              <p>Gender: {selectedStudent.gender}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentPage;
