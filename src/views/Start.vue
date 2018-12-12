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
                <v-layout style="color:#009688;font-size:20px" align-center justify-center row fill-height>
                    {{ words.eng }}
                </v-layout>
                <v-container>
                    <v-layout align-center justify-center row fill-height>
    
                        <input @keyup.enter="submitans" placeholder="Введите перевод" @input="startTimer()" v-model="rusInput" style="border: solid 1px #009688">
    
                    </v-layout>
    
                </v-container>
            </v-container>
            <v-container>
                <v-layout align-center justify-center row fill-height>
                    <v-icon  @click.prevent="getHelp()" size="18">help</v-icon>
                    <span class="success--text" v-if="this.showHelp" style="font-weight: bold"> {{words.rus}} </span>
                </v-layout>
            </v-container>
    
        </v-content>
    
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                minId: 1,
                maxId: 22,
                rusInput: null,
                id: 3,
                seconds: 59,
                setInt: true,
                showHelp: false
            }
        },
        methods: {
            submitans() {
                (this.rusInput.toLowerCase().trim() === this.words.rus.toLowerCase()) ?
                this.$store.commit('incrementCounter'): console.log("no")
    
                this.id = Math.floor(Math.random() * (this.maxId - this.minId)) + this.minId
                this.rusInput = ''
            },
            counterNull() {
                this.$store.commit('counterSetNull')
            },
            startTimer() {
                if (this.setInt) {
                    this.setInt = false
                    var timeinterval = setInterval(() => {
                        var t = this.seconds
                        t = t - 1;
                        this.seconds = t
    
                        if (t <= 0) {
                            clearInterval(timeinterval);
                            this.$router.push('/score')
                        }
    
                    }, 1000);
                }
            }, 
            getHelp(){
                return this.showHelp = !this.showHelp
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.counterNull()
    
                this.id = Math.floor(Math.random() * (this.maxId - this.minId)) + this.minId
                console.log(this.maxId, this.minId);
            })
        },
        computed: {
            words() {
                return this.$store.getters.getWords.find(b => b.id == this.id)
            },
            counter() {
                return this.$store.getters.getCounter
            },
    
        },
    
    }
</script>

<style scoped>
    
</style>