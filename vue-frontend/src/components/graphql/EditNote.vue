<template>
  <q-page class="flex flex-center">
    <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">Add Note</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleSubmit">
          <q-input filled v-model.lazy.trim="note.title" label="Note Title" required lazy-rules
            :rules="[val => val && val.length > 0 || 'Note Title is required']" />

          <q-input filled v-model.lazy.trim="note.content" type="text" required label="Note Content" lazy-rules
            :rules="[val => val && val.length > 0 || 'Note Content is required']" />
          <q-separator />
          <div class="q-pa-sm q-mt-md">
            <q-btn label="Update Note" type="submit" color="primary" />
            <q-btn label="Cancel" type="button" @click="navigateToNotes" class="bg-grey-8 text-white q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>


<script>
import { Notify, Cookies } from 'quasar'
import { useRoute } from 'vue-router';
import { axiosAPI } from '../../api/axios';
import { noteById } from '../../queries';
import { updateNoteMutation } from '../../mutations'

export default {
  name: "EditNote",

  data() {
    return {
      note: {
        title: "",
        content: ""
      },
    }
  },
  async created() {
    this.getNote()
  },
  methods: {
    handleSubmit() {
      this.$apollo.mutate({
        mutation: updateNoteMutation,
        variables: {
          "id": parseInt(this.$route.params.id),
          "title": this.note.title,
          "content": this.note.content
        }
      })
      this.$router.push("/notes/graphql")
      Notify.create({
        message: 'Note Updated Successfully',
        color: "positive",
        actions: [
          { icon: 'close', color: 'white', round: true, }
        ]
      })
    },

    async navigateToNotes() {
      await this.$router.push({ name: "notes" })
    },

    async getNote() {
      let data = await this.$apollo.query({
        query: noteById,
        variables: {
          id: parseInt(this.$route.params.id)
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

      // Make a copy of the returned data because the data saved in the cache is read-only
      const noteData = { ...data.data.noteById }
      this.note = noteData
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 500px
    max-height: 500px

.example-row-all-breakpoints
    .row > div
      padding: 10px 15px
    .row + .row
      margin-top: 1rem
</style>