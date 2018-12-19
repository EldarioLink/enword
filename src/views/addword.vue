<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
          Поле для ввода английского слова
        </v-layout>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
          <input style="border: solid 1px #009688">
        </v-layout>
      </v-container>
      <v-container>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
          Поле для ввода перевода
        </v-layout>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
          <input style="border: solid 1px #009688">
        </v-layout>
       
        <v-layout mt-4 align-center justify-center row > 
        <v-btn color="success">Добавить</v-btn>
        </v-layout>
      </v-container>
    </v-content>
  
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>