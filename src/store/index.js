import Vue from 'vue';
import Vuex from 'vuex';

import { DRAW_CARD, START_GAME } from './mutation-types';

Vue.use(Vuex);

const LOCAL_STORAGE_DECK_KEY = 'LOCAL_STOGAGE_DECK_KEY';

function saveDeckToLocalStorage(deck) {
  localStorage.setItem(LOCAL_STORAGE_DECK_KEY, JSON.stringify(deck));
}

function loadDeckFromLocalStorage() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_DECK_KEY);
  return JSON.parse(savedData);
}

function buildNewDeck() {
  const deck = [];
  const nbCards = 52;
  const nbColors = 4;
  const nbCardsPerColor = nbCards / nbColors;
  for (let index = 0; index < nbCards; index += 1) {
    deck.push(
      {
        value: (index % (nbCardsPerColor)) + 1,
        color: parseInt(index / (nbCardsPerColor), 10),
      },
    );
  }
  deck.push(
    {
      value: -1,
      color: -1,
    },
  );
  deck.push(
    {
      value: -1,
      color: -1,
    },
  );

  return deck;
}

function drawRandomCard(deck) {
  if (deck.length > 0) {
    const randomCardIndex = Math.floor(Math.random() * Math.floor(deck.length));
    const card = deck[randomCardIndex];
    deck.splice(randomCardIndex, 1);
    return card;
  }
  return null;
}

export default new Vuex.Store({
  state: {
    gameOngoing: false,
    deck: [],
    currentCard: {},
  },
  getters: {
    nbCardsInDeck(state) {
      return state.deck.length;
    },
  },
  mutations: {
    [START_GAME](state) {
      state.deck = buildNewDeck();
      state.currentCard = drawRandomCard(state.deck);
      state.gameOngoing = true;
    },
    buildDeck(state) {
      const savedDeck = loadDeckFromLocalStorage();
      if (savedDeck.length > 0) {
        state.deck = savedDeck;
      } else {
        state.deck = buildNewDeck();
      }
      state.gameOngoing = true;
    },
    resetGame(state) {
      state.deck = buildNewDeck();
    },
    drawCardFromDeck(state) {
      if (state.deck.length > 0) {
        const randomCardIndex = Math.floor(Math.random() * Math.floor(state.deck.length));
        state.currentCard = state.deck[randomCardIndex];
        state.deck.splice(randomCardIndex, 1);
      }
    },
    [DRAW_CARD](state) {
      state.currentCard = drawRandomCard(state.deck);
      saveDeckToLocalStorage(state.deck);
    },
    saveGame(state) {
      saveDeckToLocalStorage(state.deck);
    },
  },
});
