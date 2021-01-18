<template>
    <div>
        <v-card>
            <v-form ref="AddForm" >
                <v-container grid-list-md>
                     <v-layout row wrap>
                    <v-flex>
                        <v-text-field sm6 v-model="name" label="Name"  :rules="nameRules">

                        </v-text-field>
                    </v-flex>
                    <v-flex sm6>
                        <v-text-field v-model="email" label="Email" :rules="emailRules">

                        </v-text-field>
                    </v-flex>
                     <v-flex sm6>
                        <v-text-field   v-model="phone" label="Phone">

                        </v-text-field>
                    </v-flex>
                      <v-flex sm6>
                        <v-select item-text="title" item-value="value" v-model="gender" label="Gender" :items="genderItems"  return-value>

                        </v-select>
                    </v-flex>
                    <v-flex sm12>
                        <v-textarea  label="Address" v-model="address">

                    </v-textarea>


                    </v-flex>
                    <v-flex sm12>
                        <div>
                            <v-btn class="mr-2" color="error" @click="cancel">Cancel</v-btn>
                            <v-btn :loading="loading" color="primary" @click="save">Save</v-btn>
                        </div>
                    </v-flex>
                    
                </v-layout>

                </v-container>
               
            </v-form>
        </v-card>
        <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

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
export default {
    data(){
        return{
            text: `Successfully done!`,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
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
                    value: 'male'
                },
                {
                    title: 'Female',
                    value: 'female'
                }
            ],
            loading: false
        }
    },
    computed: {
        formData(){
            return {
                name: this.name,
                email: this.email,
                address: this.address,
                phone: this.phone,
                gender: this.gender
            }
        }
    },
    methods: {
        save(){
            if(this.$refs.AddForm.validate()){
                this.snackbar=true
                this.loading = true
                   
                axios.post('http://127.0.0.1:8000/api/clients',this.formData)
                
                .then(response => { 
                    console.log(response)
                  this.$emit('get-data')
                 
                  this.cancel()
                  
                })
                .finally(() =>{
                    this.loading = false
                     this.snackbar = true
                  
                })
            }
        },
        cancel(){
            this.$refs.AddForm.reset()
            this.$emit('close')
        }
    }
    
}
</script>