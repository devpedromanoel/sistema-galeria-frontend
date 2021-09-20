<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>

      <!-- NEW - add a route to the profile page -->
      <router-link v-if="$auth.isAuthenticated" to="/profile"> | Profile </router-link>

      <router-link v-if="$auth.isAuthenticated" to="/feed"> | Feed</router-link>
      <router-link v-if="$auth.isAuthenticated && $auth.user.sub !== 'auth0|61465c5ac6bc56006965ead1' && $auth.user.sub !== 'auth0|61465c3744672c00694ce41f'" to="/request"> | Request</router-link>
      <router-link v-if="$auth.isAuthenticated && $auth.user.sub === 'auth0|61465c5ac6bc56006965ead1' || $auth.user.sub === 'auth0|61465c3744672c00694ce41f' " to="/approve"> | Approve</router-link>
    </div>
    <router-view />
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media screen and (max-width: 900px) {
  #app {
    padding: 0 10px;
  }
}
</style>
