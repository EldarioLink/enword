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
      getmaxCounter() {
        return this.$store.getters.getmaxCounter;
      },
    },

    mounted() {
      // Зарегистрирован ли пользователь
      if (this.$store.getters.userId) {
        // Устанавливаем рекорд in MaxScore
        this.$store.commit("setmaxCounter");
        // Если рекорд, то сохраняем значение в firebase
        if (this.getmaxCounter < this.counterNow) {
          this.$store.dispatch(
            "SET_USER_SCORE_DB",
            this.counterNow
          );
        }
      }
      this.$store.dispatch('COMMON_MAX_SCORE_GET').then((maxScore) => {
        if (maxScore < this.counterNow) {
          this.$store.dispatch('COMMON_MAX_SCORE_SET', this.counterNow)
        }
      })
    }
  };
</script>

<style scoped>

</style>
