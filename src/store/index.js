import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import {
  DRAW_CARD, START_GAME, RESET_GAME, REFRESH_DATA,
} from './mutation-types';

Vue.use(Vuex);

const LOCAL_STORAGE_DECK_KEY = 'LOCAL_STOGAGE_DECK_KEY';
const LOCAL_STORAGE_CARD_KEY = 'LOCAL_STORAGE_CARD_KEY';

function saveDeckToLocalStorage(deck) {
  localStorage.setItem(LOCAL_STORAGE_DECK_KEY, JSON.stringify(deck));
}

function loadDeckFromLocalStorage() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_DECK_KEY);
  return JSON.parse(savedData);
}

function saveCardToLocalStorage(currentCard) {
  localStorage.setItem(LOCAL_STORAGE_CARD_KEY, JSON.stringify(currentCard));
}

function loadCardFromLocalStorage() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_CARD_KEY);
  return JSON.parse(savedData);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function buildNewDeck() {
  const nbSuits = 4;
  const nbRanks = 13;
  const nbJockers = 2;

  const nbCards = nbSuits * nbRanks;

  const deck = [];

  for (let index = 0; index < nbCards; index += 1) {
    deck.push(
      {
        rank: (index % (nbRanks)) + 1,
        suit: parseInt(index / (nbRanks), 10),
      },
    );
  }
  for (let index = 0; index < nbJockers; index += 1) {
    deck.push(
      {
        rank: 0,
        suit: nbSuits,
      },
    );
  }
  shuffle(deck);
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
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
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
      console.log(state.deck);
      state.currentCard = state.deck.shift(); // drawRandomCard(state.deck);
      state.gameOngoing = true;
    },
    [DRAW_CARD](state) {
      state.currentCard = state.deck.shift(); // drawRandomCard(state.deck);
      saveDeckToLocalStorage(state.deck);
      saveCardToLocalStorage(state.currentCard);
    },
    [RESET_GAME](state) {
      state.deck = buildNewDeck();
      state.currentCard = drawRandomCard(state.deck);
    },
    [REFRESH_DATA](state) {
      if (!state.gameOngoing) {
        const savedDeck = loadDeckFromLocalStorage();
        const savedCard = loadCardFromLocalStorage();
        if (savedDeck.length > 0) {
          state.deck = savedDeck;
          state.currentCard = savedCard;
        } else {
          state.deck = buildNewDeck();
          state.currentCard = drawRandomCard(state.deck);
        }
        state.gameOngoing = true;
      }
    },
  },
});
