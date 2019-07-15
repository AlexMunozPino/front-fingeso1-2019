<template>
  <div class="all">
    {{test}}
    <div class="data_1">
      <input class="prop-name" type="text" placeholder="Nombre de propuesta">
      <input class="budget" type="number" placeholder="Presupuesto">
      <input class="tags" type="text" placeholder="Tag1, Tag2, Tag3">
    </div>
    <div class="select-client">
      <p>Seleccionar Cliente:</p>
    </div>
    <div class="data_2">
      <select id="select-client">
        <option v-for="client in clients.data" value=client>{{client.userId}}</option>
      </select>
    </div>
    <div class="submit"><input id="search" type="submit" value="Buscar"></div>
    <div class="data_3">
      <table class="table">
        <tr class="table_title">
          <th>Propuestas</th>
          <th>Cliente</th>
          <th>Empresa</th>
          <th>Fecha de inicio</th>
          <th>Estado</th>
        </tr>
        <tr class="table_childs" >
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
  import axios from 'axios'
    export default {
        name: "SearchProposal",
      data(){
          return{
            proposal_name: null,
            clients: null,
            company: null,
            date: null,
            tags: [],
            proposals: null,
            test: null
          }
      },
      mounted() {
        axios.get(`https://jsonplaceholder.typicode.com/posts/`)
          .then(rensponse => (this.clients = rensponse))
          .catch(e => {
            console.log(e)
          });
        axios.get(`http://206.189.42.243:8081/proposal/getall`)
          .then(rensponse => (this.test = rensponse.data[0]))
          .catch(e => {
            console.log(e)
          });
      }
    }
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
    text-align: center;
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
  .table{
    border-collapse: separate;
    border-color: #212120;
  }
  .table_title{
    background: #212120;
    border-radius: 25px;
    color: #DDDDDD;
    th{
      transition: 0.3s;
    }
    th:hover{
      color: #038e94;
    }
  }
  .table_childs{
    background: #DDDDDD;
    transition: 0.3s
  }
  .table_childs:hover {
    background-color: #b3b5b3;
  }
  .table{

  }

</style>
