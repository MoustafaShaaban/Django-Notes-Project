<template>
    <div v-for="note in notes" :key="note.id" class="card mx-auto w-25 m-3 text-center">
        <div class="card-header">
            {{ note.title }}
        </div>
        <div class="card-body">
            <p class="card-text">{{ note.content }}.</p>
            <router-link :to="{ name: 'note', params: { id: note.id } }" class="btn btn-primary">Detail</router-link>
        </div>
        <div class="card-footer text-body-secondary">
            2 days ago
        </div>
    </div>
    

    <div v-if="!notes.length" class="p-5 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">No Notes to Show</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">
            You did not add any notes yet click <router-link to="/add-note"
                class="d-inline-flex align-items-center btn btn-primary btn-sm px-4" type="button">
                here
            </router-link> to add one
        </p>
    </div>
</template>

<script>
import { useNotesStore } from "../../stores/notesStore.js"
import { RouterLink } from "vue-router";
export default {

    name: "NoteList",
    setup() {
        const notesStore = useNotesStore();
        return { notesStore };
    },
    data() {
        return {
            notes: []
        }
    },
    async created() {
        await fetch("http://localhost:8000/api/notes/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
            .then((res) => res.json())
            .then(data => {
                this.notes = data
            })
        // this.notesStore.getCSRFToken()
    },
}
</script>