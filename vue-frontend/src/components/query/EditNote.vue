<template>
    <div class="container">
        <div v-if="notesStore.$state.isAuthenticated" class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start mx-auto">
                <h1 class="p-4 display-4 fw-bold lh-1 mb-3">Update Note</h1>
            </div>
            <div v-if="isPending" class="alert alert-primary" role="alert">
                    Adding todo...
                </div>
                <div v-else-if="isSuccess"  class="alert alert-info" role="alert">
                    Note added!
                </div>

                <div v-else-if="isError" class="alert alert-danger" role="alert">
                    An error occurred: {{ error.message }}
                </div>

            <div class="col-md-10 mx-auto col-lg-5">
                <form @submit.prevent="handleSubmit" class="p-4 p-md-5 border rounded-3" data-bitwarden-watching="1">
                    <div class="form-floating mb-3">
                        <input type="text" required class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">{{ this.data.title }}</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" required class="form-control" id="floatingContent"
                            placeholder="Note Content">
                        <label for="floatingContent">{{ this.data.content }}</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Update Note</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { useQuery, useMutation } from "@tanstack/vue-query";
    import { useRoute } from "vue-router";
    import { getNote } from "../../api/axios";
    import { useNotesStore } from "../../stores/notesStore";

    const fetcher = async (id) => await fetch(`http://localhost:8000/api/notes/${id}/`, {
        credentials: "include"

    }).then(
        response => response.json()
    )

    const route = useRoute()

    export default {
        name: "EditNote",
        setup(id) {
            const { isPending, isError, isFetching, data, error } = useQuery({
                queryKey: ['note', id],
                queryFn: () => fetcher(route.params.id),
            })

            const notesStore = useNotesStore();

            return { isPending, isError, isFetching, data, error, notesStore }
        }
    }
</script>