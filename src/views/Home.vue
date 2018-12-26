<template>
    <v-app>
        <v-content>
            <v-container>
                <v-layout style="color:#009688;font-size:20px" align-center justify-center row fill-height>
                    MAX SCORE AMONG ALL USERS - {{  highScore }}
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        computed: {
            highScore() {
                return this.$store.getters.gethighScore
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
