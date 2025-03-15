import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteEmployee = () => {
  const { id } = useParams();

  console.log(id);

  const [empdata, setempdatachange] = useState([]);

  const HandlerEmpDetails = () => {
    fetch("https://vercel-mongodb-server.vercel.app/deleteemployee/" + id)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setempdatachange(resp);
        console.log(empdata);
      })
      .catch((err) => {
        alert("Failed to get:" + err.message);
      });
  };

  useEffect(() => {
    HandlerEmpDetails();
  }, []);
  return (
    <div>
      <h4 className="text-secondary" style={{ textAlign: "center" }}>
        Delete Employee Content Here .......
      </h4>
    </div>
  );
};
export default DeleteEmployee;
