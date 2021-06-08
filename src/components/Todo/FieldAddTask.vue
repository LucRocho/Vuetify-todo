<template>
  <v-text-field
    v-model="newTaskTitle"
    @keyup.enter = "addTask"
    class="pa-3"
    outlined
    label="Novo item"
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon
        @click="addTask"
        color="primary"
        :disabled="taskTitleInvalid"
      >
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data () {
    return {
      newTaskTitle: ''
    }
  },
  computed: {
    taskTitleInvalid () {
      return (!this.newTaskTitle)
    }
  },
  methods: {
    addTask () {
      if (!this.taskTitleInvalid) {
        this.$store.dispatch('addTask', this.newTaskTitle)
        this.newTaskTitle = ''
      }
    }
  }
}
</script>

<style>

</style>
