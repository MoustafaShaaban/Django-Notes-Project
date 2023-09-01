import { useEffect, useState } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../Axios";

export default function NoteList() {
    const [notes, setNotes] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState();

    const navigate = useNavigate();

    function toggleShow() {
        setShow(!show)
    }

    useEffect(() => {
        const url = 'http://127.0.0.1:8000/api/notes/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify()
        })
        .then((response) => {
            if (response.status === 401) {
                navigate('/login');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            setNotes(data);
            setError(undefined);
        })
        .catch((e) => {
            setError(e.message)
        })

    }, [])

    return (
        <>
            <h1>Hello</h1>
            <div>
                {/* {!notes || notes.length <= 0 ? (
                    <p>No Notes Yet</p>
                ) : (
                    notes?.map((note) => (
                        <ul>
                            <li key={note.id}>{note.title}</li>
                        </ul>
                    ))
                )} */}
            </div>
        </>
    );
}