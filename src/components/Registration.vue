<template>
    <v-card>
        <h1 v-if="!isEditing" class="text-center primary--text">Rigistration</h1>
        <h1 v-else class="text-center primary--text">Edit</h1>
        <v-form v-model="valid" ref="form">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
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
          <v-text-field
            v-model="fName"
            
            :counter="10"
            label="Father's Name"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="district"
           
            label="District"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="city"
           
            label="City"
            required
          ></v-text-field>
        </v-col>
        
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="village"
            
            label="Village Name"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="post"
            
            label="Post Office"
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
            v-model="confirmPass"
            :rules="confirmPassRules"
            label="Passward"
            required
            type="passward"
          ></v-text-field>
        </v-col>
        
      </v-row>
      <v-btn
      v-if="!isEditing"
      class="mr-4"
      @click="submit"
      color="success"
    >
      submit
    </v-btn>
   
     <v-btn
      v-else
      class="mr-4"
     @click="update"
      color="success"
    >
      Update
    </v-btn>
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

     <v-btn
    
      class="mr-4"
     @click="close"
      color="error"
    >
      Close
    </v-btn>
    </v-container>
    
  </v-form>
    </v-card>
</template>
<script>
  export default {
    data: () => ({
      valid: false,
       date: null,
      menu: false,
      name: '',
      
      nameRules: [
        v => !!v || 'Name is required',
        
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      fName: '',
     
      district: '',
      city: '',
      
      village: '',
      post: '',
      
      confirmPass: '',
      confirmPassRules: [
          v => !!v || 'Confirm Passward is required',
      ],
      items: [],
       snackbar: false,
      text: `Please fill up those input fields`,
    }),
    props: ['isEditing'],
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    computed: {
      formData(){
        return {
            name: this.name,
            email: this.email,
            fName: this.fName,
            district: this.district,
            city: this.city,
            
            village: this.village,
            post: this.post,
            date: this.date,
            confirmPass: this.confirmPass,
            
        }
      }
    },

     methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      close(){
          this.$emit('close')
          this.$refs.form.reset();
      },
      submit(){
        this.snackbar = true
          if (this.$refs.form.validate()){
            
            this.$emit('submitData',this.formData)
            this.close()
              
          } 
              

          
      },
      childMethod(data){
        this.name = data.name
        this.email = data.email
        this.fName = data.fName
        this.district = data.district
        this.city = data.city
            
        this.village = data.village
        this.post = data.post
        this.date = data.date
        this.confirmPass = data.confirmPass
      },
      update(){
        this.$emit('updateData',this.formData)
      }
    }
  }
</script>