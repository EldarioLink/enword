<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
          Поле для ввода английского слова
        </v-layout>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
          <input v-model="eng" style="border: solid 1px #009688" :rules="engRules">
        </v-layout>
      </v-container>
      <v-container>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
          Поле для ввода перевода
        </v-layout>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
          <input v-model="rus" style="border: solid 1px #009688" :rules="rusRules">
        </v-layout>

        <v-layout mt-4 align-center justify-center row>
          <v-btn @click="addwords()" v-if="activeBtn" color="success">Добавить</v-btn>
        </v-layout>
      </v-container>
      <v-container>
        <v-alert :value="true" color="warning" icon="warning" outline>
          Если вы добавите слова, то список будет содержать только их.
        </v-alert>
      </v-container>

    </v-content>

  </v-app>
</template>

<script>
  export default {
    data() {
      return {

        eng: undefined,
        rus: undefined,
        engRules: [
          v => !!v || "Пожалуйста введите слово", // Если пустое поле
          v => /^\w+([\.-]?\w+)+$/.test(v) || "Неправильное английское слово" // Стандартный регуляр экспрешшн
        ],
        rusRules: [
          v => !!v || "Пожалуйста введите слово",
          v => /[\wа-я]+/gi.test(v) || "Неправильный перевод"
        ]
      };
    },
    methods: {
      addwords() {
        this.$store.dispatch("LENGTH_DATA_WORDS").then((length) => {
          let obj = {
            eng: this.eng,
            rus: this.rus,
            length: length
          }
          this.$store.dispatch("ADD_NEW_WORDS", obj );
        })




        // Если идет первое добавление новых слов
        // if (!this.$store.getters.getWordsAdd) {
        //   console.log("DELETEALL ARRAY")
        //   //  удалил старые слова
        //   // this.$store.commit("DELETE_WORDS");
        //   // this.$store.commit("MAXID_NULL")
        //   this.$store.dispatch("IS_EXIST_WORDS").then(() => {
        //     this.$store.dispatch("ADD_NEW_WORDS", this.obj);
        //   })
        //   //  поставил флажок, что загружаю новые слова
        //   this.$store.commit("isWordsAdd", true);
        // } else {
        //   //  Передаем объект с новыми словами
        //   this.$store.dispatch("ADD_NEW_WORDS", this.obj);
        // }

      }
    },
    computed: {
      activeBtn() {
        return !!this.eng && !!this.rus
      }
    }
  };
</script>

<style scoped>

</style>
