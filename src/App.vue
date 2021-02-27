<template>
<v-container>
  <v-row justify="center">
    <v-col >
     <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar
     app
     color="deep-orange"
     
     
   
     
     >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="color:white">John Wick</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link  to="/users/" style="margin-right: 5px;text-decoration: none;border: 1px solid black;padding: 10px;color: white">Users</router-link>
      
      <router-link  to="/users-card/" style="margin-left: 5px;text-decoration: none;border: 1px solid black;padding: 10px;color: white;">Users-card</router-link>
      
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      color="black"

    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon style="color:white">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color:white">Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon style="color:white">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color:white">Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <div class="text-center">
       <v-container fluid>
         <!-- <Axios></Axios> -->
         <!-- <tryTable></tryTable> -->
         <router-view></router-view>
         

         <!-- <TryForm></TryForm> -->
         <!-- <test-vuex></test-vuex> -->
         <!-- <Name></Name>
         <Practice></Practice>
         <Classroom></Classroom>
         <CompareTwoArrays></CompareTwoArrays>
         <Table></Table> -->
       
      
       </v-container>
      </div>
      
    </v-main>
  </v-app>
    </v-col>
  </v-row>
</v-container>
  
</template>

<script>
// import Name from './components/Name'
// import Practice from './components/Practice'
// import Classroom from './components/Classroom'
// import CompareTwoArrays from './components/CompareTwoArrays'
// import Table from './components/Table'
// import TestVuex from '@/components/TestVuex'
// import TryForm from '@/components/TryForm'
// import tryTable from '@/components/tryTable'
// import Axios from '@/components/Axios'
  


  export default {
    components: {
      // Axios
      // tryTable
      // TestVuex
      //  TryForm
    //  Name,
    //  Practice,
    //  Classroom,
    //  CompareTwoArrays,
    //  Table
     
     
    },
    data: () => ({ 
      drawer: null,
      group: ''
       
      
      }),
      
  }
</script>
