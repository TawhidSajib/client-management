<template>
    <div>
        Hello World -- {{name}}
       
        <v-form>
            <v-text-field label="Name" v-model="name">

            </v-text-field>
             <v-text-field label="Age" v-model="age">

            </v-text-field>
            <v-btn @click="save">Submit</v-btn>
        </v-form>
      <v-data-table
    :headers="headers"
    :items="allDataFormat"
  >
  <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item,item.index)"
      >
        mdi-pencil
      </v-icon>
    
      <v-icon
        small
        @click="deleteItem(item.index)"
      >
        mdi-delete
      </v-icon>
    </template>
   
  </v-data-table>
  <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text  @click="cancel">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="remove">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" max-width="1000px">
         <v-card>
             <v-form>
            <v-text-field label="Name" v-model="showName">

            </v-text-field>
             <v-text-field label="Age" v-model="showAge">

            </v-text-field>
            <v-btn @click="update">Update</v-btn>
        </v-form>
         </v-card>
        </v-dialog>

    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            selectIndex : null,
            dialog: false,
            dialogDelete: false,
            deleteId: null,
            name: '',
            age: '',
            showName : '',
            showAge : '',
            data: [],
            headers: [
                {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Age', value: 'age' },
          {
              text:'Action', value:'actions'
          }
            ]

        }
    },
    computed: {
       ...mapGetters(['allData']
           ),
           allDataFormat(){
               return this.allData.map((item,index) => {
                   item.index = index
                   return item;
               })
           },
        //    formData(){
        //        return {
        //            name: this.name,
        //            age: this.age
        //        }
        //    },
           showData(){
               return{
                   name: this.showName,
                   age: this.showAge
               }
           }
      
    },
    methods: {
        save(){
            this.data.push({
                name: this.name,
                age: this.age
            })
            this.$store.dispatch('saveData', this.data)
        },
        deleteItem(i){
            
            this.dialogDelete = true
            this.deleteId = i
            
        },
        remove(){
            this.data.splice(this.deleteId,1)
            this.cancel()
        },
        cancel(){
            this.dialogDelete = false
        },
        editItem(item,i){
             this.dialog = true
             this.selectIndex = i
             this.showName = item.name
             this.showAge = item.age
            
            
        },
        update(){
            //this.data.splice(this.selectIndex,1,{name: this.name , age: this.age})
            this.data.splice(this.selectIndex,1,this.showData)
            this.dialog = false
            this.$store.dispatch('saveData', this.data)
        }
    }
    
}
</script>