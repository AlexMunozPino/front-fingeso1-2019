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
      <div>
        <input @change="set_input_file" type="file" id="file_input" />
        <input @click="attach_file(proposal.id, new_file, aux)" type="submit" value="Añadir"/>
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
    </div>

</template>

<script>
  import axios from 'axios'
  import { rest_ip } from "../router/routes";
  export default {
        name: "ProposalDetail",
      data() {
          return {
            aux: "Anexo",
            proposal: "",
            tag: "",
            date: "",
            admin_file_name: "-",
            technician_file_name: "",
            annexed_file_name: "",
            files: [],
            new_file: null,
            client: ""
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
        console.log(rest_ip+"proposal/get?proposal_id="+this.proposal_id);
        axios.get(rest_ip+"/proposal/get?proposal_id="+this.proposal_id
        ).then((response) => {
          this.proposal = response.data;
          // Obtener los documentos
          for (let i=0; i<this.proposal.asociatedFiles.length; i++){
            this.files.push(this.proposal.asociatedFiles[i]);
          }
          // Obtener al cliente asociado
          this.retrieve_client();
        });
      },
      methods: {
          retrieve_client(){
            axios.get(rest_ip+"/client/get?Client_id="+this.proposal.client_id
            ).then((response) => {
              this.client = response.data;
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
