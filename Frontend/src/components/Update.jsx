import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:8000/user/${id}`);

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");

      console.log("update user", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    const updateUser = { name, email, age };

    const response = await fetch(`http://localhost:8000/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setSuccess("Update Successfully ");
      navigate("/all");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-primary">{success}</div>}
      <h2 className="text-center">Enter the data</h2>
      <form onSubmit={updateHandler}>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2 col-form-label">Age</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Update;
