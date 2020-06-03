import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        funds: 1000.00,
        stocks: [
            {
                company: 'BMW',
                price: 110,
                quantity: 0,
            },
            {
                company: 'Google',
                price: 200,
                quantity: 0,
            },
            {
                company: 'Apple',
                price: 250,
                quantity: 0,
            },
            {
                company: 'Twitter',
                price: 129,
                quantity: 0,
            },
        ],
        portfolio: []
    },
    mutations: {
        fundsRemoved: (state, price) => {
            state.funds -= price;
        },
        fundsAdded: (state, price) => {
            state.funds += price;
        },
    }
})