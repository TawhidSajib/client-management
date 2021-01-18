<template>
    <div>
        <v-row justify="center">
            <v-simple-table dark>
                <thead>
                     <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
         Roll
          </th>
            <th class="text-left">
            Income
          </th>
          
          <th>
            <v-btn class="mr-2" @click="showName">Show Name</v-btn>
            <v-btn class="mr-2" @click="showRoll">Show Roll</v-btn>
            <v-btn class="mr-2" @click="showIncome">Total income</v-btn>
          </th>
           <th class="text-left">
            Total Income
          </th>
          </tr>

                </thead>
                <tbody>
        <tr
          v-for="(item,index) in items"
          :key="index"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.roll }}</td>
          <td>{{ item.income }}</td>
         
          </tr>
                </tbody>
            </v-simple-table>
        </v-row>
    </div>
</template>
<script>
export default {
    data(){
        return{
            items: [ 
                {name: 'Abir',roll: 32, income: 1500},
                {name: 'Sajib',roll: 4, income: 1500},
                {name: 'Keya',roll: 5, income: 3000},
                {name: 'Bipul',roll: 55, income: 1500},
                {name: 'Choyon',roll: 80, income: 1000},
                {name: 'Rahim',roll: 14, income: 2000},
                {name: 'Mona',roll: 150, income: 1500},
                {name: 'Kanak',roll: 100, income: 5000},



            
            
            ],
          
        }
    },
    methods: {
        showName(){
        console.log(this.items.sort((a,b) => a.name > b.name ? 1 : -1))
      
        },
        showRoll(){
            this.items.sort((a,b) => a.roll > b.roll ? 1 : -1);
        },
        showIncome(){
            //  console.log(this.items.reduce((a,b) => a.income +  b.income,0));
            // this.items.map(a => a.income) [1500,1550]
            // console.log(this.items.map(a => a.income).reduce((a,b) => a + b))
           console.log(this.items.map((item) => {
             return {
                 
                 roll: item.roll,
                 income: item.income
             }
           }
           
           
           
           ))
           
        }
    }
}
</script>