import { defineStore } from "pinia";

/*
    You can name the return value of `defineStore()` anything you want,
    but it's best to use the name of the store and surround it with `use`
    and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
    the first argument is a unique id of the store acrros your application
*/
export const useNotesStore = defineStore('notes', {
    state: () => ({
        csrfToken: '',
        isAuthenticated: false,
        username: '',
    }),

    getters: {
        getUser({ username }) {
            return username
        },
        getCSRF({ csrfToken }) {
            return csrfToken
        },
    },

    actions: {
        async getCSRFToken() {
            const res = await fetch("http://localhost:8000/api/csrf/", {
                credentials: "include",
            });

            // const csrftoken = await res.json()
            let token = res.headers.get("X-CSRFToken");
            this.csrfToken = token
        },

        async getSession() {
            await fetch("http://localhost:8000/api/session/", {
                credentials: "include"
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.isAuthenticated) {
                        this.isAuthenticated = true
                    } else {
                        this.isAuthenticated = false;
                        this.getCSRFToken();
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        },

        async register(username, password) {
            await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": this.csrfToken

                },
                body: JSON.stringify({ username, password }),
                credentials: "include"
            });
        },

        async login(username, password) {
            await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": this.csrfToken
                },
                body: JSON.stringify({ username, password }),
                credentials: "include"
            });
            this.isAuthenticated = true;
        },

        async fetchUser() {
            const res = await fetch("http://localhost:8000/api/whoami", {
                credentials: "include"
            });
            const user = await res.json();
            this.username = user.username;
        },

        async logout() {
            await fetch("http://localhost:8000/api/logout/", {
                credentials: "include"
            });
            this.isAuthenticated = false;
            this.getCSRFToken();
        },

        async getnotes() {
            await fetch("http://localhost:8000/api/notes/", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            })
                .then((res) => res.json())
                .then(data => {
                    this.notes = data
                })
            this.getCSRFToken()
        },

        async addNote(title, content) {
            await fetch("http://localhost:8000/api/notes/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": this.csrfToken
                },
                body: JSON.stringify({ title, content }),
                credentials: "include",
            })

            this.getnotes();
        },

        async deleteNote(id) {
            await fetch(`http://localhost:8000/api/notes/${id}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": this.csrfToken
                },
                credentials: "include",
            })

        }
    }
});


/*
    There is another possible syntax to define stores. Similar to the Vue Composition API's
    `sertup function`, we can pass in a function that defines reactive properties and methods
    and returns an object with the properties and methods we want to expose

    export const useAuthStore = defineStroe('auth', () => {
        const csrfToken = ref('')
        const isAuthenticated = ref(false)

        function getCSRFToken() {

        }
    })
*/