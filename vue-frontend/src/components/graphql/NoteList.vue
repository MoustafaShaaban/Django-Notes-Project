<template>
  <div>
    <div class="q-pa-md example-row-all-breakpoints">
      <span v-if="$apollo.loading">Loading...</span>
      <span v-else-if="$apollo.error">Error: {{ error.message }}</span>
      <div v-else-if="allNotes.length == 0" class="items-center q-my-auto">
        No Notes available Try <q-btn size="sm" color="primary" @click="refreshPage"> Reloading</q-btn> the page
        or click on the plus sign to add a new note
      </div>
      <div v-else-if="allNotes" class="col q-ma-sm q-pa-sm">
        <q-card v-for="note of allNotes" :key="note.id" flat bordered class="my-card col-12 col-md-8 q-mx-auto q-my-md"
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ note.title }}</div>
                <div class="text-subtitle2">{{ note.user.username }}</div> <span>{{ note.createdOn }}</span>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            {{ note.content }}
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <!-- <router-link :to="{ name: 'editNote', params: { id: note.id } }">
              <q-btn color="info" flat>
                Edit
              </q-btn>
            </router-link> -->
            <q-btn color="info" flat @click="confirm(note.id)">Delete</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="card">
      <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Note</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>


        <q-card-section>
          <q-form @submit.prevent="handleSubmit" @reset="onReset">
            <q-input filled v-model.lazy.trim="title" label="Note Title" required lazy-rules
              :rules="[val => val && val.length > 0 || 'Note Title is required']" />

            <q-input filled v-model.lazy.trim="content" type="text" required label="Note Content" lazy-rules
              :rules="[val => val && val.length > 0 || 'Note Content is required']" />
            <q-separator />
            <div class="q-pa-sm q-mt-md">
              <q-btn label="Add Note" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" class="bg-grey-8 text-white q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="card = true">
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { Notify, Dialog } from 'quasar';
import gql from 'graphql-tag'
import { addNoteMutation, deleteNoteMutation } from '../../mutations';

export default {
  name: "GraphQLNoteList",
  setup() {
    const router = useRouter()
    return { router }
  },
  apollo: {
    allNotes: gql`
            query getNotes {
                allNotes {
                    id
                    title
                    content
                    createdOn
                    user {
                        username
                    }
                }
            }
        `
  },
  data() {
    return {
      allNotes: [],
      card: false,
      title: "",
      content: ""
    }
  },
  methods: {
    refreshPage() {
      window.location.reload();
    },

    async handleSubmit() {
      await this.$apollo.mutate({
        mutation: addNoteMutation,
        variables: {
          "title": this.title,
          "content": this.content
        }
      })
      this.card = false
      await this.$router.push("/notes/graphql")
      this.refreshPage()
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
    },
    confirm(id) {
      Dialog.create({
        title: 'Confirm',
        message: 'Are you sure you want to delete this note?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteNote(id)
        this.$router.push('/notes/graphql')
        Notify.create({
          message: 'Note Deleted Successfully',
          color: "positive",
          actions: [
            { icon: 'close', color: 'white', round: true, }
          ]
        })
      }).onCancel(() => {
        return
      }).onDismiss(() => {
        return
      })
    },

    async deleteNote(id) {
      await this.$apollo.mutate({
        mutation: deleteNoteMutation,
        variables: {
          // https://stackoverflow.com/questions/73172384/variable-id-got-invalid-value-1-int-cannot-represent-non-integer-value-1
          id: parseInt(id),
        }
      })
      this.refreshPage()
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
