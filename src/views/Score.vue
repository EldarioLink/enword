<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row fill-height>
          YOUR CURRENT SCORE IS {{ counterNow }}
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-container v-if="this.$store.getters.userId">
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row fill-height>
          YOUR MAX SCORE IS
        </v-layout>
        <v-layout style="color:#009688;font-size:20px" align-center justify-center row fill-height>
          COUNTER: {{ counterMax }}
        </v-layout>
      </v-container>
    </v-content>
  
  </v-app>
</template>

<script>
  export default {
    data() {
      return {};
    },
    computed: {
      // Возвращаем рекорд
      counterMax() {
        return this.$store.getters.getCounterMaxGame;
      },
      // Текущий счёт
      counterNow() {
        return this.$store.getters.getCounter;
      },
      getCounterMax() {
        return this.$store.getters.getCounterMax;
      },
      getCounter() {
        return this.$store.getters.getCounter;
      }
    },
  
    mounted() {
      // Зарегистрирован ли пользователь
      if (this.$store.getters.userId) {
        // Поставлен ли рекорд
        this.$store.commit("setmaxCounter");
        // Если рекорд, то сохраняем значение в firebase
        if (this.getCounterMax < this.getCounter) {
          this.$store.dispatch(
            "ADD_USER_BOOK",
            this.$store.getters.getCounterMaxGame
          );
        }
      }
    }
  };
</script>

<style scoped>
  
</style>