<template lang='pug'>
  v-toolbar.teal.lighten-1( dark)
    v-toolbar-title
      router-link( to='/vue') {{ appName}}
      // router-link( to='/vue') {{ appName}} {{isLoged}} {{count}}
    v-spacer
    v-toolbar-items
    router-link(to='/vue/main' v-if='isLoged')
      v-btn(flat )
        v-icon router
        span.hidden-sm-and-down frames
    router-link(to='/vue/login')
      v-btn(flat v-if='!isLoged')
        v-icon router
        span.hidden-sm-and-down Acceso
      v-btn(flat v-else v-on:click='logout')
        v-icon exit_to_app
        span.hidden-sm-and-down Exit

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AgNavbar',
  data () {
    return {
      appName: 'Test'
    }
  },
  computed: {
    ...mapGetters({
      count: 'getCount',
      isLoged: 'getIsLoged'
    })
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    })
  }
}
</script>

<style lang="css" scoped>
span {
  margin-left: 10px;
}
a {
  text-decoration: none;
  color: #fff;
}
</style>



