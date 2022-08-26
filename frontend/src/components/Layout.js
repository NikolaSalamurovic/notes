import {Link, Outlet, useParams, Redirect} from "react-router-dom";
import { CreateNew } from "./CreateNew";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import '../App.css'
import { Navigate, useNavigate} from "react-router-dom";




export const Layout = () => {
    const nagivate = useNavigate();
    const getUsername = localStorage.getItem("Username")
    const getPassword = localStorage.getItem("Password")

    const [data, setDate] = useState([])
    const [enable, setEnable] =useState(false);

    function enableBtn(){
        if(enable===false){
            setEnable(true);
        }else{
            setEnable(false)
        }
        console.log(enable)
    }


    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/users`)
        .then(res => {
            console.log("greetings from ", res.data)
            setDate(res.data)
        }).catch(err => console.log(err))
    },[])

    useEffect(() => {
        if(!getUsername==="admin" && !getPassword ==="admin"){
            nagivate("/")
        }
    },[])

    const body = data.body

    const arr = data.map((data, index) => {
        function deleteDocument(){
            axios.delete(`http://127.0.0.1:3001/users/${data.id}`)
            .then(response => (response.data));
            console.log("123", data.id)
            window.location.reload(false);
        }
        return (
            <div>
            { getUsername == "admin" && getPassword =="admin" &&
            <div key={data.id} className="box">
            <div>{data.id}</div>
            <div>{data.title}</div>
            <div dangerouslySetInnerHTML={{__html: data.markdown}}></div>
            {enable && <Link to={`/edit/${data.id}`}>Edit</Link>}
            {enable && <button onClick={deleteDocument}>delete</button>}
            </div> 
        }</div>
        )
    })


    

    return(

        <div>
            { getUsername == "admin" && getPassword =="admin" &&
            <div>
                {arr}
        
                <button onClick={enableBtn}>Redigeringsläge</button>
            </div>
            }
        </div>
        


    )
}
