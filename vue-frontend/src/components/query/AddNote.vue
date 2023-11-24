<template>
    <div class="container">

        <div v-if="store.isAuthenticated" class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start mx-auto">
                <h1 class="p-4 display-4 fw-bold lh-1 mb-3">Add Note</h1>
            </div>
            

            <div class="col-md-10 mx-auto col-lg-5">
                <div v-if="isPending" class="alert alert-primary" role="alert">
                    Adding todo...
                </div>
                <div v-else-if="isSuccess"  class="alert alert-info" role="alert">
                    Note added!
                </div>

                <div v-else-if="isError" class="alert alert-danger" role="alert">
                    An error occurred: {{ error.message }}
                </div>


                <form @submit.prevent="handleSubmit" class="p-4 p-md-5 border rounded-3" data-bitwarden-watching="1">
                    <div class="form-floating mb-3">
                        <input type="text" v-model="title" required class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Note Title</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="content" required class="form-control" id="floatingContent"
                            placeholder="Note Content">
                        <label for="floatingContent">Note Content</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Add Note</button>
                </form>
            </div>
        </div>

        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useNotesStore } from '../../stores/notesStore';
import { addNote } from '../../api/axios';

const title = ref('')
const content = ref('')
const queryClient = useQueryClient();

const router = useRouter()
const store = useNotesStore();

onMounted(store.getCSRFToken)

const { isPending, isError, error, isSuccess, mutate, reset } = useMutation({
    mutationFn: addNote,
    onSuccess: async () => {
        queryClient.invalidateQueries("notes")
        await router.push('/notes')
    }
})

function handleSubmit() {
    mutate({
        title: title.value,
        content: content.value
    })
}

</script>