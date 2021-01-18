<template>


<v-row justify="center">
  {{name}}
   <v-simple-table dark style="padding-right:5px">
    
   
      <thead>
       <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
            <th class="text-left">
            Phone
          </th>
            <th class="text-left">
            Designation
          </th>
          <th class="text-left">
            Birthdate
          </th>
            <th class="text-left">
            Gender
          </th>
           <th class="text-left">
            Action
           
          
          </th>
          <th>
            <v-btn class="mr-2" @click="filterGender = 'Male'">Male</v-btn>
            <v-btn class="mr-2" @click="filterGender = 'Female'">Female</v-btn>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in computedFilter"
          :key="index"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.desig }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.gender }}</td>
          
               <td>
          
      <v-icon
        small
        class="mr-2"
        @click="edit(item,index)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="remove(index)"
      >
        mdi-delete
      </v-icon>
   
          </td>
         
        </tr>
        
      
        
       
        
        
      </tbody>
      <!-- <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
  >
   <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
  
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
    
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:item.name="{ item }">
      <span class="text-capitalize">{{item.name}}</span>
    </template>
      </v-data-table> -->
      <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteData">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-btn @click="dialog = true">Users</v-btn>
    
  </v-simple-table>
    <v-dialog
      v-model="dialog"
      width="800px"
      style="padding-left:5px"
    >
       <v-card>
         
       <Form @close="dialog = false" @setData="setData" ></Form>
      </v-card>
    </v-dialog>

     <v-dialog
      v-model="dialogEdit"
      width="600px"
      style="padding-left:5px"
    >
    <Form :isEditing="true" :editData="editData"  @close="dialogEdit = false" @updateData="updateData" ref="test"></Form>
       <!-- <v-card>
         
       <h1 class="text-center primary--text">Edit</h1>
       <v-form v-model="valid" ref="form" lazy-validation>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
        
            v-model="showName"
            :rules="nameRules"
            :counter="20"
            label="Name"
            required
          >{{ showName }}</v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="showEmail"
            :rules="emailRules"
            label="E-mail"
            required
          > {{ showEmail }}</v-text-field>
        </v-col>
         <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="showPhone"
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
            v-model="showDesig"
            :rules="designationRules"
            label="Designation"
            required
          ></v-text-field>
         </v-col>
         
        </v-row>
         <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
    </v-container>
       </v-form>
      </v-card> -->
    </v-dialog>
 

</v-row>
     
  


 
</template>
<script>
import Form from '@/components/Form'

export default {
  components: {
    Form

  },
  data(){
    return{
      visual: false,
dialog: false,
dialogDelete: false,
dialogEdit: false,
showName: '',
showEmail: '',
showPhone: '',
showDesig: '',
showGender: '',

 items: [
             {name: 'Saajib', email: 'sajib@gmail.com', desig: 'Engineer' , gender: 'Male'},
             {name: 'Kanak', email: 'kanak@gmail.com', desig: 'Ceo' , gender: 'Male'},
             {name: 'Keya', email: 'Keya@gmail.com', desig: 'Web-developer' , gender: 'Female'},
             {name: 'Choyon', email: 'choyon@gmail.com', desig: 'Textile' , gender: 'Male'},
             {name: 'Mona', email: 'mona@gmail.com', desig: 'Fashion' , gender: 'Female'}
 ],
 editData: {},
 selectIndex: null,
 deleteId: null,
 filterGender: ''

  // headers: [
  //       {
  //         text: 'Name',
  //         align: 'start',
  //         sortable: false,
  //         value: 'name',
  //       },
  //       { text: 'Email', value: 'email' },
  //       { text: 'Phone Number', value: 'phone' },
  //       { text: 'Designation', value: 'desig' },
  //       { text: 'Gender', value: 'gender' },
  //       { text: 'Actions', value: 'actions', sortable: false },
  //     ],
    }
   
    
    
  
  },
 computed: {
        computedFilter(){
          if(this.filterGender){
                return this.items.filter( item => item.gender === this.filterGender)
                }
                else{
                  return this.items;
                }
        },
        name(){
          return this.$store.state.name;
        }
 },
  methods:{
    setData(data){
      this.items.push(data)
      
    },
     remove(index){
       this.dialogDelete = true;
       this.deleteId = index

      
    
    
  },
  closeDelete(){
    this.dialogDelete = false
  },
  close(){
    this.dialogEdit = false
  },
  save(){
    
    this.close()
  },
  edit(data,i){
    console.log(data)
     this.selectIndex = i
    this.dialogEdit = true
    //  this.showName = data.name;
    //  this.showEmail = data.email;
    //  this.showPhone = data.phone;
    //  this.showDesig = data.desig;
    //  this.showGender = data.gender;
    // this.editData = data
        setTimeout(()=>{
    this.$refs.test.childMethod(data);
    console.log(this.items.indexOf(data))

     },2000)
    
  },
  deleteData(){
    this.items.splice(this.deleteId,1);
    this.dialogDelete = false
  },
  updateData(data){
 
  this.items.splice(this.selectIndex,1,data)
  this.close()
  },
 
  // test(){
  //   console.log("hello")
  //   this.dialog =true;
  //    setTimeout(()=>{
  //   this.$refs.test.childMethod(item);

  //    },2000)
  // }
  }
 
 
}
</script>
