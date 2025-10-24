import { Link, Outlet } from "react-router-dom";
import NavBar from "./root-parts/nav";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayModal, loginUser, logoutAction } from "../store/slices/userSlice";
import { verifyStatus } from "../api/auth-req";

function RootLayout() {

    const [currentTheme, setCurrentTheme] = useState();

    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const body = document.body;
        const storedTheme = localStorage.getItem("currentTheme");
        const prefersDark = matchMedia("(prefers-color-scheme: dark)");

        if (storedTheme) {

            if (storedTheme === "light") return body.classList.add("light");
            
            body.classList.add("dark");

            setCurrentTheme(storedTheme)
            return
        }

        setCurrentTheme(prefersDark.matches ? "dark" : "light")
    }, []);

    useEffect(() => { 
        const stillLogged = async () => {
            try {
                const res = await verifyStatus();
                if (res.status === 401) return dispatch(logoutAction());
                dispatch(loginUser());
            } catch (error) {
                console.log(error);
            }
        }
        stillLogged()
    }, []);

    const handleTheme = () => {
        const body = document.body;
        setCurrentTheme(t => t === "light" ? "dark" : "light");

        if (currentTheme === "light") {
            if (body.classList.contains("light")) body.classList.remove("light")
            body.classList.add("dark");
            
            localStorage.setItem("currentTheme","dark")

            return
        }
        
        if (body.classList.contains("dark")) body.classList.remove("dark")
        body.classList.add("light")
        
        localStorage.setItem("currentTheme","light")
    }

    return (
        <>
            <header className="header">
                <NavBar />
            </header>
            {
                (user.displayModalNow) ? (
                    <div className="auth-modal">
                        <div className="exit-mdl">
                            <span
                                className="primaryText"
                                onClick={()=>dispatch(displayModal(false))}
                            >X</span>
                        </div>
                        <div className="primaryText">Please Sign Up to Continue.</div>
                        <div className="flexCenter mdl-btn-ctn">
                            <Link to="/auth/login">
                                <button
                                    className="button mbtn1"
                                    onClick={()=>dispatch(displayModal(false))}
                                >Login</button>
                            </Link>
                            <Link to={ "/auth/signup" }>
                                <button
                                    className="button mbtn2"
                                    onClick={()=>dispatch(displayModal(false))}
                                >Sign Up</button>
                            </Link>
                        </div>
                    </div>
                ) : ""
            }
            <div className="parent">
                <main className="innerWidth">
                    <Outlet />
                </main>
            </div>
            <footer className="innerWidth">
                <h6>&copy; iShoppy Company Ltd { new Date().getFullYear() }</h6>
            </footer>
            <div
                className="theme"
                onClick={handleTheme}
            >
                <span>
                    <i className={`fa fa-${(currentTheme==="light")?"moon":"sun"}`} />
                </span>
            </div>
        </>
    );
}

export default RootLayout;