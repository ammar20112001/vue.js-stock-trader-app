<template>
    <div>
        <b-container>
            <b-row>
                <b-col lg='6' v-for='stock in this.$store.state.stocks' :key='stock' class='my-sm-2 my-lg-3'>
                    <b-card-group deck>
                        <b-card :header="stock.company + ' (price: $' + stock.price + ')'" header-tag="header" header-bg-variant='info' header-text-variant='white'>
                            <b-card-text>
                                <b-row>
                                    <b-col>
                                        <b-input-group>
                                            <b-form-input :id='stock.company' placeholder='quantity' type='number'></b-form-input>
                                        </b-input-group>
                                    </b-col>
                                    <b-col class='pr-0 ml-auto'>
                                        <b-button @click='addStock(stock, stock.company)' variant='outline-info'>Buy</b-button>
                                    </b-col>
                                </b-row>   
                            </b-card-text>
                        </b-card>
                    </b-card-group>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
    methods: {
            ...mapMutations([
                'fundsRemoved'
            ]),
        addStock(stock, company) {
            const inputId = company;
            let input = parseInt(document.getElementById(inputId).value);
            let value = input * stock.price
            if (value <= this.$store.state.funds) {
                if (input === null || input < 1) {
                    return;
                } 
                for (let i = 0; i < this.$store.state.portfolio.length; i++) {
                    if (this.$store.state.portfolio[i].company === stock.company) {
                        this.$store.state.portfolio[i].quantity += input;
                        this.fundsRemoved(value);
                        input = null;
                        return;
                    } 
                }
                this.$store.state.portfolio.push(stock);
                this.$store.state.portfolio[this.$store.state.portfolio.length-1].quantity = input;
                this.fundsRemoved(value);
                input = null;
            } else {
                alert('Not enough funds available!')
            }
        }    
    }
}

</script>

