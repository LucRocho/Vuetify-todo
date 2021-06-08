<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
    >
    <v-date-picker
        v-model="date"
        scrollable
        locale="pt-BR"
    >
        <v-spacer></v-spacer>
        <v-btn
        @click="saveDueDateNull"
        text
        color="primary"
        >
        Reset
        </v-btn>
        <v-btn
        @click="$emit('close')"
        text
        color="primary"
        >
        Cancelar
        </v-btn>
        <v-btn
        @click="saveDueDate"
        text
        color="primary"
        >
        OK
        </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      date: null
    }
  },
  props: ['task'],
  mounted () {
    if (this.task.dueDate) {
      this.date = this.task.dueDate
    }
  },
  methods: {
    saveDueDate () {
      const payload = {
        id: this.task.id,
        dueDate: this.date
      }
      this.$store.dispatch('updateTaskDueDate', payload)
      this.$emit('close')
    },
    saveDueDateNull () {
      const payload = {
        id: this.task.id,
        dueDate: null
      }
      this.dueDate = null
      this.$store.dispatch('updateTaskDueDate', payload)
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
