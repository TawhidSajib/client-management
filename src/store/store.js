import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios)

Vue.use(Vuex)
export const store = new Vuex.Store({
   state: {
      allData: [],
      single: {}
   },
   getters :{
       allData(state){
  return state.allData
       },
       single(state){
         return state.single
       }
      
       
   },
   actions: {
     
       saveData({commit},payload){        
        return axios.get('http://127.0.0.1:8000/api/clients' + payload)
        .then((response)=>{

            console.log(response)
            commit('saveData', response.data.data.reverse())
            return response;

        })
      
       

   },
   singleRoute({commit},payload){
       return axios.get('http://127.0.0.1:8000/api/clients/' + payload )
       .then(response => {
           console.log(response)
         
         commit('singleRoute', response.data)
         return response
       })
   },

   postData({commit},payload){
       return axios.post('http://127.0.0.1:8000/api/clients',payload).then(response=>{
        commit('saveData', response.data.data) // For Hudai
           return response;
       })
   },
    
   removes({commit},payload){
    return axios.delete('http://127.0.0.1:8000/api/clients/' + payload)
    .then(response =>{
        commit('saveData', response.data.data) // For Hudai
           return response;
    })
   },

   updateData({commit},payload){
       console.log(payload)
       return  axios.put('http://127.0.0.1:8000/api/clients/' + payload.id,payload.data)
       .then(response =>{
           
        commit('saveData', response.data.data) // For Hudai
           return response;
    })

   },
},
   mutations: {
       saveData(state,data){
           state.allData = data
       },
       singleRoute(state,data){
        state.single = data
       }
   }
})
