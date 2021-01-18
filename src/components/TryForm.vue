<template>
    <v-card>
        <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
           
           
            v-model="name"
            :rules="nameRules"
            :counter="20"
            label="Name"
            required
          ></v-text-field>
        </v-col>

       

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          
        </v-col>
        <v-col
        cols="12"
        md="4"
         >
         <!-- <v-text-field
            v-model="designation"
            :rules="designationRules"
            label="Designation"
            required
          ></v-text-field>
         </v-col> -->
        </v-col>
         <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="phone"
            :rules="phoneRules"
            label="Phone"
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
         <v-select
         v-model="gender"
          :items="genders"
          label="Gender"
        ></v-select>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
         <v-select
         v-model="hasAccess"
          :items="access"
          label="Has Access"
        ></v-select>
        </v-col>
         <v-col
          cols="12"
          md="4"
        >
         <v-select
          v-model="type"
          :items="users"
          label="User Type"
        ></v-select>
        </v-col>
        <v-col
        cols="12"
        md="4"
         >
         <v-text-field
            v-model="contact"
            
            label="Emergency Contact Number"
            required
          ></v-text-field>
         </v-col>
         
               <v-col
        cols="12"
        md="4"
         >
         <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Birthday date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>
         </v-col>
         
          <v-col
        cols="12"
        md="4"
         >
         <v-text-field
            v-model="address"
            label="Address"
            prepend-icon="mdi-map-marker"
          ></v-text-field>
         </v-col>
                <v-col
        cols="12"
        md="4"
         >
         <v-text-field
            v-model="passward"
            :rules="passwardRules"
            label="Passward"
            required
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
         </v-col>
                <v-col
        cols="12"
        md="4"
         >
         <v-text-field
            v-model="confirmPass"
            :rules="confirmPassRules"
            label="Confirm Passward"
            required
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          ></v-text-field>
         </v-col>
      </v-row>
      
        <v-btn v-if="!isEditing"
      depressed
      color="primary"
      class="mr-3"
      @click="submit"
    >
     Save
    </v-btn>
     <v-btn v-else
      depressed
      color="primary"
      class="mr-3"
      @click="update"
    >
     Update
    </v-btn>
     <v-btn
      depressed
      color="error"
      class="mr-3"
      @click="cancel"
    >
     Cancel
    </v-btn>
     
     
    </v-container>
        </v-form>
    </v-card>
</template>
<script>
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios)
export default {
    data(){
        return {
            clients: [],
            menu: false,
            show1: false,
            valid: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            email: '',
            emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
       ],
            designation: '',
            designationRules: [
         v => !!v || 'Designation is required',
       ],
            phone: '',
            phoneRules: [
             v => !!v || 'Passward is required',
            ],
            type: '',
            address: '',
            contact: '',
            passward: '',
            passwardRules: [
        v => !!v || 'Passward is required',
        ],
            confirmPass: '',
            confirmPassRules: [
        v => !!v || 'Confirm Passward is required',
        ],
             date: null,
             genders: ['Male','Female'],
             gender: '',
             hasAccess: '',
             access: ['Yes','No'],
             users: ['Admin','Priority Staff','Standard Staff']
        
        }
    },
    watch: {
        menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    props: ['isEditing'],
    computed: {
        formData(){
            return{
                name: this.name,
                email: this.email,
                designation : this.designation,
                phone: this.phone,
                gender: this.gender,
                hasAccess: this.hasAccess,
                contact: this.contact,
                address: this.address,
                type: this.type

            }
        }
    },
    methods: {
        save (date) {
        this.$refs.menu.save(date)
      },
     submit(){
         if(this.$refs.form.validate()){
          //  this.$emit('submitData',this.formData)
          axios.post('http://127.0.0.1:8000/api/clients', this.formData)
          .then(response => {
            console.log(response)
          })
         }
        // this.cancel()
     },
     cancel(){
         this.$emit('close')
         this.$refs.form.reset();
        
     },
     childMethod(data){
       this.name = data.name
       this.email = data.email
       this.designation = data.designation
       this.phone = data.phone
       this.gender = data.gender
       this.contact = data.contact
       this.address = data.address
       this.type = data.type
       this.hasAccess = data.hasAccess

     },
     update(){
       this.$emit('updateData',this.formData)
     }
    }
}
</script>