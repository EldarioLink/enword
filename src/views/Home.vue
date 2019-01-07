<template>
    <v-app light>
        <section>
            <v-parallax :src="require('@/assets/hero.jpeg')" height="600">
                <v-layout column align-center justify-center class="white--text">
                    <h1 class="white--text mb-2 display-1 text-xs-center">EnWord</h1>
                    <v-btn class="teal lighten-2 mt-5" dark large @click="getStart">
                        Get Started
                    </v-btn>
                </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-layout column wrap class="my-5" align-center>
                <v-flex xs12 sm4 class="my-3">
                    <div class="text-xs-center">
                        <v-container>
                            <v-layout style="font-size:20px" class="blue--text" align-center justify-center row fill-height>
                                  <v-icon x-large class="red--text text--lighten-2">insert_emoticon</v-icon>  MAX SCORE AMONG ALL USERS : {{ highScore }}
                            </v-layout>
                        </v-container>
                    </div>
                </v-flex>
                <v-flex xs12>
                    <v-container grid-list-xl>
                        <v-layout row wrap align-center>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">check_circle</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Поставьте рекорд переведенных слов</div>
                                    </v-card-title>
                                    <v-card-text>
                                        В течение одной минуты, постарайтесь правильно перевести на русский язык большее количество слов. Таймер включается после начала ввода слова!
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">info</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Есть возможность посмотреть перевод</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Во время перевода слов, у вас будет неограниченное кол-во возможности посмотреть перевод слова. Нажав на иконку<v-icon size="18">help</v-icon>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">how_to_reg</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Есть возможность добавления новых слов</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Зарегистрируйтесь, и у вас будет возможность фиксировать ваш максимальный счёт. А также появится возможность добавления новых слов!
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </section>

    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                title: 'Your Logo'
            }
        },
        computed: {
            highScore() {
                return this.$store.getters.gethighScore
            }
        },
        methods: {
            getStart() {
                this.$router.push("/start");
            }
        },
        mounted() {
            this.$store.dispatch('COMMON_MAX_SCORE_GET').then((score) => {
                this.$store.commit('SET_COMMON_SCORE', score)
            })

        }
    }
</script>

<style scoped>

</style>
