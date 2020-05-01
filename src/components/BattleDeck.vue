<template>
<div class="page">
  <div class="header">
      {{ nbCardsInDeck}} cards left
      <button @click="save"> Save </button>
      <button @click="resetGame"> Reset </button>
    </div>
  <div class="battlemat" >
    <Card v-if="nbCardsInDeck > 0" :card="currentCard"/>
      <h1 v-if="nbCardsInDeck == 0">Game Over</h1>
      <div class="player" >
        <button class="btn-primary" @click="drawCard" v-if="nbCardsInDeck > 0">
          Draw a card
        </button>
        <button class="btn-primary" @click="startGame" v-if="nbCardsInDeck == 0">
          Start a new game
        </button>

      </div>
  </div>
  </div>
</template>

<script>

import Card from './Card.vue';

export default {
  name: 'BattleDeck',
  components: {
    Card,
  },
  created() {
    if (!this.$store.state.gameOngoing || this.nbCardsInDeck === 0) {
      this.$store.commit('buildDeck');
      this.$store.commit('DRAW_CARD');
    }
  },
  methods: {
    drawCard() {
      this.$store.commit('DRAW_CARD');
    },
    save() {
      this.$store.commit('saveGame');
    },
    resetGame() {
      this.$store.commit('resetGame');
      this.$store.commit('drawCardFromDeck');
    },
    startGame() {
      this.$store.commit('START_GAME');
    },
  },
  computed: {
    nbCardsInDeck() {
      return this.$store.getters.nbCardsInDeck;
    },
    currentCard() {
      return this.$store.state.currentCard;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.page {
  height: 100%;
}

.header {
  margin: 20px;
  font-style: italic;
  display: flex;
  flex-direction: row;
  justify-content:flex-end;
}

.battlemat {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

</style>
