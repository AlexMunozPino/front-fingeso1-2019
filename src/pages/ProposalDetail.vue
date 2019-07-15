<template>
    <div>
      <div>
        <h2>{{client.nameOfCompany}}: {{proposal.name}}, {{date}}</h2>
      </div>
      <div>
        <p>Cliente: {{client.nameOfContact}}</p>
      </div>
      <div>
        <p>Tags: {{tag}}</p>
      </div>
      <div>
        <p>Presupuesto: {{proposal.budget}}</p>
      </div>
      <div>
        <p>Descripcion: {{proposal.description}}</p>
      </div>
      <div class="data_3">
        <table class="table">
          <tr>
            <th>Tipo de Archivo</th>
            <th>Nombre</th>
            <th>Borrar</th>
          </tr>
          <tr>
            <td v-if="admin_file_name"> Administrativo </td>
            <td>{{admin_file_name}}</td>
            <td><input type="submit" value="Borrar"></td>
          </tr>
        </table>
      </div>
      <div>
        <input class="prop-name" id="prop-name" type="text" placeholder="Nombre de propuesta">
        <input class="budget" id="budget" type="number" placeholder="Presupuesto">
        <input class="tags" id="tags" type="text" placeholder="Tag1, Tag2, Tag3">
      </div>
      <div>
        <div>
          <select id="select-client">
            <option v-for="" value=client>holi</option>
          </select>
        </div>
      </div>
      <div>
        <input class="button" type="submit" value="Modificar">
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import { rest_route } from "../router/routes";

  export default {
        name: "ProposalDetail",
      data() {
          return {
            proposal: "",
            tag: "",
            date: "",
            admin_file_name: "",
            technician_file_name: "",
            annexed_file_name: "",
            client: "",
          }
      },
      created() {
        this.proposal_id = this.$route.params.id;
        console.log(this.proposal_id);
        /*let i = 0;
        for(i = 0; i< this.tags.length; i++){
          this.tag = this.tag.concat(this.tags[i]);
          if (i < this.tags.length - 1) {
            this.tag = this.tag.concat(", ");
          }
        }*/
        // Obtener la propuesta
        console.log(rest_route+"proposal/get?proposal_id="+this.proposal_id);
        axios.get(rest_route+"/proposal/get?proposal_id="+this.proposal_id
        ).then((response) => {
          this.proposal = response.data;
          // Obtener al cliente asociado
          this.retrieve_client();
          // Obtener el documento administrativo
          console.log(this.proposal);
          for (let i=0; i<this.proposal.asociatedFiles.length; i++){
            if (this.proposal.asociatedFiles[i].type.localeCompare("Administrativo")){
              this.admin_file_name = this.proposal.asociatedFiles[i].fileName;
            }
          }
        });
      },
      methods: {
          retrieve_client(){
            axios.get(rest_route+"/client/get?Client_id="+this.proposal.client_id
            ).then((response) => {
              this.client = response.data;
            });
          }
      }

    }
</script>

<style scoped>
  div{
    align-content: center;
    text-align: center;
  }
  .button{
    margin-top: 10px;
  }
</style>
