/* eslint-disable no-console */

import { register } from 'register-service-worker'
import axios from 'axios'
if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready() {
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB'
            )
        },
        registered() {
            console.log(this, window.localStorage)
            console.log('Service worker has been registered.')
            axios.get('https://pokeapi.co/api/v2/pokemon/ditto').then(pokemon => {
                window.localStorage.setItem('pokemon_order', pokemon.order)
            })
        },
        cached() {
            window.localStorage.setItem('pokemon_order_cached', window.localStorage.getItem('pokemon_order'))
            console.log('Content has been cached for offline use.')
        },
        updatefound() {
            console.log('New content is downloading.')
        },
        updated() {
            console.log('New content is available; please refresh.')
        },
        offline() {
            console.log('No internet connection found. App is running in offline mode.')
        },
        error(error) {
            console.error('Error during service worker registration:', error)
        }
    })
}