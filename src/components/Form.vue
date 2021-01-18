<template>
  <v-card>
    
  
    
  <h1 v-if="!isEditing" class="text-center primary--text">Registration</h1>
  <h1 v-else class="text-center primary--text">Edit</h1>
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
          <v-text-field
            v-model="phone"
            :rules="phoneRules"
            label="Phone Number"
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col
        cols="12"
        md="4"
         >
         <v-text-field
            v-model="designation"
            :rules="designationRules"
            label="Designation"
            required
          ></v-text-field>
         </v-col>
          <v-col
        cols="12"
        md="4"
         >
         <v-text-field
            label="Address"
            prepend-icon="mdi-map-marker"
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
            v-model="contact"
            
            label="Emergency Contact Number"
            required
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
            type="passward"
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
            type="passward"
          ></v-text-field>
         </v-col>
      </v-row>
      <v-radio-group
      v-model="gendered"
      row
    >
      <v-radio
       
        label="Male"
        value="Male"
      ></v-radio>
      <v-radio
      
        label="Female"
        value="Female"
      ></v-radio>
    </v-radio-group>

    <v-btn v-if="!isEditing"
    
      class="mr-4"
      @click="submit"
      color="success"
    >
      submit
    </v-btn>
    <v-btn v-else
    
      class="mr-4"
      @click="update"
      color="success"
    >
      Update
    </v-btn>
    <v-btn @click="close" color="error">
      close
    </v-btn>
    
    </v-container>
  </v-form>
  </v-card>


  

        
</template>
<script>
  export default {
    data: () => ({
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        // v => v.length <= 10 || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      phone: '',
      phoneRules: [
         v => !!v || 'Phone number is required',
        
      ],
      designation: '',
      designationRules: [
         v => !!v || 'Designation is required',
       
      ],
      contact: '',
      passward: '',
      passwardRules: [
        v => !!v || 'Passward is required',
        
      ],
      confirmPass: '',
      confirmPassRules: [
        v => !!v || 'Confirm Passward is required',
        
      ],
      gendered: '',
      row: null,
     
      menu: false,
      items: [],
     
          //  editData: ''
           
           
           
           
     
    
    }),
      watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      },
    //   editData: {
    //     handler(){
          
    //      this.name = this.editData.name
    //      this.email = this.editData.email
    //      this.phone = this.editData.phone
    //      this.designation = this.editData.desig
    //      this.date = this.editData.date
    //      this.gendered = this.editData.gender
         
        
        

    //     },
    //     deep: true,
    //     immediate: true
    //   }
    // },
    props: [ 'isEditing'],
       
    
    computed: {
      formData(){
        return{
          name: this.name,
          email: this.email,
          phone: this.phone,
          desig: this.designation,
          pass: this.passward,
          gender: this.gendered,
          date: this.date
          
        }
      },
     
    },
    methods: {
      close(){
       // this.emptyFromData();
       this.$emit('close',)
      //  this.dialog = false;
      
       this.$refs.form.reset();
    },
      save (date) {
        this.$refs.menu.save(date)
      },
      
      submit(){
        
        if(this.$refs.form.validate()){
 
        this.$emit('setData', this.formData)
       
        
        this.close();
        }
        
        
        
       
        

      },
    
    emptyFromData(){
        this.name = '';
        this.email= '';
        this.phone = '';
        this.designation = '';
        this.passward = '';
        this.gendered = '';
        this.date = '';

    },
  update(){
    this.$emit('updateData',this.formData)
  },
  childMethod(data){
    // console.log('childMethod')
    // console.log(data)
    this.name = data.name
    this.email = data.email
    this.phone = data.phone
    this.designation = data.desig
    this.date = data.date
    this.gendered = data.date 
  },
    // checkform(){
    //             this.emptyErrorMsg();
    //             if (!this.name){
    //               this.errors.name = 'Name Required';
    //              }
                 
                
    //             if (!this.emails){
    //               this.errors.email = 'Emails required'
                  
    //             }
    //             if (this.name && this.email){
    //               this.submit()
    //             }
                
    //           },
    //            emptyErrorMsg(){
    //             this.errors = {
    //               name: '',
    //               email: ''
    //             }
    //           },
  }
      
  }
</script>