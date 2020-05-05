<template>
  <div id="app">
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>

export default {
  name: 'App',
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Open+Sans:wght@400;400;600&display=swap');
@import '~animate.css/animate.min.css';

html {
  height: 100%;
}

body {
  background: white;
  background-attachment: fixed;
  height: 100%;
  margin: 0px
}

#app {
  font-family: 'Open Sans', sans-serif;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

main {
  margin: 0px auto;
  background-color: white;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

}

.page {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

button.btn-flat {
    padding-top: 16px;
    padding-bottom: 16px;
    padding-right: 32px;
    padding-left: 32px;
    border-style: none;
    background-color: white;
    color: black;
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
}

button.btn-flat:hover {
  text-decoration: underline;
}

button.btn-primary {
    padding-top: 16px;
    padding-bottom: 16px;
    padding-right: 32px;
    padding-left: 32px;
    background-color: black;
    border-style: none;
    border-radius: 2px;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
    -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
}

button.btn-primary:hover {
    -webkit-box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.2);
    -moz-box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.2);
    box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.2);
    transform: translateY(-1px);

}

button.btn-primary:active {
    -webkit-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.25);
    -moz-box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.25);
    box-shadow: 1px 1px 3px 3px rgba(0,0,0,0.25);
    transform: translateY(1px);

}

</style>
