<template>
    <div class='mb-4'>
        <b-navbar toggleable="lg" type="light" variant="light">
            <router-link to='/' tag='b-navbar-brand'>Stock Trader</router-link>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav>
                    <router-link to='/portfolio' tag='b-nav-item'>Portfolio</router-link>   
                    <router-link to='/stocks' tag='b-nav-item'>Stocks</router-link>
                </b-navbar-nav>
                
                <b-navbar-nav class="ml-auto">
                    <b-nav-item @click='endDay'>End Day</b-nav-item>
                    
                    <b-nav-item-dropdown text="Save & Load" right>
                    <b-dropdown-item @click='uploadData(dataReady)'>Save Data</b-dropdown-item>
                    <b-dropdown-item @click='retrieveData()'>Load Data</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item>Funds: ${{ this.$store.state.funds }}</b-nav-item>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

// import { mapMutations } from 'vuex'

export default {
    methods: {
            // ...mapMutations([
            //     'addData'
            // ]),
        endDay() {
            for (let i = 0; i < this.$store.state.stocks.length; i++) {
                const num = this.$store.state.stocks[i].price
                const minimum = num-15;
                const maximum = num+15;
                this.$store.state.stocks[i].price = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            }        
        },
        uploadData(data) {
            this.$http.post('https://stock-trader-2278a.firebaseio.com/stockData.json', data)
                    .then(response => {
                        console.log(response)
                    }, error => {
                        console.log(error)
                    });
        },
        retrieveData() {
            this.$http.get('https://stock-trader-2278a.firebaseio.com/stockData.json')
                    .then(response => {
                        return response.json(); 
                    })
                    .then(data => {
                        let dataArray = [];
                        for (let stock in data) {
                            dataArray.push(data[stock]);
                        }
                        this.$store.state.funds = dataArray[dataArray.length-1].funds;
                        this.$store.state.portfolio = dataArray[dataArray.length-1].stocks;
                        this.$store.state.stocks = dataArray[dataArray.length-1].stocksAvailable;
                        // console.log(data)
                        // console.log(data.funds)
                        // this.$store.state.funds = data.funds;
                        // this.$store.state.portfolio = data.stocks;
                    })
        }
    },
    computed: {
        dataReady() {
            return {
                funds: this.$store.state.funds,
                stocks: this.$store.state.portfolio,
                stocksAvailable: this.$store.state.stocks,
            }
        }
    }
}

</script>