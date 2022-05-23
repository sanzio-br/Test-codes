import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from './logo 0.5.PNG'
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import "./css/Navbar.css"
//Pages
export default function Navbar({setIsAuth , isAuth}) {
    const [click, setClick] = useState(false);
    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/login";
        });
    };

    const handleClick = () => setClick(!click);
    const Close = () => setClick(false);

    return (
        <div>
            <div className={click ? "main-container" : ""} onClick={() => Close()} />
            <nav className="navbar" onClick={e => e.stopPropagation()}>
                <div className="nav-container">
                    <Link exact to="/" className="nav-logo">
                        <div className="avatar">
                            <img src={logo} title="" alt="" />
                        </div>
                        Kalbo Adventure
                    </Link>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link
                                exact
                                to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                exact
                                to="/blogs"
                                activeClassName="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                Blogs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                exact
                                to="/tours"
                                activeClassName="active"
                                className="nav-links"
                                onClick={click ? handleClick : null}
                            >
                                Tours
                            </Link>
                        </li>
                        {!isAuth ? (
                            <li className="nav-item">
                                <Link
                                    exact
                                    to="/login"
                                    activeClassName="active"
                                    className="nav-links"
                                    onClick={click ? handleClick : null}
                                >
                                    Login
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        exact
                                        to="/createpost"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={click ? handleClick : null}
                                    >
                                        Create Post
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        exact
                                        to="/postevent"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={click ? handleClick : null}
                                    >
                                        Post Event
                                    </Link>
                                </li>
                                <button className='btn btn-danger' onClick={signUserOut}>Log OUt</button>
                            </>
                        )}
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </ div>
    );
}