<template>
    <v-app id="inspire">
        <v-content>
            <v-container>
                <v-layout style="color:#009688;font-size:20px" align-center justify-center row fill-height>
                    YOUR SCORE IS {{ counterNow }}
                </v-layout>
                <v-divider></v-divider>
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
    counterMax() {
      let maxScore = this.$store.getters.getCounterMax;
      this.$store.dispatch("ADD_USER_BOOK", maxScore);
      return maxScore;
    },
    counterNow() {
      return this.$store.getters.getCounter;
    },
    yourmaxcounter() {
      let maxScore = this.$store.getters.getCounterMax;
    }
  },
  mounted() {
    this.$store.commit("setmaxCounter");
  }
};
</script>

<style scoped>
</style>