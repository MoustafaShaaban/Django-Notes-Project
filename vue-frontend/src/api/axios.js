import axios from "axios";
import { useNotesStore } from "../stores/notesStore";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";




export const notesAPI = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 4000,
});


export const getNote = async (id) => {
    const response = await notesAPI.get("/notes/" + id)
    return response.data
}

export const getNotes = async () => {
    const response = await notesAPI.get("/notes/")
    return response.data
}

export const addNote = async (note) => {
    const store = useNotesStore();
    return await notesAPI.post("/notes/", note, {
        headers: {
            "X-CSRFToken": store.$state.csrfToken
        }
    })
}

export const updateNote = async (id) => {
    try {
        const store = useNotesStore();
        await notesAPI.put("/notes/" + id, {
            headers: {
                "X-CSRFToken": store.$state.csrfToken
            }
        })
        await router.push("/notes")
    } catch (error) {
        if (error.response.errors) {
            console.error(error)
        }
    }
}

export const deleteNote = async (id) => {
    const store = useNotesStore();
    return await notesAPI.delete("/notes/" + id, {
        headers: {
            "X-CSRFToken": store.$state.csrfToken
        }
    })
}