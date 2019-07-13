<template>
  <div class="all">
    <div class="data_1">
      <input class="prop-name" id="prop-name" type="text" placeholder="Nombre de propuesta">
      <input class="budget" id="budget" type="number" placeholder="Presupuesto">
      <input class="tags" id="tags" type="text" placeholder="Tag1, Tag2, Tag3">
    </div>
    <div class="select-client">
      <p>Seleccionar Cliente:</p>
    </div>
    <div class="data_2">
      <select id="select-client">
        <option v-for="client in clients.data" value=client>{{client.userId}}</option>
      </select>
    </div>
    <div class="data_3">
      <p>Subir propuesta administrativa:</p>
      <input class="admin_proposal" type="file">
       <p>Subir propuesta económica:</p>
      <input class="economic_proposal" type="file"><br>
      <p>Subir anexos: </p>
      <input class="annexed" multiple type="file"><br>
    </div>
    <div class="submit"><input id="submit" type="submit" value="Ingresar"></div>
  </div>
  </template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      proposal: null,
      budget: null,
      tags: null,
      admin: null,
      economic: null,
      annexed: [],
      clients: null
    }
  },
  mounted() {
    axios.get(`https://jsonplaceholder.typicode.com/posts/`)
      .then(rensponse => (this.clients = rensponse))
      .catch(e => {
        console.log(e)
      })
  }
};
</script>
<style lang="scss">
  .data_1{
    display: flex;
    align-items:center;
    justify-content: center;
  }
  .data_2{
    display: flex;
    align-items:center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .data_3{
    margin: 10px auto;
    width: 50%;
  }
  .admin_proposal{
    margin: 0 10px 10px 20px;
  }
  .economic_proposal{
    margin: 0 10px 10px 20px;
  }
  .annexed{
    margin: 0 10px 10px 20px;
  }
  .prop-name{
    margin-bottom: 10px;
  }
  .budget{
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .tags{
    margin-bottom: 10px;
  }
  .submit{
    text-align: center;
  }
  .select-client{
    margin-top: 5px;
    text-align: center;
  }
</style>
