<template>
 <div>
   <v-btn @click="add">Sum</v-btn>  
   
 </div>


</template>
<script>
export default {
    data(){
        return{
            num: [3,4,56,3,43,4],
        }
    
    },
    methods: {
        add(){
            console.log(this.num.reduce((a,b) => a+b,0))
        }
    }
}

</script>