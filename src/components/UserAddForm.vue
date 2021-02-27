<template>
    <div>
            <v-form ref="AddForm" >
                
 <v-container grid-list-md>
                     <v-layout row wrap>
                    <v-flex>
                    
                        <v-text-field sm6 xs12 v-model="name" label="Name"  :rules="nameRules">

                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 xs12>
                        <v-text-field v-model="email" label="Email" :rules="emailRules">

                        </v-text-field>
                    </v-flex>
                     <v-flex sm6 xs12>
                        <v-text-field   v-model="phone" label="Phone" :rules="phoneRules">

                        </v-text-field>
                    </v-flex>
                      <v-flex sm6 xs12>
                          
                        <v-select item-text="title" item-value="value" v-model="gender" label="Gender" :items="genderItems" return-value>
                         <template slot='item' slot-scope='{ item }'>
                          <v-icon left v-if="item.title != 'Male'">mdi-human-female</v-icon>
                          <v-icon left v-else>mdi-human-male</v-icon> {{ item.title }} 
                        </template>
                         <template v-slot:selection="{ attrs, item }">
                    
                        <v-chip
                        v-bind="attrs"
                       
                        close
                      
                       @click:close="remove()"
                       >
                       <v-icon left v-if="item.title != 'Male'">mdi-human-female</v-icon>
                       <v-icon left v-else>mdi-human-male</v-icon>
                       
                      <strong>{{ item.title }}</strong>
                    
                    
                       </v-chip>
                      </template>
                         
                         
                    </v-select>
                    </v-flex>
                    <v-flex sm12 xs12>
                        <v-textarea  label="Address" v-model="address">

                    </v-textarea>


                    </v-flex>
                    <v-flex sm12>
                        <div>
                            <v-btn class="mr-2" color="error" @click="cancel">Cancel</v-btn>
                            <v-btn v-if="!changeUpdate" :loading="loading" color="primary" @click="save">Save</v-btn>
                            <v-btn v-else :loading="loading" color="primary" @click="update">Update</v-btn>
                        </div>
                    </v-flex>
                    
                </v-layout>

                </v-container>
               
        
               
            </v-form>
        
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
    </div>
</template>
<script>

import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios)
// import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            selectId: null,
            
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            phoneRules: [
                 v => !!v || 'Phone is required',
            ],
            
            email: '',
             emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
       ],
            phone: '',
            gender: '',
            address: '',
            genderItems: [
                {
                    title: 'Male',
                    value: 'male',
                    icon: 'mdi-human-male',
                    
                     
                },
                {
                    title: 'Female',
                    value: 'female',
                    icon: 'mdi-human-female'
                }
            ],
            loading: false,
            snackbar: false,
            snackbarColor: '',
            snackbarText: '',
            editEmail: ''
        }
    },
    props: ['changeUpdate','id'],
    computed: {
        //  ...mapGetters(['allData']),
        formData(){
            let data = {
            name: this.name,
            
            address: this.address,
            phone: this.phone,
            gender: this.gender 
                
            }
            
            
           
            if(!this.changeUpdate){
            data.email = this.email
            }   
             if(this.changeUpdate && (this.email !== this.editEmail)){
              data.email = this.email 
              
              
                  
              
        
            }
            return data;
           
            
            
            
              
        }
        
    },
    
    methods: {
        save(){
            if(this.$refs.AddForm.validate()){
                this.loading = true
                   
                this.$store.dispatch('postData',this.formData)
                
                .then(response => { 
                    console.log(response)
                  this.$emit('get-data')
                  this.$emit('show-snackbar-msg', {color: 'success', msg: 'Succesfully done'})
                  // this.setSnackbarMsg('success', 'Successfully Submitted')
                 
                  this.cancel()
                  
                })
                .catch(error => {

                    console.dir(error) //log=dir (same)
                    this.setSnackbarMsg('error', 'Something went wrong')
                })
                .finally(() =>{
                    this.loading = false
                    
                  
                })
            }
        },
        cancel(){
            this.$refs.AddForm.reset()
            this.$emit('close')
        },
        setSnackbarMsg(color, msg){
            this.snackbar = true
            this.snackbarColor = color;
            this.snackbarText = msg;

        },
        childMethod(data){
       this.name = data.name
       this.email = data.email
       this.phone = data.phone
       this.gender = data.gender
       this.address = data.address
       this.editEmail = data.email
       

     },
        update(){
            
            this.loading = true
            
           this.$store.dispatch("updateData",{id: this.id,data:this.formData})
            .then(response =>{
                console.log(response)
                this.$emit('get-data')
                this.$emit('snackbarUpdate',{color: 'success', msg: 'Update Completed'})
                this.cancel()
            })
            .finally(() =>{
                    this.loading = false
                    
                  
                })
            
        },
        remove(){
            this.gender = null
            
        }
    }
    
}
</script>
