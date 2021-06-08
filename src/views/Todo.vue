<template>
  <div class="home">
    <field-add-task />
    <list-tasks
      v-if="$store.state.tasks.length"
    />
    <no-task
      v-else
    />
    <button-done-sorting
      v-if="$store.state.sorting"
    />
  </div>
</template>

<script>
export default {
  name: 'Todo',
  components: {
    'field-add-task': require('./../components/Todo/FieldAddTask').default,
    'list-tasks': require('./../components/Todo/ListTasks').default,
    'no-task': require('./../components/Todo/NoTask').default,
    'button-done-sorting': require('./../components/Todo/ButtonDoneSorting').default
  }
}
</script>
