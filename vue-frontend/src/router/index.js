import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import LoginPage from '../components/auth/LoginPage.vue'
import RegisterPage from '../components/auth/RegisterPage.vue'
import AddNote from '../components/notes/AddNote.vue'
import AddNoteVue from '../components/query/AddNote.vue'
import NoteListVue from '../components/query/NoteList.vue'

import { useNotesStore } from '../stores/notesStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        protected: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        protected: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        protected: false
      }
    },
    {
      path: '/notes',
      name: 'notes',
      component: NoteListVue,
      meta: {
        protected: true
      }
    },
    {
      path: '/add-note',
      name: 'addNote',
      component: AddNoteVue,
      meta: {
        protected: true
      }
    },
    {
      path: "/edit-note/:id",
      name: "editNote",
      component: () => import("../components/notes/EditNote.vue"),
      meta: {
        protected: true
      }
    },
    {
      path: "/note/:id",
      name: "note",
      component: () => import("../components/notes/Note.vue"),
      meta: {
        protected: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const notesStore = useNotesStore();
  if (to.meta.protected && !notesStore.$state.isAuthenticated) next({ name: 'login' })
  else next()
});

export default router
