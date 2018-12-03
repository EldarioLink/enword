<template>
    <v-app id="inspire">
        <v-content>
            <v-container>
                <v-layout align-center justify-center row fill-height>
                    YOUR MAX SCORE IS
                </v-layout>
                <v-layout align-center justify-center row fill-height>
                    COUNTER: {{ counter }}
                </v-layout>
            </v-container>
        </v-content>
    
    </v-app>
</template>

<script>
    export default {
        data() {
            return {}
        },
        computed: {
            counter() {
                return this.$store.getters.getCounter
            },
        }
    
    
    }
</script>

<style scoped>
    
</style>