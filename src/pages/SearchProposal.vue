<template>
  <div class="all">
    <div class="data_1">
      <input v-model="search" class="prop-name" type="text" placeholder="Nombre de propuesta">
      <input class="budget" v-model="min_budget" type="number" placeholder="Presupuesto [min]">
      <input class="budget" v-model="max_budget" type="number" placeholder="Presupuesto [max]">
      <!--<input class="tags" type="text" placeholder="Tag1, Tag2, Tag3">-->
      <select v-model="selected_client_id" id="select-client" style="margin-bottom: 13px">
        <option>Todos los clientes</option>
        <option v-for="client in this.clients" :value="client.id">{{client.nameOfContact}}, {{client.nameOfCompany}}</option>
      </select>
    </div>
    <div class="data_3">
      <table class="table">
        <tr class="table_title">
          <th>Nombre propuesta</th>
          <th>Cliente</th>
          <th>Empresa</th>
          <th>Presupuesto</th>
          <th>Fecha de inicio</th>
<!--          <th>Estado</th>-->
          <th>Acción</th>
        </tr>
        <tr v-for="proposal in this.filteredProposals" class="table_childs" >
          <td >{{proposal.name}}</td>
          <td >{{clients.filter(c => (c.id == proposal.client_id))[0].nameOfContact}}</td>
          <td >{{clients.filter(c => (c.id == proposal.client_id))[0].nameOfCompany}}</td>
          <td >{{proposal.budget}} </td>
          <td> - </td>
<!--          <td> - </td>-->
          <td> <input @click="go_to_detail(proposal.id)" type="button" value="Ver detalle"> </td>
        </tr>

        <tr></tr>
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
            search: "",
            selected_client_id: "Todos los clientes",
            min_budget: "",
            max_budget: "",
            all_proposals: [],
            clients: []
          }
      },
      mounted() {
        this.retrieve_proposals();
        this.retrieve_clients();
        document.getElementById("select-client").selectedIndex = 0;
      },
      methods: {
          go_to_detail(proposal_id){
            window.location.href = "/#/proposal-detail/"+proposal_id;
          },

          retrieve_proposals(){
            axios.get(rest_ip+"proposal/getall")
              .then(response => {
                this.all_proposals = response.data;
              })
              .catch(e => {console.log(e)});
          },

          retrieve_clients(){
            axios.get(rest_ip+"client/getall")
              .then(response => (this.clients = response.data))
              .catch(e => {console.log(e)});
          },

          between_budget(p){
            if (!this.min_budget && !this.max_budget) return true;
            else if (this.min_budget && !this.max_budget) return p.budget >= this.min_budget;
            else if (!this.min_budget && this.max_budget) return p.budget <= this.max_budget;
            else return p.budget >= this.min_budget && p.budget <= this.max_budget;
          }
      },
      computed: {
        filteredProposals() {
          return this.all_proposals.filter((p) => {
            if (this.selected_client_id.localeCompare("Todos los clientes") == 0){
              console.log(this.min_budget);
              if (this.min_budget && this.max_budget) console.log("trick")
              return (
                p.name.toLowerCase().includes(this.search.toLowerCase())
                //&& p.budget >= this.min_budget
                //&& p.budget <= this.max_budget
                && this.between_budget(p)
              );
            } else {
              return (
                p.name.toLowerCase().includes(this.search.toLowerCase())
                && p.client_id.localeCompare(this.selected_client_id) == 0
                //&& p.budget >= this.min_budget
                //&& p.budget <= this.max_budget
                && this.between_budget(p)
              );
            }
          });
        }
      },
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
