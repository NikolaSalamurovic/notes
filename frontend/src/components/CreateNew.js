import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import {Link, Outlet} from "react-router-dom";

export const CreateNew = () =>{
    const editorRef = useRef(null);
    const titleRef = useRef(null);
    const getUsername = localStorage.getItem("Username")
    const getPassword = localStorage.getItem("Password")
  
    const [value, setValue] = useState("");
  
    const submitDocument = async (e) => {
      e.preventDefault();
      console.log(editorRef.current.getContent(), titleRef.current.value);
  
        let response = await axios.post(
          "http://localhost:3001/users/add",
    
        {
          title: titleRef.current.value,
          markdown: editorRef.current.getContent()     
        },
  
          {headers: {"Content-Type": "application/json"}}
        );
        window.location.reload(false);
      return response.data;
    };
    
  
    return (
      <>{ getUsername == "admin" && getPassword =="admin" &&
        <div className="createDocument">
          <form onSubmit={submitDocument}>
            <input type="text" placeholder="Title" ref={titleRef}/>
            <Editor
              textareaName="content"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 500,
                menubar: false,
                placeholder: "Start writing here.",
              }}
            />
            <button type="submit" onClick={submitDocument}>Save</button>
          </form>
        </div>
        }
      </>
    );
}