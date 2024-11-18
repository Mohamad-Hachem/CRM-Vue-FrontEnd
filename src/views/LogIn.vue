<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log In</h1>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Email</label>
            <div class="control">
              <input type="email" name="email" class="input" v-model="username">
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" name="password" class="input" v-model="password">
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" :key="error">
              {{error}}
            </p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-success">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script >
  import axios from "axios";
  import {toast} from "bulma-toast";
  export default {
    name: 'LogIn',
    data() {
      return {
        username: '',
        password: '',
        errors: [],
      }
    },
    methods:{
      async submitForm(){
        this.$store.commit('setIsLoading', true)
        axios.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('token');

        const formData = {
          username: this.username,
          password: this.password,
        }

        await axios.post('/api/v1/token/login/', formData).then(response=>
        {
          const token = response.data.auth_token
          this.$store.commit('setToken', token)

          axios.defaults.headers.common['Authorization'] = 'Token ' + token
          localStorage.setItem('token', token)
          this.$router.push('/dashboard/my-account/')
        }).catch(error => {
                if(error.response) {
                    this.errors.push(error.response.data)
                }
                else if (error.message)
                {
                  this.errors.push('Something went wrong(in SignUp) please Try again!')
                }
              })
        this.$store.commit('setIsLoading', false)
      }
    }
  }
</script>