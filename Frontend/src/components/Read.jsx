import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch("https://crudapp-0215.onrender.com/user");

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);

      setError(result.error);
    }

    if (response.ok) {
      setData(result);
    }
  }

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/user/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("Delete Successfully");

        getData();
        setTimeout(() => {
          setError("");
          // Remove the deleted item from the data array
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("An error occurred while deleting.");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="container my-2">
        <h2 className="text-center">All Data</h2>

        <div className="row">
          {data?.map((ele) => (
            <div key={ele._id} className="col-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-muted">Age: {ele.age}</p>
                  <a
                    className="btn btn-danger"
                    onClick={() => deleteHandler(ele._id)}
                  >
                    Delete
                  </a>
                  <Link to={`/${ele._id}`} className="btn btn-success m-1">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Read;
