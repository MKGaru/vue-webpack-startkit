<template>
<button type="button" @click="increment">count:{{count}}</button>
</template>

<script lang="ts">
export default {
	data(){
		return {
			count:0
		}
	},
	methods:{
		increment(){
			this.count++;
		}
	}
}
</script>