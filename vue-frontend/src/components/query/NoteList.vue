<template>
    <div>
        <span v-if="isPending">Loading...</span>
        <span v-else-if="isError">Error: {{ error.message }}</span>
        <div v-else-if="notes">
            <div v-for="note in notes" :key="note.id" class="card mx-auto w-25 m-3 text-center">
                <div class="card-header">
                    {{ note.title }}
                </div>
                <div class="card-body">
                    <p class="card-text">{{ note.content }}.</p>
                    <router-link :to="{ name: 'editNote', params: { id: note.id } }"
                        class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
                        Edit
                    </router-link>
                    <button class="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Delete
                    </button>
                </div>
                <div class="card-footer text-body-secondary">
                    {{ note.created_on }}
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
            </div>
        </div>
    </div>

    <div v-if="!notes?.length" class="p-5 text-center bg-body-tertiary rounded-3">
        <h1 class="text-body-emphasis">No Notes to Show</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">
            You did not add any notes yet click <router-link to="/add-note"
                class="d-inline-flex align-items-center btn btn-primary btn-sm px-4" type="button">
                here
            </router-link> to add one
        </p>
    </div>
</template>

<script setup>
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
import { getNotes, deleteNote } from '../../api/axios';

// Access QueryClient instance
const queryClient = useQueryClient()

const { isPending, isFetching, isError, data: notes, error } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes
})

async function handleSubmit(id) {
    await deleteNote(id)
}
</script>