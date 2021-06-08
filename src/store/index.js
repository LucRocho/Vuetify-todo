import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

const db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    snackbar: {
      text: '',
      show: false
    },
    search: null,
    appTitle: process.env.VUE_APP_TITLE,
    sorting: false
  },

  mutations: {
    setSearch (state, value) {
      state.search = value
    },
    addTask (state, newTask) {
      state.tasks.push(newTask)
    },
    taskDone (state, id) {
      // console.log(id)
      const task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    updateTaskTitle (state, payload) {
      // console.log(payload)
      const task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    },
    updateTaskDueDate (state, payload) {
      // console.log(payload)
      const task = state.tasks.filter(task => task.id === payload.id)[0]
      task.dueDate = payload.dueDate
    },
    deleteTask (state, id) {
      // console.log(id)
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    setTasks (state, tasks) {
      state.tasks = tasks
    },
    showSnackbar (state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    hideSnackbar (state) {
      state.snackbar.show = false
    },
    toggleSorting (state) {
      state.sorting = !state.sorting
    }
  },

  actions: {
    addTask ({ state, commit }, newTaskTitle) {
      const task = state.tasks.filter(task => task.title.toLowerCase() === newTaskTitle.toLowerCase())
      if (task.length === 0) {
        const newTask = {
          id: Date.now(),
          title: newTaskTitle,
          done: false,
          dueDate: null
        }
        db.collection('tasks').add(newTask).then(() => {
          commit('addTask', newTask)
          commit('showSnackbar', 'Novo item adicionado')
        })
      } else {
        commit('showSnackbar', 'Item já incluído')
      }
    },
    recreateTasks ({ state, commit }) {
      db.collection('tasks').delete().then(() => {
        // console.log('deleted')
        const newTasks = []
        let newTask = {
          id: 1,
          title: 'Feijão',
          done: false,
          dueDate: null
        }
        newTasks.push(newTask)
        db.collection('tasks').add(newTask)
        newTask = {
          id: 2,
          title: 'Arroz',
          done: false,
          dueDate: null
        }
        newTasks.push(newTask)
        db.collection('tasks').add(newTask)
        state.tasks = newTasks
        commit('showSnackbar', 'Lista recriada')
      })
    },
    deleteTask ({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackbar', 'Item excluído')
      })
    },
    updateTaskTitle ({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackbar', 'Item alterado')
      })
    },
    updateTaskDueDate ({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
        commit('updateTaskDueDate', payload)
        commit('showSnackbar', 'Data alterada')
      })
    },
    getTasks ({ commit }) {
      db.collection('tasks').get().then(tasks => {
        // console.log(tasks)
        commit('setTasks', tasks)
      })
    },
    taskDone ({ state, commit }, id) {
      const task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('taskDone', id)
      })
    },
    setTasks ({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    }
  },

  getters: {
    tasksFiltered (state) {
      if (!state.search) {
        return state.tasks
      }
      return state.tasks.filter(task =>
        task.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  }
})
