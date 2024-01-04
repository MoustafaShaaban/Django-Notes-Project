<script>
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { Notify } from 'quasar';

import { useAuthStore } from './stores/authStore';

export default {
  name: "App",
  setup() {
    const authStore = useAuthStore();
    const leftDrawerOpen = ref(false)
    return {
      authStore,
      tab: ref('images'),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    };
  },
  async created() {
    await this.authStore.getSession();
  },
  methods: {
    async logout() {
      try {
        await this.authStore.logout()
        this.$router.push('/login')
        Notify.create({
          message: 'Logged out Successfully',
          type: "positive",
          actions: [
            { icon: 'close', color: 'white', round: true, }
          ]
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
  }
}
</script>

<!-- <template>
    <Header></Header>
    <div>
      <RouterView />
    </div>

</template> -->

<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Notes App
        </q-toolbar-title>
        <q-tabs v-model="tab" v-if="!authStore.$state.isAuthenticated">
          <router-link to="/login" name="Login" label="Login">
            <q-btn color="primary" label="Login" />
          </router-link>
          <router-link to="/register" name="Register" label="Register">
            <q-btn size="md" color="primary" label="Register" />
          </router-link>
        </q-tabs>

        <q-tabs v-model="tab" v-if="authStore.$state.isAuthenticated">
          <div class="q-pa-md">
            <q-btn-dropdown color="primary" label="Manage Account">
              <q-list>
                <q-item clickable>
                  <q-item-section>
                    <RouterLink to="/add-note" class="dropdown-item">
                      Add Note
                    </RouterLink>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section>
                    <RouterLink to="/notes/graphql" class="dropdown-item">
                      GraphQL Note List
                    </RouterLink>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section>
                    <RouterLink to="/add-note/graphql" class="dropdown-item">
                      GraphQL Add Note
                    </RouterLink>
                  </q-item-section>
                </q-item>

                <q-item clickable @click="logout">
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list v-if="authStore.$state.isAuthenticated" padding class="menu-list q-mt-lg">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <router-link to="/notes">
              REST API Notes List
            </router-link>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <router-link to="/notes/graphql">
              GraphQL Notes List
            </router-link>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <router-link to="/add-note">
              Add Note REST API
            </router-link>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <router-link to="/add-note/graphql">
              Add Note GraphQL
            </router-link>
          </q-item>
        </q-list>
        <q-list v-else padding class="menu-list q-mt-lg">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <router-link to="/about">
              About
            </router-link>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <RouterView :key="$route.path" />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>