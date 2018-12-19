<template>
    <v-app id="inspire">
        <v-content>
            <v-container>
                <v-layout style="color:#009688;font-size:20px" align-center justify-center row fill-height>
                    YOUR SCORE IS {{ counterNow }}
                </v-layout>
                <v-divider></v-divider>
                <v-layout  style="color:#009688;font-size:20px" align-center justify-center row fill-height>
                    YOUR MAX SCORE IS
                </v-layout>
                <v-layout   style="color:#009688;font-size:20px" align-center justify-center row fill-height>
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
    }
  },

  mounted() {  
    // Поставлен ли рекорд
    this.$store.commit("setmaxCounter");

    // Если рекорд, то сохраняем значение в firebase
    if (this.$store.getters.getCounterMax < this.$store.getters.getCounter) {
      this.$store.dispatch(
        "ADD_USER_BOOK",
        this.$store.getters.getCounterMaxGame
      );
    }
  }
};
</script>

<style scoped>
</style>