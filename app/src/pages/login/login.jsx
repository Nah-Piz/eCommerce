import { useRef } from "react";
import "./auth.css"
import { useState } from "react";
import { loggingUser } from "../../api/auth-req";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [authError, setAuthError] = useState(null);

    const navigate = useNavigate();

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const usernameRef = useRef(null)
    
    const handleSubmit = async (event) => {
        event.preventDefault;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const username = usernameRef.current.value;

        if (!email || !password || !username) return setAuthError("Please fill all the fields.");

        const body = { email, password, username };

        try {
            const res = await loggingUser(body, "signup");
            console.log(res)
            if (!res.success) return setAuthError(res.msg);
            setAuthError(null);
            emailRef.current.value = "";
            passwordRef.current.value = "";
            usernameRef.current.value = "";
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
                        <label for="username">
                            <i className="fa fa-user icons" aria-hidden="true"></i>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter your username" 
                            id="username" 
                            ref={usernameRef}
                        name="username" />
                    </div>
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

export default LoginPage;