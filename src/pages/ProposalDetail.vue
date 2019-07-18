<template>
    <div>
      <div id="companyAndProposalDiv">
        <h2>{{client.nameOfCompany}} : {{proposal.name}}, {{date}}</h2>
      </div>
      <!-- Bloque oculto para modo edicion -->
      <div id="companyAndProposalInputDiv" style="display:none">
        <h2>{{client.nameOfCompany}} : <input id="proposalNameInput" type="text" v-model="proposal.name"> </h2>
      </div>
      <div>
        <p>Cliente: {{client.nameOfContact}}</p>
      </div>
      <div>
        <p>Mail: <a v-bind:href="client_url_mail">{{client.contactMail}}</a>, Teléfono: {{client.contactNumber}}</p>
      </div>
      <div id="tagsDiv">
        <p>Tags: {{proposal_tags}} </p>
      </div>
      <!-- Bloque oculto para modo edicion -->
      <div id="tagsInputDiv" style="display:none">
        <p>Tags: <input id="tagsInput" type="text" v-model="proposal_tags"></p>
      </div>
      <div id="budgetDiv">
        <p>Presupuesto: {{proposal.budget}}</p>
      </div>
      <!-- Bloque oculto para modo edicion -->
      <div id="budgetInputDiv" style="display:none">
        <p>Presupuesto: <input id="budgetInput" type="text" v-model="proposal.budget"></p>
      </div>
      <div id="descriptionDiv">
        <p>Descripcion:</p>
        <textarea disabled v-model="proposal.description"></textarea>
      </div>
      <!-- Bloque oculto para modo edicion -->
      <div id="descriptionInputDiv" style="display:none">
        <p>Descripcion:</p>
        <textarea id="descriptionInput" v-model="proposal.description"></textarea>
      </div>
      <div class="data_3">
        <table class="table">
          <tr>
            <th>Tipo de Archivo</th>
            <th>Nombre</th>
            <th></th>
            <th></th>
            <!--<th>Descargar</th>
            <th>Borrar</th>-->
          </tr>
          <tr v-for="f in files">
            <td> {{f.type}} </td>
            <td> {{f.fileName}}.{{f.extension}} </td>
            <td><input @click="save_file(f.file.data, f.fileName, f.extension)" type="submit" value="Descargar"></td>
            <td><input @click="delete_file(f.id)" type="submit" value="Borrar"></td>
          </tr>
        </table>
      </div>
      <div class="data_3" style="margin-top: 30px;">
        <input @change="set_input_file" type="file" id="file_input" />
        <select @change="update_file_type()" id="fileTypeInput">
          <option> Administrativo </option>
          <option> Técnico </option>
          <option> Anexo </option>
        </select>
        <input @click="attach_file(proposal.id, new_file, file_type)" type="submit" value="Añadir"/>
      </div>
      <div  id="editDiv">
        <input @click="toggle_editable()" type="button" value="Editar">
      </div>

      <div id="editingDiv" style="display:none">
        <input @click="cancel_button_pressed()" type="button" value="Cancelar">
        <input @click="save_button_pressed()" type="button" value="Guardar">
      </div>

    </div>

</template>

<script>
  import axios from 'axios'
  import { rest_ip } from "../router/routes";
  export default {
        name: "ProposalDetail",
      data() {
          return {
            file_type: "Administrativo",
            original_proposal: "",
            proposal: "",
            proposal_tags: "",
            date: "",
            admin_file_name: "-",
            technician_file_name: "",
            annexed_file_name: "",
            files: [],
            new_file: null,
            client: "",
            client_url_mail: "mailto:",
            editing: false
          }
      },

      created() {
        this.proposal_id = this.$route.params.id;
        console.log(this.proposal_id);
        // Obtener la propuesta
        console.log(rest_ip+"proposal/get?proposal_id="+this.proposal_id);
        axios.get(rest_ip+"/proposal/get?proposal_id="+this.proposal_id
        ).then((response) => {
          this.proposal = response.data;
          this.original_proposal = Object.assign({}, response.data);
          // Obtener los documentos
          if (this.proposal.asociatedFiles != null){
            for (let i=0; i<this.proposal.asociatedFiles.length; i++){
              this.files.push(this.proposal.asociatedFiles[i]);
            }
          }
          // Obtener los tag
          if (this.proposal.tags != null){
            for (let i=0; i<this.proposal.tags.length; i++){
              if (i == this.proposal.tags.length-1){
                this.proposal_tags += this.proposal.tags[i];
              } else {
                this.proposal_tags += this.proposal.tags[i] + ", ";
              }
            }
          }
          // Obtener al cliente asociado
          this.retrieve_client();
        });
      },
      methods: {
          update_file_type(){
            let dropdownElement = document.getElementById("fileTypeInput");
            switch(dropdownElement.selectedIndex){
              case 0:
                this.file_type = "Administrativo";
                break;
              case 1:
                this.file_type = "Tecnico";
                break;
              case 2:
                this.file_type = "Anexo";
                break;
            }

            console.log(this.file_type);
          },

          toggle_editable(){
            if (this.editing){
              this.editing = false;
              document.getElementById("companyAndProposalInputDiv").style.display = "none";
              document.getElementById("companyAndProposalDiv").style.display = "inline-block";
              document.getElementById("tagsInputDiv").style.display = "none";
              document.getElementById("tagsDiv").style.display = "block";
              document.getElementById("budgetInputDiv").style.display = "none";
              document.getElementById("budgetDiv").style.display = "block";
              document.getElementById("descriptionInputDiv").style.display = "none";
              document.getElementById("descriptionDiv").style.display = "block";
              document.getElementById("editingDiv").style.display = "none";
              document.getElementById("editDiv").style.display = "block"
            } else {
              this.editing = true;
              document.getElementById("companyAndProposalInputDiv").style.display = "inline-block";
              document.getElementById("companyAndProposalDiv").style.display = "none";
              document.getElementById("tagsInputDiv").style.display = "block";
              document.getElementById("tagsDiv").style.display = "none";
              document.getElementById("budgetInputDiv").style.display = "block";
              document.getElementById("budgetDiv").style.display = "none";
              document.getElementById("descriptionInputDiv").style.display = "block";
              document.getElementById("descriptionDiv").style.display = "none";
              document.getElementById("editingDiv").style.display = "inline-block";
              document.getElementById("editDiv").style.display = "none"
            }

          },

          print(msg){
            console.log(msg);
          },

          edit_button_pressed(){
            this.toggle_editable();
          },

          save_button_pressed(){
            this.update_proposal();
            this.original_proposal = Object.assign({}, this.proposal);
            this.toggle_editable();
          },

          cancel_button_pressed(){
            this.toggle_editable();
            this.proposal = Object.assign({}, this.original_proposal);
            console.log(this.original_proposal.description);
          },
          retrieve_client(){
            axios.get(rest_ip+"/client/get?Client_id="+this.proposal.client_id
            ).then((response) => {
              this.client = response.data;
              this.client_url_mail += this.client.contactMail;
              console.log(this.client_url_mail);
            });
          },

          save_file(data, name, extension) {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            var byteCharacters = atob(data);

            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            var blob = new Blob([byteArray]),
              url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = name + "." + extension;
            a.click();
            window.URL.revokeObjectURL(url);
          },

          set_input_file(){
            let input_file = document.getElementById("file_input");
            this.new_file = input_file.files[0];
          },

          attach_file(proposal_id, file, fileType){
            var bodyFormData = new FormData();
            bodyFormData.append('id', proposal_id);
            bodyFormData.append('file', file);
            bodyFormData.append('fileType', fileType);
            axios.post(rest_ip+'proposal/attachFile', bodyFormData)
              .then((response) => {
                //console.log(response.data);
                this.files.push(response.data);
              });
          },

          delete_file(file_id){
            axios.get(rest_ip+"proposal/deleteFile?proposal_id="+this.proposal.id+"&file_id="+file_id
            ).then((response) => {
              console.log(response.data);
              // Eliminar el archivo de la lista local
              this.files = this.files.filter((f) => f.id != file_id)
            });
          },

          update_proposal(){
            axios.post(rest_ip+"proposal/edit", {
              id: this.proposal.id,
              name: this.proposal.name,
              client_id: this.client.id,
              tags: this.proposal_tags.split(/(?:,| )+/),
              budget: this.proposal.budget,
              description: this.proposal.description
            }).then((response) => {
              console.log(response.data);
              alert("Datos actualizados");
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
