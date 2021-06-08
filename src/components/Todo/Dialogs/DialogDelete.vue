<template>
  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Excluir?
        </v-card-title>
        <v-card-text>Esse registro será excluído.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Não
          </v-btn>
          <v-btn
            @click="$store.dispatch('deleteTask', task.id)"
            color="red darken-1"
            text
          >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['task']
}
</script>

<style>

</style>
