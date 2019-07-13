<template>
    <div>
      <div>
        <h2>{{company}}: {{proposal}}, {{date}}</h2>
      </div>
      <div>
        <p>Cliente: {{client}}</p>
      </div>
      <div v-for="tag in tags">
        {{tag}},
      </div>

    </div>
</template>

<script>
    export default {
        name: "ProposalDetail",
      data() {
          return {
            tags: ['holo','holo1','asd'],
            company: null,
            proposal: null,
            date: null,
            admin: null,
            technician: null,
            annexed: null,
            client: null,
            budget: null,
          }
      }
    }
</script>

<style scoped>

</style>
