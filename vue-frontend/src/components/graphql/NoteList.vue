

<template>
  <div>
    <div class="q-pa-md example-row-all-breakpoints">
      <span v-if="$apollo.loading">Loading...</span>
      <span v-else-if="$apollo.error">Error: {{ error.message }}</span>
      <span v-else-if="allNotes.length == 0">No Notes Added</span>
      <div v-else-if="allNotes" class="col q-ma-sm q-pa-sm">
        <q-card v-for="note of allNotes" :key="note.id" flat bordered class="my-card col-12 col-md-8 q-mx-auto q-my-md"
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">{{ note.title }}</div>
                <div class="text-subtitle2">{{ note.user.username }}</div>
              </div>

              <!-- <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
                        <q-item-section>
                          <router-link :to="`/note/${note.id}/`">Detail</router-link>
                        </q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Send Feedback</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Share</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div> -->
            </div>
          </q-card-section>

          <q-card-section>
            {{ note.content }}
          </q-card-section>

          <q-separator />

          <!-- <q-card-actions>
            <router-link :to="{ name: 'editNote', params: { id: note.id } }">
            <q-btn color="info" flat>
                Edit
              </q-btn>
            </router-link>
            <q-btn color="info" flat @click="confirm(note.id)">Delete</q-btn>
          </q-card-actions> -->
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

<script>
import { useRouter } from 'vue-router';
import gql from 'graphql-tag'

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
        }
    },
    created() {
      this.refreshPage()
    },
    methods: {
      refreshPage() {
        const router = useRouter()
        router.go(1);
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
