<template>
    <div>
       
        <ul>
            <li v-for="(client,index) in clients" :key="index">{{ client.name }}</li>
        </ul>
    </div>
</template>
<script>
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios)
export default {
    data() {
     return {
          clients: null
     }
    },
      mounted: function() {
          this.getData();
   
  },
  methods: {
      getData(){
           axios.get('http://127.0.0.1:8000/api/clients')
          .then(response => {
          console.log(response)
this.clients = response.data.data
          }
          )

      }
  }

}
</script>