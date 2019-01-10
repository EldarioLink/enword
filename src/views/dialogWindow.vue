<template>
    <v-layout justify-end>
        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="900">
                <v-btn v-if="showIcon" slot="activator" fab dark color="indigo">
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
                        </v-container>
                        <v-divider></v-divider>
                        <v-container>
                            <v-layout v-if="!hideWordsSection" mt-4 align-center justify-center>
                                <v-btn @click="showDeleteWords" color="error">Показать слова</v-btn>
                            </v-layout>
                            <v-layout v-else align-center justify-center>
                                <v-btn @click="hideWords" color="error">Скрыть слова</v-btn>
                                <v-btn @click="saveWordsDB" color="success">ОК</v-btn>
                            </v-layout>

                        </v-container>

                        <!-- dddddddddddd-->
                        <v-container v-show="hideWordsSection" grid-list-md text-xs-center>
                            <v-layout v-if="existWordForDelete" row wrap>
                                <v-flex xs4 v-for="word in collection" :key="word.id">
                                    {{ word.eng }}
                                    <v-icon @click="deleteItem(word)" size="15">close</v-icon>
                                </v-flex>
                            </v-layout>
                            <v-layout v-else row wrap>
                                <v-card-text style="font-size:20px" class="red--text" align-center justify-center>
                                    Нет добавленных слов!
                                </v-card-text>
                            </v-layout>
                        </v-container>
                    </v-content>
                </v-card>
            </v-dialog>
        </div>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false,
                eng: undefined,
                rus: undefined,
                showingDone: false,
                hideWordsSection: false,
                isWordExist: true,
                deleted: []
            };
        },
        methods: {
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
                        this.hideWordsSection = false
                        if (this.showingDone == false) {
                            this.showingDone = !this.showingDone
                        }
                    });
                });
            },
            showDeleteWords() { //  Загружаем слова в массив удаляемых слов
                this.$store.dispatch('LENGTH_DATA_WORDS').then((length) => {
                    if (length != 0 && length == this.$store.getters.getWords.length) { //  если новое слово не добавлено, то берем слова изсущ-ей базы
                        this.$store.commit('SET_WORDS_DIALOG', this.$store.getters.getWords)
                    }
                    this.hideWordsSection = !this.hideWordsSection
                })
            },
            hideWords() { //  Скрываем сецию удаляемых слов
                this.hideWordsSection = false;
            },
            deleteItem(m) { //  Удаляем слова из массива
                this.deleted = _.remove(this.$store.getters.getdeleteWords, function(el) {
                    return el.id === m.id;
                });

                if (this.$store.getters.getdeleteWords == 0) {
                    this.isWordExist = false
                }
            },
            saveWordsDB() { //  Загружаем слова в массив удаляемых слов
                this.$store.dispatch('LENGTH_DATA_WORDS').then((length) => {
                    this.$store.dispatch("LOAD_WORDS_TO_DB", length).then(() => {});
                })
            }
        },
        computed: {
            activeBtn() {
                return !!this.eng && !!this.rus;
            },
            activeDone() {
                return !this.eng && !this.rus && this.showingDone
            },
            existWordForDelete() {
                return this.$store.getters.getdeleteWords.length != 0 && this.isWordExist
            },
            collection() {
                this.deleted
                return this.$store.getters.getdeleteWords
            },
            showIcon() {
                return this.$store.getters.isUserAuthenticated
            }
        }
    };
</script>
