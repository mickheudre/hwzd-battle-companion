<template>
    <div  class="card">
        <div class="card-content">
          <!-- {{ rawCard }} -->
          <!-- <div class="cardHeader">{{ rawCard }}</div> -->
          <div class="cardBody">
          <img class="card-img" :src='cardImage' />
          <div class="cardHeader">{{ rawCard }}</div>
            <div class="title">
                <h3> {{ cardTitle }} </h3>
            </div>
            <div class="actions" v-if="cardTitle != 'Complication'">
            <div class="action"> {{ cardPrimaryAction }}</div>
            <div class="main-divider" v-if="cardSecondaryAction != ''">
                <hr class="divider"/>
                <div class="divider-text">OR</div>
                <hr class="divider"/>
            </div>
            <div class="action" v-if="cardSecondaryAction != ''"> {{ cardSecondaryAction }}</div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['card'],
  data() {
    return {
      suits: ['♣️', '♦️', '♥️', '♠', 'J'],
      ranks: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
      boggeyTypes: ['Grunt', 'Elite', 'Boss', 'Complication'],
      actionTypes: ['Command', 'Technical', 'Support', 'Attack', 'Complication'],
      primaryAction: ['If the active boogey has LOS, then it attacks the nearest character to which it can draw LOS, then gains a support token'],
      secondaryAction: ['It moves towards the nearest hero and gains a support token.'],
    };
  },
  computed: {
    currentGrunt() {
      switch (this.card.rank) {
        case 0:
          return 'Complication';
        case 1:
          return 'Boss';
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          return 'Grunt';
        case 11:
        case 12:
        case 13:
          return 'Elite';
        default:
          return '';
      }
    },
    currentAction() {
      return this.actionTypes[this.card.suit];
    },
    cardTitle() {
      if (this.currentGrunt === 'Complication') {
        return 'Complication';
      }
      return `${this.currentGrunt}  ${this.currentAction} Action`;
    },
    rawCard() {
      return `${this.ranks[this.card.rank]}${this.suits[this.card.suit]}`;
    },
    cardImage() {
      switch (this.currentAction) {
        case 'Command':
          // eslint-disable-next-line global-require
          return require('@/assets/binoculars.png');
        case 'Support':
          // eslint-disable-next-line global-require
          return require('@/assets/helicopter.png');
        case 'Technical':
          // eslint-disable-next-line global-require
          return require('@/assets/technical.png');
        case 'Attack':
          // eslint-disable-next-line global-require
          return require('@/assets/attack.png');
        default:
          // eslint-disable-next-line global-require
          return require('@/assets/complication.png');
      }
    },
    cardPrimaryAction() {
      let action = '';
      switch (this.currentAction) {
        case 'Command':
          action = 'If the active boogey has LOS, then it attacks the nearest character to which it can draw LOS, then gains a support token';
          break;
        case 'Technical':
          action = 'The active bogey gains a support token AND the nearest not-targeted character becomes targeted';
          break;
        case 'Support':
          action = 'If there is at least one down bogey, the down bogey closest to a hero is no longer down AND the active bogey and the nearest other bogey both get a support token.';
          break;
        case 'Attack':
          action = 'If the active bogey has LOS, then the bogey attacks the nearest character who is not OOA to which it can draw LOS AND then moves towards the nearest character in LOS who is not OOA.';
          break;
        default:
          action = '';
      }
      return action;
    },
    cardSecondaryAction() {
      let action = '';
      switch (this.currentAction) {
        case 'Command':
          action = 'If the active bogey does not have LOS, the bogey moves towards the nearest hero and gains a support token.';
          break;
        case 'Technical':
          action = 'If all characters are already targeted, the active bogey attacks the nearest character. This attack does not need LOS but all other rules apply.';
          break;
        case 'Support':
          action = '';
          break;
        case 'Attack':
          action = 'If the active bogey does not have LOS, the bogey moves towards the nearest hero.';
          break;
        default:
          action = '';
      }
      return action;
    },
  },
};
</script>

<style  scoped>

@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Open+Sans&display=swap');

.card {
/* a standart card size is 63 x 88 mm */
  width: 252px;
  height: 352px;
  background-color: white;
  border-radius: 5px;
  border: 2px solid #f3f3f3;
  padding: 10px;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.15);
  -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.15);
  box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.15);
}

.card-content {
    background-color: #f3f3f3;
    height: 100%;
    display: flex;
    justify-content: center;
}

.cardBody {
    display:flex;
    padding-right: 10px;
    padding-left: 10px;
    flex-direction: column;
    justify-content: center;
}
.title {
    margin: 0px 10px;
}

.title h3 {
    font-family: 'Merriweather', serif;
    font-size: 20px;
    color: #272727;
    margin: 0 0 10px 0;
}

.action {
    font-size: 10px;
    color: #272727;
    margin: 0px 10px;
}

.main-divider {
    margin: 5px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    opacity: 0.7;
}

.divider {
    margin: 2px;
    height: 0;
    border-style: solid;
    background-color: #707070;
    border-color: #707070;
    color:#707070;
    display: flex;
    align-self: center;
    width: 100%;
}

.divider-text {
    margin-right: 10px;
    margin-left: 10px;
    font-weight: 600;
    font-size: 12px;
    display: flex;
    color: #707070
}

.card-img {
  height: 100px;
  mix-blend-mode: multiply;
  margin-left: auto;
  margin-right: auto;
  margin: 20px auto 20px auto;
  opacity: 0.7;
}

.cardHeader {
  font-size: 12px;
  margin: 0 10px;
}

</style>
