<template>
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
                        </v-container>
                        <v-divider></v-divider>
                        <v-container>
                            <v-layout mt-4 align-center justify-center>
                                <v-btn v-if="!hideWordsSection" @click="showDeleteWords" color="error">Показать слова</v-btn>
                                <v-btn v-else @click="hideWords" color="error">Скрыть слова</v-btn>
                            </v-layout>
                        </v-container>

                        <!-- dddddddddddd-->
                        <v-container v-show="hideWordsSection" grid-list-md text-xs-center>
                            <v-layout v-if="existWordForDelete" row wrap>
                                <v-flex xs4 v-for="word in collection" :key="word.id">
                                    {{ word.eng }}
                                    <v-icon @click="deleteItem(word)" size="15">close</v-icon>
                                </v-flex>
                                <v-container align-center>
                                    <v-btn v-for="p in pagination.pages" :key="p.id" @click.prevent="setPage(p)">{{ p }}</v-btn>
                                </v-container>
                                <v-container align-center>
                                    Displaying from {{ pagination.startIndex + 1 }} to {{ pagination.endIndex + 1 }}
                                </v-container>
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
                perPage: 15,
                pagination: {},
                hideWordsSection: false,
                isWordExist: true
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
                        if (this.showingDone == false) {
                            this.showingDone = !this.showingDone
                        }
                    });
                });
            },
            showDeleteWords() {
                this.$store.dispatch("deleteWords").then(() => {
                    this.setPage(1);
                    this.hideWordsSection = !this.hideWordsSection
                })
            },
            setPage(p) {
                this.pagination = this.paginator(this.$store.getters.getdeleteWords.length, p)
            },
            paginate(array) {
                return _.slice(array, this.pagination.startIndex, this.pagination.endIndex + 1)
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
            deleteItem(m) {
                this.deleted = _.remove(this.$store.getters.getdeleteWords, function(el) {
                    return el.id === m.id;
                });
                this.setPage(2);     // надо сделать чтобы оставалась на этой странице - сначала сделать удаление
                if (this.$store.getters.getdeleteWords == 0) {
                    this.isWordExist = false
                }

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
                return this.paginate(this.$store.getters.getdeleteWords)
            },
        }
    };
</script>
