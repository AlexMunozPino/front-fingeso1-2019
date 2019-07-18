<template>
    <div>
      <b-form-input v-model="companyName" placeholder="Nombre de la compañia"></b-form-input>
      <b-form-input v-model="contactName" placeholder="Nombre del cliente"></b-form-input>
      <b-form-input v-model="contactMail" placeholder="e-mail"></b-form-input>
      <b-form-input v-model="contactNumber" placeholder="Numero de contacto"></b-form-input>
      <b-form-input v-model="address" placeholder="Direccion"></b-form-input>
      <b-button @click="sendData">ENVIAR</b-button>
    </div>
</template>

<script>
  import axios from 'axios'
  import {rest_ip} from "../router/routes";
  export default {
    name: "CreateClient",
    data() {
      return {
        companyName: '',
        contactName: '',
        contactMail: '',
        contactNumber: '',
        address: ''
      }
    },

    methods: {
      sendData(){
        axios.post(rest_ip+'client/create', {
          nameOfCompany: this.companyName,
          nameOfContact: this.contactName,
          contactMail: this.contactMail,
          contactNumber: this.contactNumber,
          address: this.address
        })
          .then((response) => {
            console.log(response);
            this.$emit('created-client')
          });
      }
    }
  }


</script>

<style scoped>

</style>
