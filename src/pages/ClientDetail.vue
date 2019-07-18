<template>
    <div>
      <div id="defaultDiv" style="display:block">
        <h2>{{client.nameOfContact}}: {{client.nameOfCompany}}</h2>
        <p>Número: {{client.contactNumber}}</p>
        <p>Email: {{client.contactMail}}</p>
        <p>Dirección: {{client.address}}</p>
      </div>
      <!-- Bloque oculto para modo edicion -->
      <div id="inputDiv" style="display: none">
        <h2 style="display:inline-block"><input id="nameOfContactInput" type="text" v-model="client.nameOfContact"> : <input id="nameOfCompanyInput" type="text" v-model="client.nameOfCompany"></h2>
        <div style="display: block">
          <p>Número: <input v-model="client.contactNumber" type="text"/></p>
          <p>Email: <input v-model="client.contactMail" type="text"/></p>
          <p>Direccion: <input v-model="client.address" type="text"/></p>
        </div>
      </div>
      <div  id="editDiv">
        <input @click="toggle_editable()" type="button" value="Editar">
      </div>

      <div id="editingDiv" style="display:none">
        <input @click="cancel_button_pressed()" type="button" value="Cancelar">
        <input @click="save_button_pressed()" type="button" value="Guardar">
      </div>
      <div class="data_3">
        <table class="table">
          <tr>
            <th>Nombre</th>
            <th>Presupuesto</th>
            <th>Acción</th>
<!--            <th>Borrar</th>-->
          </tr>
          <tr v-for="p in proposals">
            <td> {{p.name}} </td>
            <td> {{p.budget}} </td>
            <td><input @click="go_to_proposal_detail(p.id)" type="submit" value="Detalle"></td>
<!--            <td><input @click="delete_file(f.id)" type="submit" value="Borrar"></td>-->
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
      import axios from 'axios';
      import {rest_ip} from "../router/routes";

      export default {
        name: "ClientDetail",
      data(){
          return{
            editing: false,
            original_client: "",
            client: "",
            proposals: []
          }
      },

      mounted(){
        this.retrieve_client();
      },
      methods: {
          go_to_proposal_detail(proposal_id){
            window.location.href = "/#/proposal-detail/"+proposal_id;
          },

          retrieve_client(client_id){
            axios.get(rest_ip+"client/get?Client_id="+this.$route.params.id)
              .then((response) => {
                this.client = response.data;
                this.original_client = Object.assign({}, response.data);
                this.retrieve_client_proposals(this.client);
              });
          },

          toggle_editable(){
            if (this.editing){
              document.getElementById("inputDiv").style.display="none";
              document.getElementById("defaultDiv").style.display="block";
              document.getElementById("editingDiv").style.display="none";
              document.getElementById("editDiv").style.display="block";
              this.editing = false
            } else {
              document.getElementById("inputDiv").style.display="block";
              document.getElementById("defaultDiv").style.display="none";
              document.getElementById("editingDiv").style.display="block";
              document.getElementById("editDiv").style.display="none";
              this.editing = true;
            }
          },

          cancel_button_pressed(){
            this.client = Object.assign({}, this.original_client);
            this.toggle_editable();
          },

          save_button_pressed(){
            this.toggle_editable();
            this.original_client = Object.assign({}, this.client);
            this.update_client();
          },

          retrieve_client_proposals(client){
            axios.get(rest_ip+"proposal/getProposalsMatchingUserId?client_id="+client.id)
              .then((response) => {
                this.proposals = response.data;
              });
          },

          update_client(){
            axios.post(rest_ip+"client/update", {
              id: this.client.id,
              nameOfCompany: this.client.nameOfCompany,
              nameOfContact: this.client.nameOfContact,
              contactMail: this.client.contactMail,
              contactNumber: this.client.contactNumber,
              address: this.client.address,
            })
              .then((response) => {alert("Cliente actualizado"); console.log(response.data)})
          }
      }
    }
</script>

<style scoped>
  div{
    text-align: center;
  }
</style>
