import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
   state: {
      allData: [],
      
   },
   getters :{
       allData(state){
return state.allData
       },
       
   },
   actions: {
       saveData({commit}, payload){
                commit('saveData',payload )
       },
       

   },
   mutations: {
       saveData(state,data){
           state.allData = data
       }
   }
})
