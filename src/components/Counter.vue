<template>
<div>
  <v-card>
    <v-card-text>
      <v-slider
        v-model="value"
        step="5"
        thumb-label
        ticks
      ></v-slider>
    </v-card-text>
  </v-card>
      <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-container>
            <v-row>
              <v-col
              v-for="n in 8"
              :key="n"
              md = 3
              >
               <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Top western road trips
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
    
  </v-card>
              </v-col>
              
             
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col
              v-for="n in 3"
              :key="n"
              md=3
              >row{{ n }}</v-col>
            </v-row>
            <v-row justify="center">
    <v-date-picker v-model="picker"></v-date-picker>
  </v-row>
          </v-container>
</div>

  
</template>
<script>
  export default {
    data () {
      return {
        value: 0,
        show1: false,
        passward: 'passward',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
        student: [
          {
            title: 'Sajib',
            
          },
          {
            name: 'Sajib'
          },
          {
            name: 'Sajib'
          },
          {
            name: 'Sajib'
          },
          {
            name: 'Sajib'
          },
         {
            name: 'Sajib'
          }
        ],
        show: false,
        picker: new Date().toISOString().substr(0, 10),
      }
    },
  }
</script>