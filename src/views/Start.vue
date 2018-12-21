<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-layout style="color:#009688;font-size:20px" align-center justify-end row fill-height>
  
          TIME: {{ this.seconds }}
        </v-layout>
        <v-layout style="color:#009688;font-size:20px" align-center justify-end row fill-height>
          COUNTER: {{counter}}
        </v-layout>
      </v-container>
      <v-container>
        <v-layout v-if="words" style="color:#009688;font-size:20px" align-center justify-center row fill-height>
          {{ words.eng }}
        </v-layout>
        <v-layout v-else align-center justify-center row fill-height>
          <v-icon>restore</v-icon>
        </v-layout>
        <v-container>
          <v-layout align-center justify-center row fill-height>
  
            <input @keyup.enter="submitans" placeholder="Введите перевод" @input="startTimer()" v-model="rusInput" style="border: solid 1px #009688">
  
          </v-layout>
  
        </v-container>
      </v-container>
      <v-container>
        <v-layout align-center justify-center row fill-height>
          <v-icon @click.prevent="getHelp()" size="18">help</v-icon>
          <span class="success--text" v-if="this.showHelp" style="font-weight: bold"> {{words.rus}} </span>
        </v-layout>
      </v-container>
      <v-layout justify-end>
        <v-btn @click="addWords()" fixed fab dark color="indigo">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-layout>
    </v-content>
  
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        minId: 1,
        maxId: undefined,
        rusInput: null,
        id: 3,
        seconds: 59,
        setInt: true,
        showHelp: false,
        timeinterval: undefined
      };
    },
    methods: {
      submitans() {
        if (this.rusInput.toLowerCase().trim() === this.words.rus.toLowerCase())
          this.$store.commit("incrementCounter");
  
        this.showHelp = false;
  
        this.id =
          Math.floor(Math.random() * (this.maxId - this.minId)) + this.minId;
  
        this.rusInput = "";
      },
      counterNull() {
        this.$store.commit("counterSetNull");
      },
      startTimer() {
        if (this.setInt) {
          this.setInt = false;
          this.timeinterval = setInterval(() => {
            var t = this.seconds;
            t = t - 1;
            this.seconds = t;
            if (t <= 0) {
              clearInterval(this.timeinterval);
              this.$router.push("/score");
            }
          }, 1000);
        }
      },
      getHelp() {
        return (this.showHelp = !this.showHelp);
      },
      addWords() {
        this.$router.push("/addword");
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.counterNull();
        this.maxId = this.$store.getters.getmaxId;
        console.log("start"+this.maxId,this.$store.getters.getmaxId)
      });
    },
    destroyed() {
      clearInterval(this.timeinterval);
    },
    computed: {
      words() { 
        return this.$store.getters.getWords.find(b => b.id == this.id);
      },
      counter() {
        return this.$store.getters.getCounter;
      },
    }
  };
</script>

<style scoped>
  
</style>