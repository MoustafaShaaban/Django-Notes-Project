<template>
    <q-page class="flex flex-center">
        <div v-if="$apollo.loading" class="alert alert-primary" role="alert">
            Adding note...
        </div>
        <span v-else-if="$apollo.error">Error: {{ error.message }}</span>
        <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
            <q-card-section>
                <div class="row items-center no-wrap">
                    <div class="col">
                        <div class="text-h6">Add Note</div>
                    </div>
                </div>
            </q-card-section>

            <q-card-section>
                <q-form @submit.prevent="handleSubmit" @reset="onReset">
                    <q-input filled v-model="title" label="Note Title" required lazy-rules
                        :rules="[val => val && val.length > 0 || 'Note Title is required']" />

                    <q-input filled v-model="content" type="text" required label="Note Content" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Note Content is required']" />
                    <q-separator />
                    <div class="q-pa-sm q-mt-md">
                        <q-btn label="Add Note" type="submit" color="primary" />
                        <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { Notify } from "quasar"
import { addNoteMutation } from "../../mutations"
import { getAllNotes } from "../../queries"

export default {
    name: "GraphQLAddNote",
    data() {
        return {
            title: "",
            content: ""
        }
    },
    methods: {
        handleSubmit() {
            this.$apollo.mutate({
                mutation: addNoteMutation,
                variables: {
                    "title": this.title,
                    "content": this.content
                },
                update: (store, { data: { handleSubmit } }) => {
                    // Add to all notes list
                    let data = store.readQuery({ query: getAllNotes })
                    data = {
                        ...data,
                        notes: [
                            ...data.notes,
                            handleSubmit
                        ],
                    }
                    store.writeQuery({ query: getAllNotes, data })
                }
            })
            this.$router.push("/notes/graphql")
            Notify.create({
                message: 'Note Added Successfully',
                color: "positive",
                actions: [
                    { icon: 'close', color: 'white', round: true, }
                ]
            })
        },
        onReset() {
            this.title = null
            this.content = null
        }

    },
}
</script>
