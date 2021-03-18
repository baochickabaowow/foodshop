<template>
    <div>
        <br>
        <br>
        <br>
        <p> Menu: </p>
        <ul>
            <li v-for="item in itemsSelected" :key='item[0]'>
                {{item[0]}} x {{item[1]}}
            </li>
        </ul>
        <button id = "findTotal" v-on:click="findTotal(); sendOrder()">Add Order</button>
        <p v-show="clicked">Subtotal: ${{ this.subTotal }}</p>
        <p v-show="clicked">Grand Total: ${{ this.grandTotal }}</p>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    name: 'Basket',
    props: {
        itemsSelected: {
            type: Array
        },
        items: {
            type: Array
        }
    },
    data () {
        return {
            subTotal: 0,
            clicked: false
        }
    },

    methods: {
        findTotal: function() {
            for (var i = 0; i < this.itemsSelected.length; i++) {
                this.subTotal += this.itemsSelected[i][1] * this.itemsSelected[i][2]
            }
            this.clicked = true
        },
        sendOrder: function() {
            var temp = {}
            for (let i = 0; i < this.itemsSelected.length; i++) { 
                var curr = this.itemsSelected[i]
                temp[curr[0]] = curr[1]
            }

            var names = ["Prawn Omelette", "Dry Beef Hor Fun", "Sambal KangKung", "Pork Fried Rice", "Mapo Tofu", "Cereal Prawn"]
            for (let i = 0; i < names.length; i++) {
                if (!(names[i] in temp)) {
                    temp[names[i]] = 0
                }
            }
            database.collection('orders').add(temp).then(()=> { location.reload()});
        }
    },

    computed: {
        grandTotal: function() { 
            return (this.subTotal * 1.07).toFixed(2)
        }
    }
}
</script>

<style>
    li {
        flex-grow: 1;
        flex-basis: 300px;
        padding: 10px;
        margin: 10px;
    }

    #findTotal {
        height: 30px;
        width: 50px;
        background-color: lightcoral;
        color:white;
        font-size: 20px;
        border-radius: 10px;
    }
</style>