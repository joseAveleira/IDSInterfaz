<template lang='pug'>
v-container
  // p(v-if='isConnected') conectado con servidor

  // v-btn.success( v-on:click="clickButton") enviar mensaje
  v-flex(xs12, md10, offset-md1)
    v-card
      v-card-title.teal.lighten-1.centrado(primary-title)
        v-icon.blanco router
        h1.headline.mb-0 Frames

      div
        v-data-table.elevation-1(:headers='headers', :items='tramas', hide-actions)
          template(slot='items', slot-scope='props')
            td.text-xs-left {{ props.item.ipSrc }}
            td.text-xs-left {{ props.item.tcpSport }}
            td.text-xs-left {{ props.item.ethSrc }}
            td.text-xs-left {{ props.item.frameCap_len }}
            td.text-xs-left.verde {{ props.item.type }}
 
    v-flex(xs12, md6, )
      .chart 
        charts(:series='series')
    v-flex(xs12, md6)
      .chart 
        barchart(:data='series')
    
    
        
  
    

  //v-btn.success( v-on:click='permiso') Mostrar notificación
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Push from 'push.js'
import charts from '@/components/charts'
import barchart from '@/components/barchart'
Push.config({
  serviceWorker: '@/push.js/bin/serviceWorker.min.js' // Sets a custom service worker script

})
function onGranted () {
  console.log('bien')
}
function onDenied () {
  console.log('mal')
}
export default {
  name: 'agMain',
  components: {
    charts,
    barchart
  },
  data () {
    return {
      contaDNS: 0,
      contaMQTT: 0,
      contaHTTP: 0,
      contaCoap: 0,
      series: [0, 0, 0, 0],
      isConnected: false,
      socketMessage: [],
      mensaje: '',
      trama: [],
      headers: [
        {
          text: 'port.src',
          align: 'left',
          sortable: false
        },
        {
          text: 'tcp.srcport',
          sortable: false
        },
        {
          text: 'eth.src',
          sortable: false
        },
        {
          text: 'Protocol',
          sortable: false
        },
        {
          text: 'type',
          sortable: false
        }
      ],
      tramas: [
        {
          ipSrc: 'test',
          tcpSport: '',
          ethSrc: '',
          frameCap_len: ''
        }]
    }
  },
  methods: {
    notify (data, user, image) {
      Push.create(user.toUpperCase(), {
        body: data,
        icon: image,
        link: 'http://localhost:8080/main',
        vibrate: [200, 100],
        requireInteraction: true,
        onClick () {
          window.focus()
          this.close()
        }
      })
    },
    permiso () {
      Push.Permission.request(onGranted, onDenied)
    },
    sendMessage () {
      let image = 'https://lh3.googleusercontent.com/cBOBim7BuGfnkK8rNchRtjP2k8_8b_HNSNqKc3mkuzlAvmT4d39qHQ9E10ETxVmXfgCnXP6Qrj6u1A'
      if (this.user === 'patri') {
        image = 'https://lh3.googleusercontent.com/SygsyztD9xupF6u4h-VkOzBVvhejOqVzDcX--HHNCD23dFTwCewEoR2DtpV0_VhErAErXpxy415bkcI=s204-no'
      }
      let mensajeUsu = {
        user: this.user,
        data: this.mensaje,
        image: image
      }
      this.$socket.emit('chatmessage', mensajeUsu)
      this.mensaje = ''
    }
  },

  computed: {
    ...mapGetters({
      user: 'getUserName'
    })
  },
  watch: {
    socketMessage (newvalue) {
      // console.log(newvalue)
    }
  },
  sockets: {
    connect () {
      // Fired when the socket connects.
      this.isConnected = true
    },
    disconnect () {
      this.isConnected = false
    },
    // Fired when the server sends something on the "messageChannel" channel.
    chatmessage (data) {
      // console.log(data)
      var fieldsContent = []
      fieldsContent = data.split(',')
      var fields = {
        ipSrc: fieldsContent[0],
        tcpSport: fieldsContent[1],
        ethSrc: fieldsContent[2],
        frameCap_len: fieldsContent[12],
        type: fieldsContent[13]
      }
      var protocol = fieldsContent[12]
      protocol = data.split(':')
      console.log(protocol[protocol.length - 1])
      if (protocol[protocol.length - 1] === 'dns,normal') {
        console.log('contarDNS')
        this.contaDNS++
        console.log(this.contaDNS)
        this.series.splice(0, 1, this.contaDNS)
      }
      if (protocol[protocol.length - 1] === 'mqtt,normal') {
        this.contaMQTT++
        console.log(this.contaMQTT)
        this.series.splice(1, 1, this.contaMQTT)
      }
      if (protocol[protocol.length - 1] === 'http,normal') {
        this.contaHTTP++
        console.log(this.contaHTTP)
        this.series.splice(2, 1, this.contaHTTP)
      }
      if (this.tramas.length > 4) {
        this.tramas.shift()
      }
      // console.log(fields.type)
      this.tramas.push(fields)
      // this.socketMessage.push(data)
    }
  }
}
</script>

<style scoped>
.centrado {
  justify-content: center;
  color: #fff;
}
b {
  margin-right: 5px;
}
.login {
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}
.btnacceso {
  margin-bottom: 20px;
}
.blanco {
  color: #fff;
}
.verde {
  color: #26a69a;
}
.chart {
  background-color: #fff;
  margin-top: 10px;
  width: 500px;
}
</style>

