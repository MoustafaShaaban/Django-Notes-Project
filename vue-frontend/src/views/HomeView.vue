<script>
import { RouterView, RouterLink } from 'vue-router'
// import NoteList from '../components/notes/NoteList.vue';
import NoteList from '../components/query/NoteList.vue';
// import AddNote from './components/query/AddNote.vue';
// import { useAuthStore } from '../stores/auth/auth';
import { useNotesStore } from '../stores/notesStore';

export default {
  name: "HomeView",
  components: {
    NoteList,
    // AddNote
  },
  setup() {
    const notesStore = useNotesStore();
    return { notesStore };
  },
  async created() {
    await this.notesStore.fetchUser();
  }
}
</script>

<template>
  <main>
    <div class="text-secondary px-4 py-5 text-center">
      <div class="py-5">
        <h1 class="display-5 fw-bold">Welcom to Notes App</h1>
        <div class="col-lg-6 mx-auto">
          <p class="fs-5 mb-4">This App is built using Django, Django Rest Framework and Vue JS. To get started use the following link to login to your account.</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <RouterLink v-if="notesStore.$state.isAuthenticated" to="/notes" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Go to Notes</RouterLink>
            <RouterLink v-else="!notesStore.$state.isAuthenticated" to="/login" type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Login</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
