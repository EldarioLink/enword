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
      <v-layout justify-end>
        <div class="text-xs-center">
          <v-dialog v-model="dialog" width="900">
            <v-btn slot="activator" fab dark color="indigo">
              <v-icon dark>add</v-icon>
            </v-btn>

            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>
                Добавьте слово
              </v-card-title>

              <v-content>
                <v-container>
                  <v-layout style="color:#009688;font-size:20px" align-center justify-center row>Поле для ввода английского слова</v-layout>
                  <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
                    <input v-model="eng" style="border: solid 1px #009688">
                  </v-layout>
                </v-container>
                <v-container>
                  <v-layout style="color:#009688;font-size:20px" align-center justify-center row>Поле для ввода перевода</v-layout>
                  <v-layout style="color:#009688;font-size:20px" align-center justify-center row>
                    <input v-model="rus" style="border: solid 1px #009688">
                  </v-layout>

                  <v-layout mt-4 align-center justify-center row>
                    <v-btn @click="addwords()" v-if="activeBtn" color="success">Добавить</v-btn>
                  </v-layout>
                  <v-layout v-if="activeDone" style="font-size:20px" class="blue--text" align-center justify-center row fill-height>
                    Слово добавлено!
                  </v-layout>
                  <v-alert :value="true" color="warning" icon="warning" outline>Если вы добавите слова, то список будет содержать только их.</v-alert>
                </v-container>
                <v-divider></v-divider>
                <v-container>
                  <v-layout mt-4 align-center justify-center>
                    <v-btn @click="deleteWord" color="error">Показать слова</v-btn>
                  </v-layout>
                </v-container>


                <!-- dddddddddddd-->
                <v-container grid-list-md text-xs-center>
                  <v-layout v-if="wordsForDelete" row wrap>
                    <v-flex xs4 v-for="wordsForDelete in collection" :key="wordsForDelete">
                      <v-card-text>
                        {{ wordsForDelete }}
                      </v-card-text>
                    </v-flex>
                    <v-container align-center>
                      <v-btn v-for="p in pagination.pages" :key="p" @click.prevent="setPage(p)">{{ p }}</v-btn>
                    </v-container>
                    <v-container align-center>
                      Displaying from {{ pagination.startIndex }} to {{ pagination.endIndex }}
                    </v-container>
                  </v-layout>
                  <v-layout v-else row wrap>
                    <v-flex xs4>
                      <v-card-text>
                        Нет добавленных слов!
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-container>


              </v-content>
            </v-card>
          </v-dialog>
        </div>
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
        id: 1,
        seconds: 59,
        setInt: true,
        showHelp: false,
        timeinterval: undefined,
        dialog: false,
        eng: undefined,
        rus: undefined,
        showingDone: false,
        abrakadabra: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "j", "h", "u", "z"],
        perPage: 15,
        pagination: {}
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
      addWords() {
        this.$router.push("/addword");
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
        this.$store.dispatch("deleteWords")
      },
      setPage(p) {
        this.pagination = this.paginator(this.abrakadabra.length, p)
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
      wordsForDelete() {
        return this.$store.getters.getdeleteWords
      },
      collection() {
        return this.paginate(this.abrakadabra)
      }
    }
  };
</script>

<style scoped>

</style>
