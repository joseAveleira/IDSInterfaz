<template lang='pug'>
  v-layout
    v-flex( xs12 md2 offset-md5 sm8 offset-sm2 )
      v-card
        v-card-title.teal.lighten-1.centrado( primary-title)
          h1.headline.mb-0 IDS
        div
          v-alert( type='error' dismissible v-model='alert') El usuario o la contraseña son incorrectos
        v-form.login( v-model='valid' ref="form" lazy-validation )
          v-text-field(
            label='User'
            v-model="user"
            required
            :rules="userRules"
            )
          v-text-field(
            name="input-10-1"
            label="Password"
            v-model="password"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'" :rules="passwordRules"
            required
            )
          div
            v-btn.teal.lighten-1.btnacceso(dark v-on:click='onLogin') Access


</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AgLogin',
  data () {
    return {
      alert: false,
      valid: false,
      user: '',
      userRules: [
        v => !!v || 'El nombre de usuario es necesario'
      ],
      e1: true,
      password: '',
      passwordRules: [
        v => !!v || 'La contraseña es necesaria'
      ],
      count: ''
    }
  },
  mounted () {
    // console.log('creado')
    // this.increment()
    // this.$store.commit('INCREMENT')
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    onLogin () {
      if (this.$refs.form.validate()) {
        this.login({
          alias: this.user,
          password: this.password
        })
          .then(() => this.$router.push('/vue/main'))
          .catch((error) => {
            this.alert = true
            console.log(error)
          })
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centrado {
  justify-content: center;
  color: #fff;
}
.login {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}
.btnacceso {
  margin-bottom: 20px;
}
</style>
