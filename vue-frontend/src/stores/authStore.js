import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { Cookies } from "quasar"

import { axiosAPI } from "../api/axios";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: useLocalStorage('Authenticated', null),
    }),
    actions: {
        async getCSRFToken() {
            const res = await fetch("http://localhost:8000/api/csrf/", {
                credentials: "include",
            });

            let token = res.headers.get("X-CSRFToken");
            return token
        },

        async getSession() {
            await axiosAPI.get('/session/')
        },

        async login(username, password) {
            await axiosAPI.post('/login/', {username, password}, {
                headers: {
                    'Accept': 'application-json',
                    'Content-Type': 'application-json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                }
            })
            this.isAuthenticated = true;
        },

        async logout() {
            await axiosAPI.post('/logout/', {}, {
                headers: {
                    'Accept': 'application-json',
                    'Content-Type': 'application-json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                }
            })
            this.isAuthenticated = null;
            localStorage.removeItem('Authenticated')
        },

        async register(username, password) {
            await axiosAPI.post('/register/', {username, password})
        },
    }
})