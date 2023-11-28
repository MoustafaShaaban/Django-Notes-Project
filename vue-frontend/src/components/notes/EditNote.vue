<template>
    <div class="container">
        <div v-if="this.notesStore.isAuthenticated" class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start mx-auto">
                <h1 class="p-4 display-4 fw-bold lh-1 mb-3">Update Note</h1>
            </div>

            <div class="col-md-10 mx-auto col-lg-5">
                <form @submit.prevent="updateNote" class="p-4 p-md-5 border rounded-3" data-bitwarden-watching="1">
                    <div class="form-floating mb-3">
                        <input type="text" v-model="note.title" required class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Note Title</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="note.content" required class="form-control" id="floatingContent"
                            placeholder="Note Content">
                        <label for="floatingContent">Note Content</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Update Note</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useNotesStore } from "../../stores/notesStore";
import { notesAPI } from '../../api/axios';

export default {
    name: "EditNote",
    setup() {
        const notesStore = useNotesStore();
        return { notesStore };
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
        await this.notesStore.getCSRFToken()
        await notesAPI.get("/notes/" + this.$route.params.id, {
            withCredentials: true,
        })
            .then(response => {
                this.note = response.data
            });
    },
    methods: {
        updateNote(e) {

            notesAPI.put(`/notes/${this.note.id}/`, this.note, {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    "X-CSRFToken": this.notesStore.csrfToken
                }
            })
                .then(response => {
                    this.$router.push('/notes');
                })

        }
    }
}
</script>