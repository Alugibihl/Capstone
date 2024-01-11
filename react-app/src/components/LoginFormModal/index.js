import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import 'bulma/css/bulma.css';

function LoginFormModal({ show, onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
  };

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(["Invalid Credentials"]);
    }
  };

  return (
    <div className={`modal ${show ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Log In</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li className="modal-errors" key={idx}>{error}</li>
              ))}
            </ul>
            <div className="field">
              <label className="label" htmlFor="email">Email</label>
              <div className="control">
                <input
                  id="email"
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@email.com"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="pwrd">Password</label>
              <div className="control">
                <input
                  id="pwrd"
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <button className="button is-success is-rounded is-small" type="submit">Log In</button>
            <div className="container">
              <button className="button is-info is-rounded is-small" onClick={handleClick}>
                Demo User
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default LoginFormModal;
