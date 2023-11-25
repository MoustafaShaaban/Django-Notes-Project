<template>
    <div class="p-5 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">{{ note.title }}</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">
            {{ note.content }}.
        </p>
        <div class="d-inline-flex gap-2 mb-5">
            <router-link :to="{ name: 'editNote', params: { id: note.id } }" class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
                Edit
            </router-link>
            <button class="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Delete
            </button>
        </div>
    </div>

    <!-- Delete Note Confirm Modal -->
    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Note</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete this note?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="handleSubmit(note.id)" type="button" class="btn btn-primary"
                        data-bs-dismiss="modal">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { deleteNote } from '../../api/axios';
import { useNotesStore } from "../../stores/notesStore";

export default {
    name: "Note",

    setup() {
        const notesStore = useNotesStore();

        return {
            notesStore,
        };
    },

    data() {
        return {
            note: {
                title: "",
                content: ""
            },
        }
    },

    async mounted() {
        if (!this.notesStore.$state.csrfToken) {
            await this.notesStore.getCSRFToken();
        }

        await axios.get("http://localhost:8000/api/notes/" + this.$route.params.id, {
            withCredentials: true,
            withXSRFToken: true
        })
            .then(response => {
                this.note = response.data
            });
    },

    methods: {
        async handleSubmit(id) {
            await deleteNote(id)
            await this.$router.push('/notes');
        }
    }
}
</script>


