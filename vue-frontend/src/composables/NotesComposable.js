import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

import { useNotesStore } from "../stores/notesStore";


export default async function useNotes() {
    

    const notesAPI = axios.create({
        baseURL: "http://localhost:8000/api",
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: 4000,
    });

    const notesList = ref([]);
    const note = ref([]);
    const router = useRouter();
    
    const getNotes = async () => {
        let response = await notesAPI.get("/notes/")
        notesList.value =  response.data.notes
    }

    const getNote = async (id) => {
        let response = await notesAPI.get("/notes/" + id)
        note.value = response.data.data
    }
    
    
    const createNote = async (data) => {
        try {
            await notesAPI.post("/notes/", data)
            await router.push("/notes")
        } catch(error) {
            if (error.response.errors) {
                console.error(error)
            }
        }
    }
    
    const updateNote = async (id) => {
        try {
            await notesAPI.put("/notes/" + id, note.value)
            await router.push("/notes")
        } catch (error) {
            if (error.response.errors) {
                console.error(error)
            }
        }
    }
    
    const removeNote = async (id) => {
        return await notesAPI.delete("/notes/" + id)
    }


    return {
        notesList,
        note,
        getNotes,
        getNote,
        createNote,
        updateNote,
        removeNote
    }
}