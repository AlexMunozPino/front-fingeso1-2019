<template>
  <div>
    <b-form-input v-model="text" placeholder="Nombre de usuario"></b-form-input>
    <div class="mt-2">Usuario: {{ text }}</div>
    <b-form-input v-model="text2" placeholder="Nombre de trabajador"></b-form-input>
    <div class="mt-2">Valor Trabajador: {{ text2 }}</div>
    <div>
      <b-table class="table" striped hover :items="items"></b-table>
    </div>

    <button type="button" class="btn btn-danger">Eliminar</button>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        text: 'hola',
        text2: '',
        boton: '',
        items: [
          { Usuario: 40, Trabajo: 'Dickerson', Perfil: 'Macdonald',Accion: 'as' },
          { Usuario: 21, Trabajo: 'Larsen', Perfil: 'Shaw' },
          { Usuario: 89, Trabajo: 'Geneva', Perfil: 'Wilson' },
          { Usuario: 38, Trabajo: 'Jami', Perfil: 'Carney' }
        ]
      }
    }
  }
</script>

<style lang="scss">
  .table{
    margin-top:10px;
    ;
  }
  $primary: #000000 !default;
  $secondary: #000000 !default;
  $success: #000000 !default;
  $info: #000000 !default;
  $warning: #000000 !default;
  $danger: #f12313 !default;
  $light: #000000 !default;
  $dark: #000000 !default;
</style>
