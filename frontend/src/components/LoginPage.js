import React, { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export const LoginPage = () =>{
        const nagivate = useNavigate();
        const Username=useRef()
        const Password=useRef()
        const getUsername = localStorage.getItem("Username")
        const getPassword = localStorage.getItem("Password")
        const handleSubmit=()=>{
            if(Username.current.value == "admin" && Password.current.value == "admin"){
                localStorage.setItem("Username", "admin")
                localStorage.setItem("Password", "admin")
            }
        }
        useEffect(() => {
            if(getUsername=="admin" && getPassword =="admin"){
                nagivate("/documents")
            }
        },[])

        return(
            <div className="loginPage">
                { getUsername == "admin" && getPassword =="admin" ?
                <div>hello</div> :
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="Username" ref={Username} className="inputStyle"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Password" ref={Password} className="inputStyle"/>
                    </div>
                    <button className="styledBtn">Login</button>
                </form>
                }
            </div>
        )
}
