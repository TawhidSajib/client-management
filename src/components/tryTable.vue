<template>

    <v-card class="pa-3">

     <router-view></router-view>
     <div class="d-flex justify-space-between mb-6">
       <v-btn @click="userFormDialog=true" class="d-flex" color="success" style="margin-bottom: 10px" >
        <v-icon>mdi-account</v-icon>
        User profile
      </v-btn>
        
      </div>
      <v-container grid-list-md>
 <v-layout>
       <v-flex>
         <v-text-field v-debounce:800="getData" placeholder="Search..." v-model="search"></v-text-field>

       </v-flex>
       <v-flex>
         <v-select clearable label="Filter Gender" :items="genderItems" v-model="filterGender" item-text="text" item-value="value" return-value>
</v-select>
       </v-flex>
     </v-layout>
      </v-container>
    
     <!-- clearable use in v-select to show cancel button on right of v-select-->
     
       
     
     <!-- <v-text-field  placeholder="For email..." v-model="emailSearch"></v-text-field> -->
      
      
   
     <v-data-table
     
    :loading="dataTableLoading"
    :headers="headers"
    :items="computedFilter"
    :options.sync="options"
    :server-items-length="totalData"
    @click:row="dataShow"
    :footer-props="{'items-per-page-options':[2,15, 30, 50, 100, -1]}"

  >
 
  <template v-slot:item.name="{item}">
    <p>Name: {{ item.name }}</p>
  </template>
   
      <template v-slot:item.gender="{ item }">
        <!-- .charAt(0).toUpperCase() + item.gender.slice(1) for capitilize --> 
      <v-chip
       class="a"
        :color="getColor(item.gender)"        
        dark  
      >  
        {{ item.gender}}
      </v-chip>
    </template>
  <template v-slot:item.actions="{ item }">
  
      <v-icon
        small
        class="mr-2"
        @click="editItem(item,item.id)"
        color="success"
      >
        mdi-pencil
      </v-icon>
    
      <v-icon
        small
        class="mr-2"
        @click="deleteItem(item.id)"
        color="error"
      >
        mdi-delete
      </v-icon>
       <v-icon
        small
        class="mr-2"
        @click="showDetail(item)"
        color="primary"
        ref="id"
        
      >
      mdi-eye
        
        
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
      
 
      <v-dialog :fullscreen="$vuetify.breakpoint.xsOnly" width='800'  v-model="userFormDialog">
        <v-card>
      <user-add-form @close="userFormDialog = false" @get-data="getData" @show-snackbar-msg="setSanckbarMsg"></user-add-form>

        </v-card>
    </v-dialog>
    <v-dialog width="600" v-model="editDialog">
   <v-card>
      <user-add-form @snackbarUpdate="snackbarUpdate" @close="editDialog = false" ref="test" :id="selectIndex" :changeUpdate = true @get-data="getData" ></user-add-form>
   </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="snackbar_Two"
      :color="snackbarClr"
    >
      {{ snackbarMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar_Two = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="snackbar_Three"
      :color="delsnackbar_Color"
    >
      {{ delsnackbar_Msg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click=" snackbar_Three = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
       
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
          editDialog: false,
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
                {text: 'Phone',value: 'phone'},
                {text: 'Gender',value: 'gender'},
                {text: 'Address',value: 'address'},
                {text: 'Action',value: 'actions'},



            ],
            // For new form
            userFormDialog: false,
            dataTableLoading: false,
            snackbarText: '',
            snackbarColor: '',
            snackbar: false,
            snackbar_Two: false,
            snackbarMsg : '',
            snackbarClr: '',
            snackbar_Three: false,
            delsnackbar_Msg: '',
            delsnackbar_Color: '',
            genderItems: [
              {
                'text': 'Male',
                'value': 'male'
              },
              {
                'text' : 'Female',
                'value' :'female'
              }
            ],
            filterGender: '',
            emailSearch: '',
            options:{
              page:1,
              itemsPerPage: 5
            },
            totalData: 0,
           


        }
    },
    computed: {
       ...mapGetters(['allData']),
         allDataFormat(){
             return this.clients.map((item,id) => {
                 item.id = id
                 return item;
             })
         },
         computedFilter(){
          return this.allData;
         },
         query(){
           // return '?per_page=50&page=1' + '&gender='+ this.filterGender;
           return `?per_page=${this.options.itemsPerPage}&page=${this.options.page}` +
           (this.filterGender ? '&gender=' + this.filterGender : '') //+ '&email=keya@test.com'; // Here jodi gilterGender a kono value thake tahole gender filter ta add hobe

         },
         
    },
    mounted: function(){
    this.getData()
    // this.pushData()
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
    methods: {
        submitData(data){
            
            axios.post('http://127.0.0.1:8000/api/clients', data)
                 .then(response => {
          this.clients = response.data.data
          })
           
        },
        deleteItem(id){
            this.dialogDelete = true
            this.deleteId = id
        },
        closeDelete(){
            this.dialogDelete = false
        },
        remove(){
            this.$store.dispatch('removes',this.deleteId)
            .then(() =>{
              this.getData();
              this.delSnackbarMsg('error', 'Deleted Complete')
              this.closeDelete()
            })
        },
        editItem(data,id){
           this.editDialog = true
           this.selectIndex = id
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
            this.$router.push('/users/'  + data.id )
           
     },
      getData(){
        console.log(466464)
         this.dataTableLoading = true;
        this.$store.dispatch('saveData', this.query +  (this.search ? '&search=' + this.search : ''))
        .then(response=>{
          
          console.log(response)
          this.totalData = response.data.total
          
        })
        .finally(()=>{
          this.dataTableLoading = false;
        })

      },
      setSanckbarMsg(data){
        this.snackbar = true;
        this.snackbarText = data.msg;
        this.snackbarColor = data.color
      },
      snackbarUpdate(data){
        this.snackbar_Two = true
         this.snackbarMsg = data.msg
         this.snackbarClr = data.color
      },
      delSnackbarMsg(color,msg){
        this.snackbar_Three = true
        this.delsnackbar_Msg = msg
        this.delsnackbar_Color = color
      },
      getColor(gender){
        console.log(gender)
        if (gender != 'male') return 'red'
        else return 'green'
       
      },
      dataShow(value){
      this.$router.push('/users/' + value.id)
      },
       
   
    }
}
</script>
<style scoped>
.a{
    text-transform: capitalize;
}
</style>