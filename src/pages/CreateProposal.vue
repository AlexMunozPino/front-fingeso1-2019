<template>
  <div class="all">
    <div class="data_1">
      <input v-model="proposal_name" class="prop-name" id="prop-name" type="text" placeholder="Nombre de propuesta">
      <input v-model="budget" class="budget" id="budget" type="number" placeholder="Presupuesto">
      <input v-model="nonSplittedTags" @focusout="split_tags" class="tags" id="tags" type="text" placeholder="Tag1, Tag2, Tag3">
      <input style="display: none" id="date_input" type="date"/>
    </div>
    <div>
      <textarea v-model="description" class="description" id="description" cols="65" placeholder="Descripcion"></textarea>
    </div>
    <div class="select-client">
      <p>Seleccionar Cliente:</p>
    </div>
    <div class="data_2">
      <select @change="update_selected_client" id="select-client">
        <option v-for="client in clients" value="client">{{client.nameOfContact}}, {{client.nameOfCompany}}</option>
      </select>
    </div>
    <div class="data_3">
      <p>Subir propuesta administrativa:</p>
      <input id="admin_file_input" @change="set_admin_file()" class="admin_proposal" type="file">
       <p>Subir propuesta técnica:</p>
      <input id="tech_file_input" @change="set_tech_file()" type="file"><br>
    </div>
    <div class="submit"><input @click="send_data" id="submit" type="submit" value="Ingresar"></div>
  </div>
</template>
<script>
import axios from 'axios'
import {rest_ip} from "../router/routes";
export default {
  data() {
    return {
      proposal_name: null,
      client_id: null,
      tag: [],
      budget: null,
      description: null,
      nonSplittedTags: null,
      admin_file: null,
      tech_file: null,
      annexed_files: [],
      clients: [],
      proposal_id: null
    }
  },
  mounted() {
    document.getElementById("date_input").valueAsDate = new Date();
    this.test();
    axios.get('http://localhost:8090/client/getall')
      .then(response => {this.clients = response.data; console.log(this.clients); this.client_id = this.clients[0].id})
      .catch(e => {
        console.log(e)
      })
  },

  methods:{
    test(){
      console.log(document.getElementById("date_input").value);
    },

    update_selected_client(){
      let drop_down_element = document.getElementById("select-client");
      console.log(drop_down_element.selectedIndex);
      this.client_id = this.clients[drop_down_element.selectedIndex].id;
      console.log(this.client_id);
    },

    split_tags(){
      if (this.nonSplittedTags){
        this.tags = this.nonSplittedTags.split(/(?:,| )+/);
        console.log(this.tag);
      }
    },

    set_admin_file(){
      let input_file = document.getElementById("admin_file_input");
      this.admin_file = input_file.files[0];
    },

    set_tech_file(){
      let tech_input_file = document.getElementById("tech_file_input");
      this.tech_file = tech_input_file.files[0];
    },

    send_data(){
      axios.post(rest_ip+'proposal/create', {
        name: this.proposal_name,
        client_id: this.client_id,
        tags: this.tag,
        budget: this.budget,
        description: this.description,
        date: document.getElementById("date_input").value
      })
        .then((response) => {
          this.proposal_id = response.data.id;
          console.log(response.data.id);
          // Asociar el archivo administrativo de la propuesta
          // this.associate_file(this.proposal_id, this.admin_file, "Administrativo");
          // Asociar el archivo tecnico a la propuesta
          // this.associate_file(this.proposal_id, this.tech_file, "Tecnico");
          this.associate_files();
        });
    },

    associate_file(proposal_id, file, fileType){
      var bodyFormData = new FormData();
      bodyFormData.append('id', proposal_id);
      bodyFormData.append('file', file);
      bodyFormData.append('fileType', fileType);
      axios.post(rest_ip+'proposal/attachFile', bodyFormData)
        .then((response) => {
          console.log(response.data);
        });
    },

    associate_files(){
      var bodyFormData = new FormData();
      bodyFormData.append('id', this.proposal_id);
      bodyFormData.append('file', this.admin_file);
      bodyFormData.append('fileType', "Administrativo");
      axios.post(rest_ip+'proposal/attachFile', bodyFormData)
        .then((response) => {
          console.log(response.data)
          var bodyFormData = new FormData();
          bodyFormData.append('id', this.proposal_id);
          bodyFormData.append('file', this.tech_file);
          bodyFormData.append('fileType', "Tecnico");
          axios.post(rest_ip+'proposal/attachFile', bodyFormData)
            .then((response) => {
              console.log(response.data);
              alert("Propuesta creada exitosamente")
            });
        });
    }
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
