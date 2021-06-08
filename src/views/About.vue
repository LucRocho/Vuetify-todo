<template>
  <div class="about pa-6">
    <h1>About {{$store.state.appTitle}}</h1>
    <p>
      Lista de compras desenvolvida no curso de Vuetify por Luciano Alberto Rocho
    </p>
    <p>
      Criada em junho de 2021.
    </p>
    <button-recreate-tasks/>
  </div>
</template>
<script>
export default {
  components: {
    'button-recreate-tasks': require('./../components/Todo/ButtonRecreateTasks').default
  }
}
</script>
