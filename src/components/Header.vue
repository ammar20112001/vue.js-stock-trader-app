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
                    <b-dropdown-item href="#">Save Data</b-dropdown-item>
                    <b-dropdown-item href="#">Load Data</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item>Funds: ${{ this.$store.state.funds }}</b-nav-item>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>

export default {
    methods: {
        endDay() {
            for (let i = 0; i < this.$store.state.stocks.length; i++) {
                const num = this.$store.state.stocks[i].price
                const minimum = num-15;
                const maximum = num+15;
                this.$store.state.stocks[i].price = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            }        
        }
    }
}

</script>