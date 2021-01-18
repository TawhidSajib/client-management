<template>
<v-row justify="center">

     <v-simple-table dark>
   
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Father's Name
          </th>
          <th class="text-left">
            District
          </th>
          <th class="text-left">
            City
          </th>
          <th class="text-left">
            Village Name
          </th>
          <th class="text-left">
            Birthday
          </th>

        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in items"
          :key="index"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
           <td>{{ item.fName }}</td>
           <td>{{ item.district }}</td>
            <td>{{ item.city }}</td>
            <td>{{ item.village }}</td>
             <td>{{ item.date }}</td>
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
    <v-btn color="success" @click="dialog=true">Users</v-btn>
    
  </v-simple-table>
       <v-dialog
      v-model="dialog"
      width="800px"
      style="padding-left:5px"
    >
       <v-card>
         
       <Registration @close="dialog = false" @submitData="submitData" ></Registration>
      </v-card>
    </v-dialog>
     <v-dialog
      v-model="dialogEdit"
      width="800px"
      style="padding-left:5px"
    >
       <v-card>
         
       <Registration @close="dialogEdit = false" ref="test" :isEditing = true @updateData="updateData"></Registration>
      </v-card>
    </v-dialog>
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
</v-row>
 

</template>
<script>
import Registration from '@/components/Registration'
export default {
    components: {
        Registration
    },
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            dialogEdit: false,
            items: [ 
                {name: "Robert",email: "WWW.xyz.com",fName: "Akbar",district: "Gopalgonj" },
                 {name: "Junior",email: "WWW.xyz.com",fName: "Jobbar",district: "Khulna" },
                  {name: "Sadio Mane",email: "WWW.xyz.com",fName: "Hashem",district: "Kedarnath"},
                   {name: "Gerath",email: "WWW.xyz.com",fName: "Kashem",district: "Sylhet"},
                    {name: "Ron",email: "WWW.xyz.com",fName: "Rahim",district: "Tendua"}

            
            
            ],
            deleteIndex: null,
            selectIndex : null,
            snackbar: false,
             text: `Successfully done!`,
        }
    },
    methods: {
      submitData(data){
        this.items.push(data)
        
        this.snackbar = true
        
      },
      remove(index){
        this.dialogDelete = true
        this.dialogIndex = index

      },
      closeDelete(){
        this.dialogDelete = false
      },
      deleteData(){
         this.items.splice(this.dialogIndex,1)
        this.closeDelete()
      },
      edit(data,i){
        this.dialogEdit = true
        this.selectIndex = i
        setTimeout(() => {
          this.$refs.test.childMethod(data)
        }, 1000);
      },
     updateData(data){
       this.items.splice(this.selectIndex,1,data)
       this.dialogEdit = false
     }
    }
}
</script>