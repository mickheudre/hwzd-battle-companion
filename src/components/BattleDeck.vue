<template>
<div class="page">
  <div class="header">
      {{ nbCardsInDeck}} cards left
    </div>
  <div class="battlemat" >
    <transition mode="out-in"
    enter-active-class="animated flipInY faster" leave-active-class="animated flipOutY faster">
    <Card :key="`${currentCard.rank}${currentCard.suit}`"
    v-if="nbCardsInDeck > 0" :card="currentCard"/>
    </transition>
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
  methods: {
    drawCard() {
      this.$store.commit('DRAW_CARD');
    },
    resetGame() {
      this.$store.commit('RESET_GAME');
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

.player {
  margin: 40px 10px;
}

.card {
    animation-delay: none;
}

</style>
