<template>
    <div>
        <button v-on:click = "addOne">+</button>
        {{counter}}
        <button v-on:click = "minusOne">-</button>
    </div>
</template>

<script>
export default {
    name: 'QuantityCounter',
    props: {
        item: Object
    },
    data: function() {
        return {
            counter:0
        }
    },
    methods: {
        addOne: function() {
            if (this.counter < 10) {
                this.counter++;
            } else {
                alert("You cannot buy more than 10 items.")
            }
            this.$emit('counter', this.item, this.counter)
        },
        minusOne: function() {
            if (this.counter > 0) {
                this.counter--;
            }
            this.$emit('counter', this.item, this.counter)
        }
    }
}
</script>

<style>
    button{
        height: 40px;
        width: 40px;
        background-color: lightcoral;
        color:white;
        font-size: 30px;
    }
    body {
        font-size: 30px;
    }

</style>