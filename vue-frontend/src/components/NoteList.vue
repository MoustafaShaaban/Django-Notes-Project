<template>
  <div>
    <div class="q-pa-md example-row-all-breakpoints">
      <span v-if="isPending">Loading...</span>
      <span v-else-if="isError">Error: {{ error.message }}</span>
      <span v-else-if="notes.length == 0">No Notes Added</span>
      <div v-else-if="notes" class="col q-ma-sm q-pa-sm">
        <q-card v-for="note in notes" :key="note.id" flat bordered class="my-card col-12 col-md-8 q-mx-auto q-my-md"
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ note.title }}</div>
                <div class="text-subtitle2">{{ note.created_on }}</div>
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            {{ note.content }}
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <router-link :to="{ name: 'editNote', params: { id: note.id } }">
              <q-btn color="info" flat>
                Edit
              </q-btn>
            </router-link>
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
          <q-form @submit.prevent="onSubmit" @reset="onReset">
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

<script setup>
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, onActivated } from 'vue';
import { useCookies } from "@vueuse/integrations/useCookies";
import { useQuery, useQueryClient, useMutation } from '@tanstack/vue-query';

import { useAuthStore } from '../stores/authStore';
import { getNotes, deleteNote, addNote } from '../api/axios';

const card = ref(false);
const title = ref('')
const content = ref('')

const authStore = useAuthStore();

const router = useRouter();
const $q = useQuasar()

const queryClient = useQueryClient();

const { isPending, isFetching, isError, data: notes, error } = useQuery({
  queryKey: ['notes'],
  queryFn: getNotes,
  onError: async (error) => {
    $q.notify({
      message: error.message,
      color: "negative",
      actions: [
        { icon: 'close', color: 'white', round: true, }
      ]
    })
  }
})

const { mutate, reset } = useMutation({
  mutationFn: addNote,
  onSuccess: async () => {
    queryClient.invalidateQueries("notes")
    await router.push('/notes')
    $q.notify({
      message: 'Note Added Successfully',
      color: "positive",
      actions: [
        { icon: 'close', color: 'white', round: true, }
      ]
    })
  },
  onError: async (error) => {
    $q.notify({
      message: error.message,
      color: "negative",
      actions: [
        { icon: 'close', color: 'white', round: true, }
      ]

    })
  },
})

function onSubmit() {
  mutate({
    title: title.value,
    content: content.value
  })
  card.value = false
  title.value = null
  content.value = null
}

function onReset() {
  title.value = null
  content.value = null
}

const deleteNoteMutation = useMutation({
  mutationFn: deleteNote,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["notes"]
    })
  }
})

const handleSubmit = (id) => {
  deleteNoteMutation.mutate(id)
}

function confirm(id) {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this note?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    handleSubmit(id)
    router.push('/notes')
    $q.notify({
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