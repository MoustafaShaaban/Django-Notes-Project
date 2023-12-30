import axios from "axios";
import { Cookies } from "quasar";


export const axiosAPI = axios.create({
    baseURL: import.meta.env.VITE_REST_API_URL,
    withCredentials: true,
    timeout: 4000,
});


export const getNotes = async () => {
    const response = await axiosAPI.get("/notes/")
    return response.data
}

export const addNote = async (note) => {
    return await axiosAPI.post("/notes/", note, {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        }
      })
}

export const updateNote = async (updatedNote) => {
    try {
        await axiosAPI.put(`/notes/${updatedNote.id}/` + updatedNote)
        await router.push("/notes")
    } catch (error) {
        if (error.response.errors) {
            console.error(error)
        }
    }
}

export const deleteNote = async (id) => {
    await axiosAPI.delete("/notes/" + id, {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken')
        }
      })
}
