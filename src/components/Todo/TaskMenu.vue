<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          icon
          v-bind="attrs"
          v-on="on"
      >
          <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-delete
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete=false"
    />
    <dialog-edit
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit=false"
    />
    <dialog-due-date
      v-if="dialogs.dueDate"
      :task="task"
      @close="dialogs.dueDate=false"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogs: {
        delete: false,
        edit: false,
        dueDate: false
      },
      items: [
        {
          title: 'Alterar',
          icon: 'mdi-pencil',
          click () {
            // console.log('edit')
            this.dialogs.edit = true
          }
        },
        {
          title: 'Data',
          icon: 'mdi-calendar',
          click () {
            // console.log('due date')
            this.dialogs.dueDate = true
          }
        },
        {
          title: 'Excluir',
          icon: 'mdi-delete',
          click () {
            // console.log('delete')
            this.dialogs.delete = true
          }
        },
        {
          title: 'Alterar ordem',
          icon: 'mdi-drag-horizontal-variant',
          click () {
            if (!this.$store.state.search) {
              this.$store.commit('toggleSorting')
            } else {
              this.$store.commit('showSnackbar', 'Não se pode ordenar quando a pesquisa está preenchida')
            }
          }
        }
      ]
    }
  },
  methods: {
    handleClick (index) {
      this.items[index].click.call(this)
    }
  },
  components: {
    'dialog-delete': require('./Dialogs/DialogDelete').default,
    'dialog-due-date': require('./Dialogs/DialogDueDate').default,
    'dialog-edit': require('./Dialogs/DialogEdit').default
  },
  props: ['task']
}
</script>

<style>

</style>
