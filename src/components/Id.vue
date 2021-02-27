<template>

    <v-card>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex sm6 xs12>
            <h4>Name</h4>
            <p>{{single.name}}</p>
          </v-flex>
             <v-flex sm6 xs12>
            <h4>Email</h4>
            <p>{{single.email}}</p>
          </v-flex>
             <v-flex sm6 xs12>
            <h4>Address</h4>
            <p>{{single.address}}</p>
          </v-flex>
             <v-flex sm6 xs12>
            <h4>Phone</h4>
            <p>{{single.phone}}</p>
          </v-flex>
          
             <v-flex sm6 xs12>
            <h4>Gender</h4>
            <p>{{single.gender}}</p>
          </v-flex>
        </v-layout>
      </v-container>
       <v-btn @click="backToPrevious" color="success" class="mb-2">Back</v-btn>
       
      </v-card>
</template>
<script>
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios)
import {mapGetters} from 'vuex';
export default {
    data(){
        return {
          
        singleRoute: {}
      
        }
    },
    computed: {
       ...mapGetters(['single']),
    },
    created: function(){
     this.getData()
    },
    methods: {
     
        backToPrevious(){
            this.$router.go(-1);
        },
        getData(){
          this.$store.dispatch('singleRoute',this.$route.params.id)
        }
    }
}
</script>