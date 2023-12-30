<script>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore';

export default {
  name: "HomeView",
  setup() {
    const store = useAuthStore();
    return { store };
  },
}
</script>

<template>
  <main>
    <div class="q-pa-md row items-start q-gutter-md q-mx-auto">
      <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Welcom to Notes App</div>
        <div class="text-subtitle2">This App is built using Django, Django Rest Framework and Vue JS. To get started use the
            following link to login to your account.</div>
      </q-card-section>

      <q-card-actions vertical>
        <q-btn v-if="store.$state.isAuthenticated" flat>
          <RouterLink to="/notes" type="button">
            <q-btn color="deep-orange" glossy label="Go to notes" />
          </RouterLink>
        </q-btn>
        <q-btn v-else-if="!store.$state.isAuthenticated" flat>
          <RouterLink to="/login" type="button" flat>
            <q-btn color="deep-orange" glossy label="Login" />
          </RouterLink>
        </q-btn>
      </q-card-actions>
    </q-card>
    </div>
  </main>
</template>
