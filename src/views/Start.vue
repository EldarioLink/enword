<template>
    <v-app id="inspire">
        <v-content>
            <v-container>
                <v-layout align-center justify-end row fill-height>
    
                    COUNTER: {{ getTimeRemaining }}
                </v-layout>
                <v-layout align-center justify-end row fill-height>
                    COUNTER: {{counter}}
                </v-layout>
            </v-container>
            <v-container>
                <v-container>
                    <v-layout align-center justify-center row fill-height>
    
                        {{ words.eng }}
    
                    </v-layout>
    
                </v-container>
                <v-container>
                    <v-layout align-center justify-center row fill-height>
    
                        <input @keyup.enter="submitans" v-model="rusInput" autofocus style="border: solid 1px black">
    
                    </v-layout>
    
                </v-container>
            </v-container>
    
        </v-content>
    
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                rusInput: undefined,
                id: 1,
                seconds: 59
            }
        },
        methods: {
            submitans() {
                (this.rusInput.toUpperCase().trim() === this.words.rus.toUpperCase()) ? this.$store.commit('increment'): console.log("no")
     
                if (this.id < 6) {
                    this.id += 1
                } else {
                    this.id = 1
                }
                this.rusInput = ''
    
            }, 
        },
        computed: {
            words() {
                return this.$store.getters.getWords.find(b => b.id == this.id)
            },
            counter() {
                return this.$store.getters.getCounter
            },
            getTimeRemaining() { 
                var t = this.seconds
                var timeinterval = setInterval(function() {
                    t = t - 1;
                    console.log("he" + " " + t)
                    if (t <= 0) {
                        clearInterval(timeinterval);
                    }
                    return this.seconds  
                }, 1000);
    
            },
    
        }
    }
</script>

<style scoped>
    
</style>