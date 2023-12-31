import { createRouter, createWebHistory, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import LoginPage from '../components/auth/LoginPage.vue'
import RegisterPage from '../components/auth/RegisterPage.vue'
import AddNote from '../components/AddNote.vue'
import NoteListVue from '../components/NoteList.vue'

import { useAuthStore } from "../stores/authStore"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/notes',
      name: 'notes',
      component: NoteListVue,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/add-note',
      name: 'addNote',
      component: AddNote,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/edit-note/:id",
      name: "editNote",
      component: () => import("../components/EditNote.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/notes/graphql",
      name: "graphqlnoteslist",
      component: () => import("../components/graphql/NoteList.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        requireAuth: true
      }
    }
  ]
})


// Check is the user is authenticated:
// let authenticated = localStorage.getItem('Authenticated')

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  let authenticated = authStore.$state.isAuthenticated
  const router = useRouter()
  
  if (to.meta.requireAuth && !authenticated) {
    next({ name: 'login'})
  } else if (to.name == "login" && authenticated) {
    next({ name: 'home'})
  } else if (to.name == "register" && authenticated) {
    next({ name: 'home'})
  } else {
    next()
  }
})


export default router
