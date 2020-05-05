<template>
  <div class="page">
    <img id='main-image' src='@/assets/homepage.png' />
    <div class="game-title">
      <hr/>
    <h1>Horizon Wars</h1>
    <h4>Zero Dark</h4>
          <hr/>

    </div>
    <div class='user-action'>
      <button class="btn-primary" @click="startNewGame">Start a new game</button>
      <button class="btn-flat" @click="resumeGame" v-if="gameOngoing">Resume Game</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  computed: mapState(['gameOngoing']),
  created() {
    this.$store.commit('REFRESH_DATA');
  },
  methods: {
    startNewGame() {
      this.$store.commit('START_GAME');
      this.$router.push('/battle');
    },
    resumeGame() {
      this.$router.push('/battle');
    },
  },
};
</script>

<style>
h1 {
  font-family: "Merriweather", serif;
}

.user-action {
  display: flex;
  justify-content: flex-start;
  margin: 40px 10px;
}

.page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.game-title {
  margin-top: 10px;
}
.game-title h1 {
  margin: 0px;
}

.game-title h4 {
text-align: center;
margin: 0px;
opacity: 0.7;
text-transform: uppercase;
font-weight: 400;
}

#main-image {
  height: 300px;
}
</style>
