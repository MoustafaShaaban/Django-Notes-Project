<template>
    <header class="p-3 text-bg-dark expand-lg">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                        <use xlink:href="#bootstrap"></use>
                    </svg>
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <RouterLink to="/" class="nav-link px-2 text-white">Home</RouterLink>
                    </li>
                </ul>
h
                <div class="text-end" v-if="!store.$state.isAuthenticated">
                    <RouterLink to="/login" type="button" class="btn btn-outline-light me-2">Login</RouterLink>
                    <RouterLink to="/register" type="button" class="btn btn-warning">Register</RouterLink>
                </div>

                <div class="text-end" v-if="store.$state.isAuthenticated">
                    <div class="dropdown text-end">
                        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="text-white">Hello, {{ user }}</span>
                        </a>
                        <ul class="dropdown-menu text-small" style="">
                            <li><RouterLink to="/add-note" class="dropdown-item" href="#">Add Note</RouterLink></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a role="button" @click="logout" class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState } from 'pinia';
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/authStore';
export default {
    name: "Header",
    setup() {
        const authStore = useAuthStore();
        const username = authStore.username
        return { authStore, username };
    },
    computed: {
        ...mapState(useAuthStore, {
            user: "username"
        })
    },
    methods: {
        async logout() {
            await this.authStore.logout()
            this.$router.push('/login')
        },

        async getUser() {
            await this.authStore.fetchUser()
        }
    }

}
</script>