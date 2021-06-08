<template>
  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Editar?
        </v-card-title>
        <v-card-text>
          Novo título:
          <v-text-field
            v-model="taskTitle"
            @keyup.enter="saveTask"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Cancelar
          </v-btn>
          <v-btn
            @click="saveTask"
            :disabled="taskTitleInvalid"
            color="red darken-1"
            text
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['task'],
  data () {
    return {
      taskTitle: null
    }
  },
  computed: {
    taskTitleInvalid () {
      return (!this.taskTitle || this.taskTitle === this.task.title)
    }
  },
  mounted () {
    this.taskTitle = this.task.title
  },
  methods: {
    saveTask () {
      if (!this.taskTitleInvalid) {
        const payload = {
          id: this.task.id,
          title: this.taskTitle,
          done: this.task.done
        }
        this.$store.dispatch('updateTaskTitle', payload)
        this.$emit('close')
        this.$vuetify.goTo(0, { duration: 0 })
      }
    }
  }
}
</script>

<style>

</style>
