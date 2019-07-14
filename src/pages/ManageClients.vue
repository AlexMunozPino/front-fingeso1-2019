<template>
    <div>
      <div class="data_1">
        <input id="name" class="name" type="text" placeholder="Nombre de cliente">
        <input id="company" class="company" type="text" placeholder="Nombre de empresa">
        <input id="direction" class="direction" type="text" placeholder="Dirección">
      </div>
      <div class="data_2">
        <input id="number" class="number" type="text" placeholder="Número">
        <input id="email" class="email" type="text" placeholder="Email">
      </div>
      <div>
        <input type="submit" value="Crear o Modificar">
      </div>
      <div class="data_3">
        <table class="table">
          <tr>
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Dirección</th>
            <th>Número</th>
            <th>Email</th>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ManageClients",
      data(){
          return{
            client: null
          }
      }
    }
</script>

<style scoped>
  div{
    text-align: center  ;
  }
</style>
