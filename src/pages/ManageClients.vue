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
        <table style="width:100%">
          <tr>
            <th>Compañia</th>
            <th>Nombre</th>
            <th>Mail</th>
            <th>Numero</th>
            <th>Direccion</th>

          </tr>
          <tr v-for="client in clients">
            <td>{{client.nameOfCompany}}</td>
            <td>{{client.nameOfContact}}</td>
            <td>{{client.contactMail}}</td>
            <td>{{client.contactNumber}}</td>
            <td>{{client.address}}</td>
            <td><b-button>Editar</b-button></td>
            <td><b-button @click="deleteClient(client.id)">Eliminar</b-button></td>
          </tr>
        </table>
      </div>
      <create-client v-on:created-client="createdClient" v-if="creatingClient" ></create-client>
      <b-button @click="toggleCreateClient">Nuevo cliente...</b-button>
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
            creatingClient: false
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

<style scoped>
  div{
    text-align: center  ;
  }
</style>
