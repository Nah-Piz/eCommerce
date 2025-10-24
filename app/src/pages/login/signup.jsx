import { useRef } from "react";
import "./auth.css"
import { loggingUser } from "../../api/auth-req.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/userSlice.js";

function SignupPage() {

    const passwordRef = useRef(null);
    const emailRef = useRef(null);

    const [authError, setAuthError] = useState(null);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefualt;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const body = { email, password };

        if (!email || !password) return setAuthError("Please fill all the fields")

        try {
            const res = await loggingUser(body,"login")
            if (!res.success) return setAuthError(res.msg);
            setAuthError(null);
            emailRef.current.value = "";
            passwordRef.current.value = "";
            dispatch(loginUser());
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flexCenter roots">
            <div className="root">
                <form action="">
                    <div className="dtl-box">
                        <label for="email">
                            <i className="fa fa-envelope icons" aria-hidden="true"></i>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            id="email"
                            ref={emailRef}
                            name="email" />
                    </div>
                    <div className="dtl-box">
                        <label for="password">
                            <i className="fa fa-key icons" aria-hidden="true"></i>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            id="password"
                            ref={passwordRef}
                            name="password" />
                    </div>
                    <div className="invalid">{ authError }</div>
                    <input
                        type="button"
                        id="submit"
                        onClick={()=>handleSubmit(event)}
                        value="Login" />
                </form>
            </div>
        </div>
    );
}

export default SignupPage;