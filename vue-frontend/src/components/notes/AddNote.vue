<template>
    <div class="container">
        <div v-if="this.notesStore.isAuthenticated" class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start mx-auto">
                <h1 class="p-4 display-4 fw-bold lh-1 mb-3">Add Note</h1>
            </div>

            <div class="col-md-10 mx-auto col-lg-5">
                <form @submit.prevent="handleSubmit" class="p-4 p-md-5 border rounded-3" data-bitwarden-watching="1">
                    <div class="form-floating mb-3">
                        <input type="text" v-model="this.note.title" required class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Note Title</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="this.note.content" required class="form-control" id="floatingContent"
                            placeholder="Note Content">
                        <label for="floatingContent">Note Content</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Add Note</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { addNote } from '../../api/axios';
import { useNotesStore } from '../../stores/notesStore'; 

export default {
    name: "AddNote",
    setup() {
        const notesStore = useNotesStore();
        return { notesStore };
    },
    data() {
        return {
            note: {
                title: '',
                content: ''
            }   
        }
    },
    async mounted() {
        // await this.notesStore.getCSRFToken()
    },
    methods: {
        async handleSubmit() {
            addNote(this.note)
            this.$router.push('/notes')
        }
    }
}
</script>
