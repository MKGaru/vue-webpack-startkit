<style scoped>
*{
	color:blue;
}
</style>

<template>
<div>
	<img src="./logo.png">
	<hello :name=msg />
	<counter />
	<input type="text" v-model="msg" />
</div>
</template>

<script lang="ts">
import hello from '../hello'
import counter from '../counter'

export default {
	data(){
		return {
			msg: 'world'
		}
	},
	components:{
		hello,
		counter
	}
}
</script>
