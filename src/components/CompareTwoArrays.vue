<template>
<div>
<v-btn @click="compare">Compare</v-btn>
<v-btn @click="notCompare">Not comparre</v-btn>
</div>

</template>
<script>
export default {
    data(){
        return {
            item1: [1,2,3,4,5,6,7],
            item2: [4,5,6,7,10,12,15],
            
        }
    },
    methods: {
        compare(){
          console.log(this.item1.filter(val => this.item2.includes(val) ),
          
          
                  
            
    )
                 
             
            
        },
        notCompare(){
            
            const arr1 = this.item1.filter((val) => !this.item2.includes(val))
            const arr2 = this.item2.filter((val)=> !this.item1.includes(val))
            console.log(arr1.concat(arr2))
            console.log(this.item1.filter((val) => !this.item2.includes(val)).concat(this.item2.filter(ref => !this.item1.includes(ref))))
            const name ="admin_user"
            console.log(name.replace("_", " "))
            console.log(name[0].toUpperCase()  + name.slice(1).replace('_', ' '))

        
        }
    }
}
</script>