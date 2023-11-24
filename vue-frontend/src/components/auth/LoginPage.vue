<template>
    <div class="container">
        <div v-if="!this.notesStore.isAuthenticated" class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start mx-auto">
                <h1 class="p-4 display-4 fw-bold lh-1 mb-3">Sign in to your account</h1>
            </div>
            <div class="col-md-10 mx-auto col-lg-5">
                <form @submit.prevent="login" class="p-4 p-md-5 border rounded-3"
                    data-bitwarden-watching="1">
                    <div class="form-floating mb-3">
                        <input type="text" v-model="username" required class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Username</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" v-model="password" required class="form-control" id="floatingPassword"
                            placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useNotesStore } from '../../stores/notesStore';

export default {
    name: "LoginPage",
    setup() {
    const notesStore = useNotesStore();
    return { notesStore };
  },
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        async login() {
            await this.notesStore.login(this.username, this.password)
            this.$router.push('/')
        }
    },

}
</script>