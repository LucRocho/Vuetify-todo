<template>
  <v-btn
    @click="$store.dispatch('recreateTasks')"
    class="button-recreate-tasks"
    color="primary"
  >
      Recriar lista de compras
  </v-btn>
</template>

<script>
export default {

}
</script>

<style lang="sass">
  .button-recreate-tasks
    position: fixed
    bottom: 20px
    left: 50%
    transform: translateX(-50%)

</style>
