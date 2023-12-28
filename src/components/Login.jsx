import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ({ users, onLogin }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );
    if (user) {
      onLogin(user);
      navigate("./dashboard");
    } else {
      alert("User not found. Please Enter the valid Name.");
    }
    setName("");
  };

  return (
    <Fragment>
      <div>
        <h1 className="flex justify-center mt-10 text-lg font-semibold">
          Welcome back! Please Login
        </h1>
      </div>
      <div className="flex justify-center items-center mt-14">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name" className="mr-2 font-medium text-base">
            Name
          </label>
          <input
            className="border rounded py-2 px-4 focus:outline-none focus:border-blue-500"
            type="text"
            value={name}
            placeholder="Enter name of user"
            onChange={(event) => setName(event.target.value)}
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            LogIn
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
