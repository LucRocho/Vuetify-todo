<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="768"
      app
      >
      <v-img
        src= "mountains.png"
        class="pa-4 pt-7"
        height= 170
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2">
          <img src="avatar.jpg" alt="Luciano Rocho">
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">Luciano Rocho</div>
        <div class="white--text text-subtitle-2">lucianorocho@yahoo.com.br</div>
      </v-img>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      prominent
      src="mountains.png"
      height="170"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-container class="pa-0 head-container">
        <v-row>
          <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search v-if="$route.path==='/'" />
        </v-row>
        <v-row>
          <v-app-bar-title class="text-h4 ml-4">
            {{$store.state.appTitle}}
          </v-app-bar-title>
        </v-row>
        <v-row>
          <live-date-time/>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view/>
      <snackbar/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Lista', icon: 'mdi-format-list-checks', to: '/' },
        { title: 'About', icon: 'mdi-help-box', to: '/about' }
      ]
    }
  },
  mounted  () {
    this.$store.dispatch('getTasks')
  },
  components: {
    snackbar: require('./components/Shared/Snackbar').default,
    search: require('./components/Tools/Search').default,
    'live-date-time': require('./components/Tools/LiveDateTime').default
  }
}
</script>
<style lang='sass'>
  .head-container
    max-width: none !important

</style>
