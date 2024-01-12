import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import 'bulma/css/bulma.css';

function SignupFormModal({ show, onClose }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				let errors = [];
				data.forEach((error) => {
					let res = error.split(":");
					errors.push(res[1]);
				});
				setErrors(errors);
			}
		} else {
			setErrors(["Confirm Password field must be the same as the Password field"]);
		}
	};

	return (
		<div className={`modal ${show ? 'is-active' : ''}`}>
			<div className="modal-background" onClick={onClose}></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">Sign Up</p>
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
							<label className="label" htmlFor="uname">Username</label>
							<div className="control">
								<input
									id="uname"
									className="input"
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									placeholder="Username"
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
						<div className="field">
							<label className="label" htmlFor="cpwrd">Confirm Password</label>
							<div className="control">
								<input
									id="cpwrd"
									className="input"
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="Confirm Password"
									required
								/>
							</div>
						</div>
						<button className="button is-success is-rounded is-small" type="submit">Sign Up</button>
					</form>
				</section>
			</div>
		</div>
	);
}

export default SignupFormModal;
