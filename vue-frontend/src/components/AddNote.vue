<template>
  <q-page class="flex flex-center">
    <div v-if="isPending" class="alert alert-primary" role="alert">
      Adding note...
    </div>
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

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addNote } from '../api/axios';

const title = ref('')
const content = ref('')
const queryClient = useQueryClient();

const router = useRouter()
const $q = useQuasar()

const { isPending, isError, error, isSuccess, mutate, reset } = useMutation({
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

function handleSubmit() {
  mutate({
    title: title.value,
    content: content.value
  })
}

function onReset() {
  title.value = null
  content.value = null
}

</script>