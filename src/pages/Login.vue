<template>
  <div>
    <div>
      <h1>Login</h1>
    </div>
    <div>
      <input type="text" name="user" v-model="input.username" placeholder="Nombre de Usuario">
      <input type="text" name="password" v-model="input.password" placeholder="******">
      <button type="button" v-on:click="login()">Login</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
          return{
            user: null,
            password: null
          }
        },
        methods: {
          login() {
            // Hacer login uwu
          }
        }
    }
</script>

<style scoped>

</style>
