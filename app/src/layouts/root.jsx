import { Outlet } from "react-router-dom";
import NavBar from "./root-parts/nav";
import { useEffect, useState } from "react";

function RootLayout() {

    const [currentTheme, setCurrentTheme] = useState();

    useEffect(() => {
        const body = document.body;
        const storedTheme = localStorage.getItem("currentTheme");
        const prefersDark = matchMedia("(prefers-color-scheme: dark)");

        if (storedTheme) {
            console.log(storedTheme)

            if (storedTheme==="light") return body.classList.add("light");
            
            body.classList.add("dark");

            setCurrentTheme(storedTheme)
            return
        }

        setCurrentTheme(prefersDark.matches ? "dark" : "light")
    },[])

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
            <header>
                <NavBar />
            </header>
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