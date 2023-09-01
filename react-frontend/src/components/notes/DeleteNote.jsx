import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DeleteNote() {
    const { id } = useParams();
    const baseURL = "http://127.0.0.1:8000/api/notes";
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.delete('http://127.0.0.1:8000/api/notes/' + id, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.error(error)
            }
        })
    }

    return <button onClick={handleSubmit}>Delete Note</button>;
}