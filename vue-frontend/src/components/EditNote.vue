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
        <q-form @submit.prevent="updateNote">
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
import { useQuasar, Notify, Cookies } from 'quasar'
import { useRouter } from 'vue-router';

import { useAuthStore } from "../stores/authStore";
import { axiosAPI } from '../api/axios';
import router from '../router';

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
    await axiosAPI.get("/notes/" + this.$route.params.id)
      .then(response => {
        this.note = response.data
      });
  },
  methods: {
    async updateNote(e) {
      try {
        await axiosAPI.put(`/notes/${this.note.id}/`, this.note, {
          headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
          }
        })
          .then(response => {
            this.$router.push('/notes');
            Notify.create({
              message: 'Note Updated Successfully',
              color: "positive",
              actions: [
                { icon: 'close', color: 'white', round: true, }
              ]
            })
          })
      } catch (error) {
        Notify.create({
          message: error.message,
          color: "negative",
          actions: [
            { icon: 'close', color: 'white', round: true, }
          ]
        })
      }
    },

    async navigateToNotes() {
      await router.push({ name: "notes" })
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