import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { Quasar, Notify, Dialog, Cookies } from 'quasar'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import axios from "axios";
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'



const app = createApp(App)

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: 'http://localhost:8000/graphql/',
    credentials: 'include',
    headers: {
        'X-CSRFToken': Cookies.get('csrftoken')
    }
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})


app.use(createPinia())
app.use(router)
app.use(Quasar, {
    plugins: {
        Notify,
        Dialog,
        Cookies
    }, // import Quasar plugins and add here
})

app.use(VueQueryPlugin)
app.use(apolloProvider)

app.mount('#app')
