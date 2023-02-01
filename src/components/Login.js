import React, { useState, useContext, useEffect } from 'react';
import Button from './Button';
import { AppContext } from "../context/appContext";
import Lock from '../assets/lock.svg';
import About from '../assets/info.svg';
import FAQ from '../assets/faq.svg';
import User from '../assets/logout.svg';
import Hi from '../assets/user.png';
import config from '../config';
import { FormOutlined } from '@ant-design/icons';

const Login = ({ goals }) => {


    const { isUserLogin, userName, setUserToken, cookie, setIsUserLogin, setUserName, setCookie, getCookie } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [userData, setUserData] = useState([{
        "email": "",
        "password": ""
    }])
    const [password, setPassword] = useState("");
    const [isAccess, setIsAccess] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // console.log(userData.email);
    // useEffect(() => {
    //     return () => {
    //         setIsLoading(true);
    //         var cookiez = getRandom();
    //         let emailD = email;
    //         let passwordD = password;
    //         console.log(emailD, passwordD);
    //         postData("https://www.discounts-space.com/api/signin", { email: emailD, password: passwordD, cookies: cookiez })
    //             .then(data => {
    //                 if (data.success != false) {
    //                     if (data.data.name) {
    //                         console.log(data);
    //                     } 
    //                     console.log(getCookie("USER_ID"));
    //                     setIsAccess(true);
    //                     setCookieinLocal("USER_ID", cookiez);
    //                     setCookieinLocal("USER_NAME", data.data.name);
    //                     setCookieinLocal("IS_USER_LOGIN", true);
    //                     setCookie(getCookie("USER_ID"));
    //                     setIsUserLogin(true);
    //                     setUserName(data.data.name);
    //                     setEmail("");
    //                     setPassword("");
    //                 } else {
    //                     setIsAccess(false);
    //                     console.log("Invalid Crediantials");
    //                 }
    //                 setIsLoading(false);
    //             }).catch((err) => {
    //                 setIsLoading(false);
    //             });
    //     }
    // }, [isUserLogin])


    const getRandom = () => {
        let date = new Date();
        let ms = date.getTime();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let rand = Math.floor(Math.random() * new Date().getTime());
        return `${rand}${day}${month}${year}${ms}`;
    }

    function setCookieinLocal(name, value) {
        document.cookie = name + "=" + (value || "");
    }

    const Login = (e) => {
        setIsLoading(true);
        var cookiez = getRandom();
        let emailD = email;
        let passwordD = password;
        postData("https://www.discounts-space.com/api/signin", { email: emailD, password: passwordD, cookies: cookiez })
            .then(data => {
                if (data.success != false) {
                    // console.log(cookiez); 
                    setCookieinLocal("USER_ID", cookiez);
                    setCookieinLocal("USER_TOKEN", data.data.user_token);
                    setCookieinLocal("USER_NAME", data.data.name);
                    setCookieinLocal("IS_USER_LOGIN", true);
                    setCookie(getCookie("USER_ID"));
                    setUserToken(getCookie("USER_TOKEN"));
                    setIsUserLogin(true);
                    setIsAccess(true);
                    setUserName(data.data.name);
                    setEmail("");
                    setPassword("");
                } else {
                    setIsAccess(false);
                    console.log("Invalid Crediantials");
                }
                setIsLoading(false);
            }).catch((err) => {
                setIsAccess(false);
                setIsLoading(false);
            });
    }
    // if (getCookie("USER_ID") && getCookie("USER_NAME") && getCookie("IS_USER_LOGIN")) {
    //     setCookie(getCookie("USER_ID"));
    //     setIsUserLogin(true);
    //     setUserName(getCookie("USER_NAME"));
    // }
    const Logout = () => {
        setIsUserLogin(false);
        setCookieinLocal("USER_ID", "");
        setUserName("");
        setCookieinLocal("USER_ID", "");
        setCookieinLocal("USER_NAME", "");
        setCookieinLocal("IS_USER_LOGIN", false);
    }
    async function postData(url, data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    // if (getCookie("USER_ID") && getCookie("USER_NAME") && getCookie("IS_USER_LOGIN")) {
    //     setCookie(getCookie("USER_ID"));
    //     setIsUserLogin(true);
    //     setUserName(getCookie("USER_NAME"));
    // }
    return (
        <div className="row">
            <div className="col-12 bg-white" style={{ 'marginTop': '82px' }}>
                <div className="row">
                    {
                        !isUserLogin ?
                            <div className="col-10 mx-auto" id="loggedDetails">
                                <h1 className="paraLg text-dark text-start">
                                    Join Discount Space!
                                </h1>
                                <div className="btnz login">
                                    <input type="email" name="email"
                                        className={`form-control shadow-none my-2 btn-main-outlined ${!isAccess && 'is-invalid'}`} onChange={(e) => setEmail(e.target.value)} id="email"
                                        placeholder="Enter Your Email" />

                                    <input type="password" name="password"
                                        className={`form-control shadow-none my-2 btn-main-outlined ${!isAccess && 'is-invalid'}`} onChange={(e) => setPassword(e.target.value)}
                                        id="password" placeholder="Enter Your Password" />
                                    <div className="aggree my-2">
                                        <div onClick={Login}
                                            id="submitForm"><Button isLoading={isLoading} Text="Login" /></div>
                                    </div>
                                </div>
                                <h2 className="hrLine"><span className="hrLineSpn">OR</span></h2>
                                <div className="join ">
                                    <p className="fs-6 text-start">
                                        Don't Have An Account? <a href="https://discounts-space.com/"
                                            target="_blank">Sign Up</a>
                                    </p>
                                </div>
                            </div>
                            :
                            <div className='my-1'>
                                <div className="items d-flex flex-column">
                                    {/*                                     
                                    <p className="text-center my-3 ">Welcome, <span className="text-capitalize">{userName}</span></p>
                                <div onClick={Logout} id="Logout"><Button isLoading={isLoading} Text="Logout" /></div> */}
                                    <div className="itm">
                                        <img src={Hi} alt="" />
                                        <a href="#" className="fs-smm text-dark text-capitalize">Hi, {userName}</a>
                                    </div>
                                    <div className="itm">
                                        <img src={Lock} alt="" />
                                        <a target={'_blank'} href={config.URL} className="fs-smm text-dark">Privacy</a>
                                    </div>
                                    <div className="itm align-items-center">
                                        <FormOutlined />
                                        <a onClick={() => goals.current.click()} className="fs-smm text-dark">Create Goals</a>
                                    </div>
                                    <div className="itm">
                                        <img src={About} alt="" />
                                        <a target={'_blank'} href={config.URL} className="fs-smm text-dark">About</a>
                                    </div>
                                    <div className="itm">
                                        <img src={FAQ} alt="" />
                                        <a target={'_blank'} href={config.URL} className="fs-smm text-dark">FAQ's</a>
                                    </div>
                                    <div className="itm">
                                        <img src={User} alt="" />
                                        <a target={'_blank'} onClick={Logout} className="fs-smm text-dark">Logout</a>
                                    </div>
                                    {/* <p className="text-center my-3 ">Welcome, <span className="text-capitalize">{userName}</span></p>
                                <div onClick={Logout} id="Logout"><Button isLoading={isLoading} Text="Logout" /></div>  */}
                                </div>
                            </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Login