<template>

<section>
  <router-view></router-view>
    <div class="text-center">
      
  <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    
  
    </div>
   <v-row class="d-flex justify-space-around mb-6">
   
   <!-- {{query}} -->
 <v-col v-for="data in allData" :key="data.id" md="3">
        <v-card @click="detail(data)">
            <!-- <h3 v-for="data in card" :key="data">Name: {{ card.name }}</h3> -->
           <p>{{data.email}}</p>
           <p>{{data.name}}</p>
     
        </v-card>
       </v-col>
   
 
 </v-row>
  <div class="text-center">
    <v-pagination
     
      v-model="page"
      :length="totalPage"
    ></v-pagination>
  </div>

</section>



</template>
<script>
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import {mapGetters} from 'vuex';
Vue.use(VueAxios,axios)

export default {
    data(){
        return {
       page: 1,
        per_page: 8,
        totalPage: 0,
        loading: false
        }
    },
    mounted: function(){
     this.getData()
    },
    watch: {
      // eikhane query watch a thakar karon query te kicu change hoile e getData call hobe. watch use kora hoi kono property k watch korar jonno
      // mane kono kicu change hoile jeno er vitor er kaj gula like aikhane getData k call kora hocce
      query: {
        handler(){
          this.getData();
        },
        deep: true
      }

    },
    // props: ['data'],
    computed: {
    ...mapGetters(['allData']),
     query(){
        
           // return '?per_page=8&page=1' + '&gender='+ this.filterGender;
             return '?per_page=' + this.per_page + '&page=' + this.page +
             
           (this.filterGender ? '&gender=' + this.filterGender : '') + (this.emailSearch ? '&search=' + this.emailSearch : '')//+ '&email=keya@test.com'; // Here jodi gilterGender a kono value thake tahole gender filter ta add hobe

         }
    },
    methods: {
        getData(){
           this.loading = true
            this.$store.dispatch('saveData', this.query)
            .then(response=>{
            
              console.log(response)
              this.totalPage = response.data.last_page
             
            })
            .finally(()=> {
              this.loading = false
            })
          
        },
        detail(data){
          this.$router.push('/users-card/' + data.id)
        }
       
    }
  
}
</script>