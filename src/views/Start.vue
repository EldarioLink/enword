<template>
  <v-app id="inspire">
    <v-content>
      <v-container>
        <v-layout style="color:#009688;font-size:20px" align-center justify-end row fill-height>TIME: {{ this.seconds }}</v-layout>
        <v-layout style="color:#009688;font-size:20px" align-center justify-end row fill-height>COUNTER: {{counter}}</v-layout>
      </v-container>
      <v-container>
        <v-layout v-if="words" style="color:#009688;font-size:20px" align-center justify-center row fill-height>{{ words.eng }}</v-layout>
        <v-layout v-else align-center justify-center row fill-height>
          <v-icon>hourglass_empty</v-icon>
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
          <span class="success--text" v-if="this.showHelp" style="font-weight: bold">{{words.rus}}</span>
        </v-layout>
      </v-container>
      <dialogWindow></dialogWindow>
    </v-content>
  </v-app>
</template>

<script>
  import dialogWindow from './dialogWindow.vue'
  export default {
    components: {
      dialogWindow,
    },
    data() {
      return {
        minId: 1,
        maxId: undefined,
        rusInput: null,
        id: 1,
        seconds: 59,
        setInt: true,
        showHelp: false,
        timeinterval: undefined,
        dialog: false,
        eng: undefined,
        rus: undefined,
        showingDone: false,
        perPage: 15,
        pagination: {},
        hideWordsSection: false,
      };
    },
    methods: {
      submitans() {
        if (this.rusInput.toLowerCase().trim() === this.words.rus.toLowerCase())
          this.$store.commit("incrementCounter");
        this.showHelp = false;
        this.id =
          Math.floor(
            Math.random() * (this.$store.getters.getmaxId - this.minId)
          ) + this.minId;
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
      addwords() {
        this.$store.dispatch("LENGTH_DATA_WORDS").then(length => {
          let obj = {
            eng: this.eng,
            rus: this.rus,
            length: length
          };
          this.$store.dispatch("ADD_NEW_WORDS", obj).then(() => {
            this.rus = '',
              this.eng = '';
            if (this.showingDone == false) {
              this.showingDone = !this.showingDone
            }
          });
        });
      },
      deleteWord() {
        this.$store.dispatch("deleteWords").then(() => {
          this.setPage(1);
          this.hideWordsSection = !this.hideWordsSection
        })
      },
      setPage(p) {
        this.pagination = this.paginator(this.$store.getters.getdeleteWords.length, p)
      },
      paginate(abrakadabra) {
        return _.slice(abrakadabra, this.pagination.startIndex, this.pagination.endIndex + 1)
      },
      paginator(totalItems, currentPage) {
        var startIndex = (currentPage - 1) * this.perPage,
          endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1);
        return {
          currentPage: currentPage,
          startIndex: startIndex,
          endIndex: endIndex,
          pages: _.range(1, Math.ceil(totalItems / this.perPage) + 1)
        };
      },
      hideWords() {
        this.hideWordsSection = false;
      },
      machine(m) {
        console.log(m.id)
      }
    },
    created() {
      this.setPage(1);
    },
    mounted() {
      this.counterNull();
      this.maxId = this.$store.getters.getmaxId;
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
      activeBtn() {
        return !!this.eng && !!this.rus;
      },
      activeDone() {
        return !this.eng && !this.rus && this.showingDone
      },
      existWordForDelete() {
        return this.$store.getters.getdeleteWords.length != 0
      },
      collection() {
        return this.paginate(this.$store.getters.getdeleteWords)
      },
    }
  };
</script>

<style scoped>

</style>
