import { createStore } from 'vuex'
import {FALSE} from "sass";
import {toKey} from "core-js/internals/reflect-metadata";

export default createStore({
  state: {
    isLoading : false,
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  mutations: {
    initializeStore(state)
    {
      if(localStorage.getItem('token'))
      {
        state.token = localStorage.getItem('token');
        state.isAuthenticated = true;
      }
      else
      {
        state.token = '';
        state.isAuthenticated = false;
      }
    },
    setIsLoading(state, status)
    {
      state.isLoading = status;
    },

    setToken(state, token)
    {
      state.token = token;
      state.isAuthenticated = true;
    },

    removeToken(state)
    {
      state.token = '';
      state.isAuthenticated = false ;
    }

  },
  actions: {
  },
  modules: {
  }
})
