<template>
  <div class="hello">
    <h1>Galeria</h1>
    <p v-if="$auth.isAuthenticated"> Você está logado!</p>
    <div v-if="!$auth.isAuthenticated"><div><h3>Você não está logado!</h3></div><div>Para entrar como administrador, use "esposa" como username e "12345678" como senha.</div><div>Para entrar como usuário comum, use "convidado" como username e "12345678" como senha.</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
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
