<template>
  <div class="all">
    <div class="data_1">
      <input v-model="proposal_name" class="prop-name" id="prop-name" type="text" placeholder="Nombre de propuesta">
      <input v-model="budget" class="budget" id="budget" type="number" placeholder="Presupuesto">
      <input v-model="nonSplittedTags" @focusout="split_tags" class="tags" id="tags" type="text" placeholder="Tag1, Tag2, Tag3">
      <input v-model="description" class="description" id="description" type="text" placeholder="Descripcion">
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
       <p>Subir propuesta económica:</p>
      <input class="economic_proposal" type="file"><br>
      <p>Subir anexos: </p>
      <input class="annexed" multiple type="file"><br>
    </div>
    <div class="submit"><input @click="send_data" id="submit" type="submit" value="Ingresar"></div>
  </div>
</template>
<script>
import axios from 'axios'
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
      economic_file: null,
      annexed_files: [],
      clients: [],
      proposal_id: null
    }
  },
  mounted() {
    axios.get('http://localhost:8090/client/getall')
      .then(response => {this.clients = response.data; console.log(this.clients); this.client_id = this.clients[0]})
      .catch(e => {
        console.log(e)
      })
  },

  methods:{
    update_selected_client(){
      let drop_down_element = document.getElementById("select-client");
      console.log(drop_down_element.selectedIndex);
      this.client_id = this.clients[drop_down_element.selectedIndex].id;
      console.log(this.client_id);
    },

    split_tags(){
      this.tags = this.nonSplittedTags.split(/(?:,| )+/);
      console.log(this.tag);
    },

    set_admin_file(){
      let input_file = document.getElementById("admin_file_input");
      this.admin_file = input_file.files[0];
      console.log(this.admin_file);
    },

    send_data(){
      axios.post('http://localhost:8090/proposal/create', {
        name: this.proposal_name,
        client_id: this.client_id,
        tags: this.tag,
        budget: this.budget,
        description: this.description
      })
        .then((response) => {
          this.proposal_id = response.data.id;
          console.log(response.data.id);
          // Asociar el archivo administrativo de la propuesta
          this.associate_file(this.proposal_id, this.admin_file, "Administrativo");
        });
    },

    associate_file(proposal_id, file, fileType){
      var bodyFormData = new FormData();
      bodyFormData.append('id', proposal_id);
      bodyFormData.append('file', file);
      bodyFormData.append('fileType', fileType);
      axios.post('http://localhost:8090/proposal/attachFile', bodyFormData)
        .then((response) => {
          console.log(response.data);
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
