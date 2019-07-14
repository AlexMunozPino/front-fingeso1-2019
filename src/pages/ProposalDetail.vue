<template>
    <div>
      <div>
        <h2>{{company}}: {{proposal}}, {{date}}</h2>
      </div>
      <div>
        <p>Cliente: {{client}}</p>
      </div>
      <div>
        <p>Tags: {{tag}}</p>
      </div>
      <div>
        <p>Presupuesto: {{budget}}</p>
      </div>
      <div class="data_3">
        <table class="table">
          <tr>
            <th>Tipo de Archivo</th>
            <th>Nombre</th>
            <th>Borrar</th>
          </tr>
          <tr>
            <td>1</td>
            <td>1</td>
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
    export default {
        name: "ProposalDetail",
      data() {
          return {
            tags: ['holo','holo1','asd'],
            tag: "",
            company: "OWO",
            proposal: "testing",
            date: "2019-01-21",
            admin: null,
            technician: null,
            annexed: null,
            client: "UwU",
            budget: 100000,
          }
      },
      created() {
        let i = 0;
        for(i = 0; i< this.tags.length; i++){
          this.tag = this.tag.concat(this.tags[i]);
          if (i < this.tags.length - 1) {
            this.tag = this.tag.concat(", ");
          }
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
