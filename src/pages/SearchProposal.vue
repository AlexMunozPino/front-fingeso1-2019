<template>
  <div class="all">
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
        <option v-for="client in this.clients" value=client>{{client.id}}</option>
      </select>
    </div>
    <div class="submit"><input id="search" type="submit" value="Buscar"></div>
    <div class="data_3">
      <table class="table">
        <tr class="table_title">
          <th>Nombre propuesta</th>
          <th>Cliente</th>
          <th>Empresa</th>
          <th>Fecha de inicio</th>
          <th>Estado</th>
        </tr>
        <tr v-for="proposal in this.proposals" class="table_childs" >
          <td >{{proposal.name}}</td>
          <td >{{clients.filter(c => (c.id == proposal.client_id))[0].nameOfContact}}</td>
          <td >{{clients.filter(c => (c.id == proposal.client_id))[0].nameOfCompany}}</td>
          <td> - </td>
          <td> - </td>
          <td> <input @click="go_to_detail(proposal.id)" type="button" value="Ver detalle"> </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { rest_ip } from "../router/routes";

  export default {
      name: "SearchProposal",
      data(){
          return{
            proposals: [],
            clients: []
          }
      },
      mounted() {
        this.retrieve_proposals();
        this.retrieve_clients();
      },
      methods: {
          go_to_detail(proposal_id){
            window.location.href = "/#/proposal-detail/"+proposal_id;
          },

          retrieve_proposals(){
            axios.get(rest_ip+"proposal/getall")
              .then(response => {this.proposals = response.data;})
              .catch(e => {console.log(e)});
          },

          retrieve_clients(){
            axios.get(rest_ip+"client/getall")
              .then(response => (this.clients = response.data))
              .catch(e => {console.log(e)});
          }
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
