<template>
    <div>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>

        <ul>
            <li v-for = "oBasket in orders" :key = "oBasket.id">
                <div v-for = "j in oBasket.slice(1)" :key = "j">
                    <div v-for = "(quantity, dish) in j" :key = "dish">
                    {{ dish }}: {{quantity}}
                    </div>
                </div>
            <button v-bind:id= "oBasket[0]" v-on:click="deleteItems($event)">Delete</button> 
            <button v-bind:id= "oBasket[0]" v-on:click="route($event)">Modify</button> 
            </li>
        </ul>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    name: 'Orders',
    components: {
    },
    data () { 
        return {
            orders:[],
        }
    },
    methods: {
        fetchItems: function() { 
            database.collection('orders').get().then((querySnapShot) => {
                querySnapShot.forEach(doc => {
                    this.orders.push([doc.id, doc.data()])
                })
            })
        },

        route: function(event) {
            let doc_id = event.target.getAttribute("id")
            console.log(doc_id)
            this.$router.push({name: 'Modify', params: {id: doc_id}});
        },

        deleteItems: function(event) { 
            let doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then(()=> location.reload())
        },

    }, 
    created() { 
        this.fetchItems()
    }

}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 105px;
  height: 40px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>