<template>
    <div>
        <b-container v-if='this.$store.state.portfolio.length===0'>
            <p class='lead'><img src="../assets/NoDataLogo.png" width="40">You don't have any stocks available!</p>
        </b-container>
        <b-container>
            <b-row>
                <b-col lg='6' v-for='stock in this.$store.state.portfolio' :key='stock' class='my-sm-2 my-lg-3'>
                    <b-card-group deck>
                        <b-card :header="stock.company + ' (price: $' + stock.price + ' | ' + 'quantity: ' + stock.quantity + ')'" header-tag="header" header-bg-variant='danger' header-text-variant='white'>
                            <b-card-text>
                                <b-row>
                                    <b-col>
                                        <b-input-group>
                                            <b-form-input :id='stock.company' placeholder='quantity' type='number'></b-form-input>
                                        </b-input-group>
                                    </b-col>
                                    <b-col>
                                        <b-button @click='sellStock(stock, stock.company)' variant="outline-danger">Sell</b-button>
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
                'fundsAdded'
            ]),
        sellStock(stock, company) {
            const inputId = company;
            let input = document.getElementById(inputId).value;
            const value = input*stock.price;
            if (input < 1 || input > stock.quantity) {
                alert('Invalid Quantity!')
                return;
            } else {
                stock.quantity -= input;
                this.fundsAdded(value);
                if (stock.quantity === 0) {
                    for (let i = 0; i < this.$store.state.portfolio.length; i++) {
                        if (this.$store.state.portfolio[i].company === company) {
                            this.$store.state.portfolio.splice(i, 1)
                            return;
                        }
                    }
                }
            }
        }
    }
}

</script>