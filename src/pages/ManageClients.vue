<template>
    <div>
      <div class="data_3">
        <table class="table" style="width:100%">
          <tr class="table_title">
            <th>Compañia</th>
            <th>Nombre</th>
            <th>E-Mail</th>
            <th>Número</th>
            <th>Dirección</th>

          </tr>
          <tr class="table_childs" v-for="client in clients">
            <td>{{client.nameOfCompany}}</td>
            <td>{{client.nameOfContact}}</td>
            <td>{{client.contactMail}}</td>
            <td>{{client.contactNumber}}</td>
            <td>{{client.address}}</td>
            <td><b-button>Editar</b-button></td>
            <td><b-button class="delete-client" @click="deleteClient(client.id)">Eliminar</b-button></td>
          </tr>
        </table>
      </div>
      <div class="end">
        <div class="button">
        <create-client v-on:created-client="createdClient" v-if="creatingClient" ></create-client>
        <b-button class="new-client" v-if="btn_client" @click="toggleCreateClient">Nuevo cliente...</b-button>
        </div>
      </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import CreateClient from "./CreateClient";
    export default {
        name: "ManageClients",
      components: {CreateClient},
      data(){
          return{
            clients: [],
            creatingClient: false,
            btn_client: true,
          }
      },

      mounted(){
        this.retrieveClients();
      },

      methods: {
          retrieveClients(){
            axios.get("http://localhost:8090/client/getall")
              .then((response) => {
                this.clients = response.data;
                console.log("CLIENTES CARGADOS");
                console.log(response.data);
              });
          },

          createdClient(){
            this.retrieveClients();
            this.toggleCreateClient();
          },

          toggleCreateClient(){
            this.btn_client = false;
            if (this.creatingClient){
              this.creatingClient = false;
            } else {
              this.creatingClient = true;
            }
          },

          deleteClient(id){
            console.log("ID DE CLIENTE A ELIMINAR:" + id);
            axios.get("http://localhost:8090/client/delete?client_id="+id)
              .then((response) => {
                alert(response.data);
                this.retrieveClients();
              });
          }
      }
    }
</script>

<style lang="scss">
  div{
    text-align: center  ;
  }
  .data_3{
    margin-bottom: 15px;
  }
  .button{
    align-items: center;
    flex-grow: 1;
  }
  .end{
    align-items: center;
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
</style>
