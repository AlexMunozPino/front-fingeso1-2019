<template>
  <div class="all">
    <div class="data_1">
      <input class="prop-name" type="text" placeholder="Nombre de propuesta">
      <input class="budget" type="number" placeholder="Presupuesto">
      <input class="tags" type="text" placeholder="Tag1, Tag2, Tag3">
    </div>
    <div class="select-client">
      <p>Seleccionar Cliente:</p>
    </div>
    <div class="data_2">
    </div>
    <div class="data_3">
      <!-- Aquí va request para la tabla-->
    </div>
    <div class="submit"><input id="search" type="submit" value="Buscar"></div>
  </div>
</template>

<script>
    export default {
        name: "SearchProposal",
      data(){
          return{
            proposal_name: null,
            client: null,
            company: null,
            date: null,
            tags: [],
            proposals: null
          }
      },
      mounted() {
          // Aquí va el Get de las propuestas de la API
      }
    }
</script>

<style scoped>
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
