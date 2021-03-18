<template> 
    <div id= 'app'>
        <ul> 
            <li v-for='(quantity, dish, index) in datapacket' :key='index'>
                {{dish}}: {{quantity}}
                <br>
                <input v-bind:id =index placeholder =0 type="number" and min="0">
            </li>
        </ul>
        <button v-on:click = "modifyOrder">Update Order</button>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    name: 'Modify',
    data () { 
        return {
            datapacket: {}
        }
    },
    props: {
        id: {
            type: String,
            default: 'no'
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').doc(this.id).get().then(snapshot => {
                this.datapacket=snapshot.data()
            })
        },
        modifyOrder: function() {
            var temp = {}
            for (var k in this.datapacket) {
                temp[k] = k.value
            }
            var index = 0;
            for (var dish in temp) {
                var counter = document.getElementById(index).value
                if (counter == '') {
                    temp[dish] = 0
                } else {
                    temp[dish] = counter
                }
                index ++
            }
            database.collection('orders').doc(this.id).update(temp).then(this.$router.push("orders"))
        }
    },
    created() {
        this.fetchItems();
        console.log('created')
    }

}
</script>

<style scoped>
ul{
    list-style-type:none;
    font-size: 15px;
}
button {
    background-color: lightcoral;
    width: 200px;
    height: 40px;
    border-radius: 5px;
    border-width: 1px;
    padding: 10px;
    font-size:15px;
    position: relative;
    left: 20px
}
    
</style>