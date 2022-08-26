import {Link} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css'




export const Layout = () => {
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
            <div>
                <div className="documentTitle">{data.title}</div>
            </div>
            <div>
                <div dangerouslySetInnerHTML={{__html: data.markdown}} className="containDiv"></div>
            </div>
            <div className="editGrp">
            {enable && <Link to={`/edit/${data.id}`} className="">Edit</Link>}
            {enable && <button onClick={deleteDocument} className="linkBtn">Delete</button>}
            </div>
            </div>
            }       <div>
            </div> 
        </div>
        
        )
    })


    

    return(

        <div>
            { getUsername == "admin" && getPassword =="admin" &&
            
            <div className="flex-box">
                <div>DOKUMENT:</div>
                {arr}
        
                <button onClick={enableBtn} className="editBtn">Redigeringsläge</button>
            </div>
            }
        </div>
        


    )
}
