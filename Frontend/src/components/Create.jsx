import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  console.log(name, email, age);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, age };

    const response = await fetch("http://localhost:8000/user", {
      method: "POST",
      body: JSON.stringify(addUser),
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
      console.log(result);
      setSuccess("Submit Successfully ");
      setName("");
      setAge(0);
      setEmail("");
      navigate("/all");
    }
  };

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-primary">{success}</div>}
      <h2 className="text-center">Enter the data</h2>
      <form onSubmit={handleSubmit}>
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
              type="email"
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

export default Create;
