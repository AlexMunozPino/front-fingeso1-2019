<template>
    <div>
      <div>
        <h2>{{client}}: {{company}}</h2>
        <p>Número: {{number}}</p>
        <p>Email: {{email}}</p>
        <p>Dirección: {{direction}}</p>
      </div>
      <div>
        <input id="name" class="name" type="text" placeholder="Nombre de cliente">
        <input id="company" class="company" type="text" placeholder="Nombre de empresa">
        <input id="direction" class="direction" type="text" placeholder="Dirección">
      </div>
      <div>
        <input id="number" class="number" type="text" placeholder="Número">
        <input id="email" class="email" type="text" placeholder="Email">
      </div>
      <div>
        <input type="submit" value="Modificar">
      </div>
    </div>
</template>

<script>
    export default {
        name: "ClientDetail",
      data(){
          return{
            client: null,
            company: null,
            email: null,
            direction: null,
            number: null
          }
      }
    }
</script>

<style scoped>
  div{
    text-align: center;
  }
</style>
