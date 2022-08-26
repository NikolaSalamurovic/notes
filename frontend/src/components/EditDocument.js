import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

export const EditDoocument = () => {
    const getUsername = localStorage.getItem("Username")
    const getPassword = localStorage.getItem("Password")
    const [data, setDate] = useState([])
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/users/${id}`)
        .then(res => {
            console.log("greetings from", res.data)
            setDate(res.data)
        }).catch(err => console.log(err))
    },[])
    const body = data.body;

    const editorRef = useRef(null);
    const titleRef = useRef(null);

    const changeDocument = async (e) => {
        e.preventDefault();
        console.log(editorRef.current.getContent(), titleRef.current.value)

        let response = await axios.put(`http://127.0.0.1:3001/users/${id}`,
        {
            title: titleRef.current.value,
            markdown: editorRef.current.getContent()
        },

        {headers: {"Content-Type": "application/json"}}
        );
        return response.data;
    }

    const arr = data.map((data, index) => {
        return(
          <div>
            {getUsername == "admin" && getPassword =="admin" &&
            <div key={data.id} className="box">
            <div>{data.id}</div>
            <div>{data.title}</div>
            <div dangerouslySetInnerHTML={{__html: data.markdown}}></div>
            </div> 
            }
          </div>
        )
    })

    console.log(titleRef)

return(
  
    <div> {data.map((data, index) =>{

      return(
        <div>
          {getUsername == "admin" && getPassword =="admin" &&
        <div className="createDocument">
          <form onSubmit={changeDocument}>
            <input type="text" placeholder={data.title} ref={titleRef}/>
            <Editor
              textareaName="content"
              initialValue={data.markdown}
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 500,
                menubar: false,
              }}
            />
            <button type="submit" onClick={changeDocument}>Save</button>
          </form>
          <div>{arr}</div>
        </div>
        }
        </div>
      )
    })}
        
      </div>

)
}