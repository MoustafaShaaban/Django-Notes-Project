<script>
import { RouterView, RouterLink } from 'vue-router'
import Header from './components/Header.vue';
import NoteList from './components/notes/NoteList.vue';
// import NoteList from './components/query/NoteList.vue';
// import AddNote from './components/query/AddNote.vue';
import { useAuthStore } from './stores/auth/auth';
import { useNotesStore } from './stores/notesStore';

export default {
  name: "App",
  components: {
    Header,
    NoteList,
    // AddNote
  },
  setup() {
    const notesStore = useNotesStore();
    return { notesStore };
  },
  async mounted() {
    await this.notesStore.getSession();
    if (!this.notesStore.$state.csrfToken) {
      await this.notesStore.getCSRFToken();
    }
  }
}
</script>

<template>
    <Header></Header>
    <div>
      <RouterView />
    </div>

</template>