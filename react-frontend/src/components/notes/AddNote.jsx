import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = "http://127.0.0.1:8000/api/notes/";


export default function AddNote() {
    const navigate = useNavigate()
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        )

        axios.post(baseURL, {
            title: title,
            content: content,
            
        })
        .then((res) => {
            navigate('/');
        });
    }

    return (
        <>
            <h1>Add Note</h1>
            <form>
                <input type="text" required id="title" placeholder="Note Title" onChange={(e) => {setTitle(e.target.value)}} />
                <br />
                <input type="text" required id="content" placeholder="Note Content" onChange={(e) =>  {setContent(e.target.value)}} />
                <br />
                <button type="submit" onClick={handleSubmit}>Add</button>
            </form>
        </>
    )
}