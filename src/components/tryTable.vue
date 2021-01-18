<template>

    <v-card>

     
      <div class="d-flex justify-space-between mb-6">
       <v-btn @click="userFormDialog=true" class="d-flex" color="success" style="margin-bottom: 10px" >
        <v-icon>mdi-account</v-icon>
        User profile
      </v-btn>
      <v-btn color="primary" @click="filterType = 'Admin'">Admin</v-btn>
       <v-btn color="primary" @click="filterType = 'Priority Staff'">Priority Staff</v-btn>
        <v-btn color="primary" @click="filterType = 'Standard Staff'">Standard Staff</v-btn>
      </div>
      <v-text-field placeholder="Search..." v-model="search"></v-text-field>
      
   
     <v-data-table
    :headers="headers"
    :items="computedFilter"
    :loading="dataTableLoading"
    
  >
  <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item,item.index)"
        color="success"
      >
        mdi-pencil
      </v-icon>
    
      <v-icon
        small
        class="mr-2"
        @click="deleteItem(item.index)"
        color="error"
      >
        mdi-delete
      </v-icon>
       <v-icon
        small
        class="mr-2"
        @click="showDetail(item)"
        color="purple"
      >
        mdi-details
      </v-icon>
    </template>
  
  </v-data-table>
  
   <v-dialog
      v-model="dialog"
      width="800px"
      style="padding-left:5px"
    >
       <v-card>
       <TryForm @close="dialog=false" @submitData="submitData"></TryForm>  
       
      </v-card>
    </v-dialog>
     
       <v-dialog
      v-model="dialogEdit"
      width="800px"
      style="padding-left:5px"
    >
       <v-card>
       <TryForm @close="dialogEdit = false" :isEditing = true ref="test" @updateData="updateData"></TryForm>  
       
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="remove">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
          <v-dialog
      v-model="dialogShow"
      width="700px"
      style="padding-left:5px"
    >
       <v-card>
         <v-row class="d-flex justify-space-around mb-6">
       <v-col  md="5">
         <h4>Name</h4>
         <p>{{showName}}</p>
       </v-col>
        <v-col  md="5">
         <h4>Email</h4>
         <p>{{showEmail}}</p>
       </v-col>
         <v-col  md="5">
         <h4>Designation</h4>
         <p>{{showDesignation}}</p>
       </v-col>
         <v-col  md="5">
         <h4>Phone</h4>
         <p>{{showPhone}}</p>
       </v-col>
        <v-col  md="5">
         <h4>Gender</h4>
         <p>{{showGender}}</p>
       </v-col>
       <v-col  md="5">
         <h4>Has Access</h4>
         <p>{{showAccess}}</p>
       </v-col>
        <v-col  md="5">
         <h4>User Type</h4>
         <p>{{showType}}</p>
       </v-col>
       <v-col  md="5">
         <h4>Addess</h4>
         <p>{{showAddress}}</p>
       </v-col>
        
       </v-row>
       
      </v-card>
    </v-dialog>
    <v-dialog width="800" v-model="userFormDialog">
      <user-add-form @close="userFormDialog = false" @get-data="getData"></user-add-form>
    </v-dialog>
       
      </v-card>
     
</template>
<script>

import TryForm from '@/components/TryForm';
import {mapGetters} from 'vuex';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios)
import UserAddForm from '@/components/UserAddForm'
export default {
    components: {
      TryForm,
      UserAddForm
    },
    data(){
        return {
          
          showName: '',
          showEmail: '',
          showDesignation: '',
          showPhone: '',
          showGender: '',
          showAccess: '',
          showType: '',
          showAddress: '',
          dialogShow: false,
          search: '',
          filterType: '',
            dialog: false,
            dialogDelete: false,
            dialogEdit: false,
            deleteId: null,
            selectIndex: null,
            clients: [],
            headers: [
                {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
                },
                {text: 'Email',value: 'email'},
                {text: 'Designation',value: 'designation'},
                {text: 'Phone',value: 'phone'},
                {text: 'Gender',value: 'gender'},
                {text: 'Has Access',value: 'hasAccess'},
                {text: 'User Type',value: 'type'},
                {text: 'Address',value: 'address'},
                {text: 'Action',value: 'actions'},



            ],
            // For new form
            userFormDialog: false,
            dataTableLoading: false
        }
    },
    computed: {
       ...mapGetters(['allData']),
         allDataFormat(){
             return this.clients.map((item,index) => {
                 item.index = index
                 return item;
             })
         },
         computedFilter(){
           if (this.filterType){
             return this.clients.filter(client => client.type === this.filterType)
           }else if (this.search){
                 return this.clients.filter((client) => {
                return client.name.toLowerCase().match(this.search.toLowerCase())
                 })
           }
           else{
                  return this.clients;
                }
         }
    },
    mounted: function(){
    this.getData()
    // this.pushData()
    },
    methods: {
        submitData(data){
            
            axios.post('http://127.0.0.1:8000/api/clients', data)
                 .then(response => {
          this.clients = response.data.data
          })
           
        },
        deleteItem(index){
            this.dialogDelete = true
            this.deleteId = index
        },
        closeDelete(){
            this.dialogDelete = false
        },
        remove(){
            this.items.splice(this.deleteId,1)
            this.closeDelete()
        },
        editItem(data,index){
           this.dialogEdit= true
           this.selectIndex = index
           setTimeout(() => {
               this.$refs.test.childMethod(data)
           }, 1000);
        },
        updateData(data){
            this.items.splice(this.selectIndex,1,data)
            this.dialogEdit = false
            this.$store.dispatch('saveData',this.items)
        },
     showDetail(data){
       this.dialogShow = true
       this.showName = data.name
       this.showEmail = data.email
       this.showDesignation = data.designation
       this.showPhone = data.phone
       this.showGender = data.gender
       this.showAccess = data.hasAccess
       this.showType = data.type
       this.showAddress = data.address
     },
      getData(){
        this.dataTableLoading = true;
        
           axios.get('http://127.0.0.1:8000/api/clients')
          .then(response => {
          this.clients = response.data.data.reverse();
          }
          ).finally(()=>{
            this.dataTableLoading = false;
           
          })

      },
   
    }
}
</script>