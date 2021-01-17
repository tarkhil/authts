<template>
<div class="hello">
  {{ fakeGetter }}
  <div v-if="$store.userName !== null">
    Hello {{ $store.getters.userName }}!
  </div>
  <div v-else>
    How can it be - no username?
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import firebase from 'firebase';

@Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
    get fakeGetter() {
	console.log("fake getter fired");
	return("logged");
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
