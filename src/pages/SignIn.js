import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
export default function SignIn({ setIsAuth }) {
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [passWord, setPassWord] = useState("")
    const signInWithEmail = () => {
        signInWithEmailAndPassword(auth, email, passWord)
            .then((userCredential) => {
                // Signed in 
                localStorage.setItem("isAuth", true);
                setIsAuth(true);
                navigate("/");
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    return (
        <div className="login">
            <div className="form">
                <h3>Sign In</h3>
                <div className="input">
                    <label>Email</label>
                    <input type="email"
                        required
                        placeholder="example@gmail.com"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div className="input">
                    <label>password</label>
                    <input type="password"
                        required
                        placeholder="password"
                        onChange={(e) => {
                            setPassWord(e.target.value)
                        }}
                    />
                </div>
                <div className=" button d-flex justify-content-end">
                    <button
                        className="btn"
                        onClick={signInWithEmail}
                        type="submit"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    )
}