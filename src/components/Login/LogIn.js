import React, { useState } from "react";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="LogIn">
      <form>
        <label htmlFor="">Email</label>
        <input type="email" />
        <label htmlFor="">Password</label>
        <input type="password" />
        <button
          onClick={(e) => {
            e.preventDefault();
            // signIn(email, password);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LogIn;
