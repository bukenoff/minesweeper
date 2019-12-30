<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --white: #F5F5F5;
  --yellow: #F18F01;
  --black: #0F0F0F;
  --green: #679436;
  --red: #F95738;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #0F0F0F;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: var(--green);
    }
  }
}
</style>
