<template>
  <div class="topDiv" align="center">
    <div @dragover="dragOver(0)">
      <div width="5%" @dragenter="currentTop(0, 0)">
        <img src="./card.img/side.png" width="90%" />
      </div>

      <div v-for="(val, index) in cardList[0]" width="10%">
        <img
          :src="getSrc(val, index, cardList[0])"
          :dd="index == 0"
          :draggable="index == 0 || index == cardList[0].length - 1"
          @dragstart="currentTop(index, 0)"
          @dragend="aTdrop(index, 0)"
          width="80%"
        />
      </div>
      <div width="5%" @dragenter="currentTop(cardList[0].length - 1, 0)">
        <img src="./card.img/side.png" width="90%" />
      </div>
    </div>

    <div :dragover="dragOver(1)">
      <div width="5%" @dragenter="currentTop(0, 1)">
        <img src="./card.img/side.png" width="90%" />
      </div>

      <div v-for="(val, index) in cardList[1]" width="10%">
        <img
          :src="getSrc(val, index, cardList[1])"
          :draggable="index == 0 || index == cardList[1].length - 1"
          @dragend="aTdrop(index, 1)"
          @dragstart="currentTop(index, 1)"
          width="80%"
        />
      </div>

      <div width="5%" @dragenter="currentTop(cardList[1].length - 1, 1)">
        <img src="./card.img/side.png" width="90%" />
      </div>
    </div>
    <div>{{ win ? "你赢了" : "游戏中" }}</div>
    <div><img src="./card.img/restart.png" @click="init2()" width="10%" /></div>
    <div>
      游戏说明：拖动两列边缘的纸牌到其他边缘放置的位置，直到卡牌形成两列同花色从小到大的两行，游戏结束
    </div>
    <div>
      共计次数：{{ mtime }}<br /><img src="./card.img/win.png" :hidden="!win" />
    </div>
  </div>
</template>

<script>
var rq = require("arrayHelp/rand-lib/rand-uq");
var { compareFull } = require("arrayHelp/array.compare/index");
export default {
  data() {
    return {
      cardList: [
        [1, 2, 3],
        [0, 1, 2],
      ],
      mousePoint: {
        index: 0,
        row: 0,
      },
      targetOrder: [
        Array.from(new Array(13), (v, index) => {
          return index + 1;
        }),
        Array.from(new Array(13), (v, index) => {
          return index + 14;
        }),
      ],
      win: false,
      mtime: 0,
      modStat: 1,
    };
  },
  methods: {
    getSrc: function (val, index, arr) {
      // if(index==0||index==arr.length-1){
      // 	var cardNum = val.toString().padStart(4,'0')
      // 	return `./card.img/${cardNum}.png`
      // }else{
      // 	return  './card.img/back.png'
      // }
      var cardNum = val.toString().padStart(4, "0");
      return `./card.img/${cardNum}.png`;
    },
    currentTop(index, row) {
      // if(this.index==-1&&this.row==-1){
      // 	setTimeout(()=>{
      // this.mousePoint.index = index;
      // this.mousePoint.row = row;
      // 	},700)
      // }
      this.mousePoint.index = index;
      this.mousePoint.row = row;
      console.log("目标", this.mousePoint.row, this.mousePoint.index);
    },

    aTdrop(index, row) {
      if (index != this.cardList[row].length - 1 && index !== 0) {
        console.log("不可移动");
        return;
      }
      if (
        this.mousePoint.index !=
          this.cardList[this.mousePoint.row].length - 1 &&
        this.mousePoint.index !== 0
      ) {
        console.log("不可移动位置");
        return;
      }
      var method = index == 0 ? "shift" : "pop";
      var val = this.cardList[row][method]();
      var changMethod = this.mousePoint.index == 0 ? "unshift" : "push";
      this.cardList[this.mousePoint.row][changMethod](val);
      // if(this.mousePoint.row)
      this.mtime++;
      this.checkWin();
      // this.win = compareFull(this.targetOrder,this.cardList[1])||compareFull(this.targetOrder,this.cardList[0])
    },
    dragOver() {},
    checkWin() {
      this.win =
        (compareFull(this.targetOrder[0], this.cardList[1]) &&
          compareFull(this.targetOrder[1], this.cardList[0])) ||
        (compareFull(this.targetOrder[1], this.cardList[1]) &&
          compareFull(this.targetOrder[0], this.cardList[0]));
    },

    init2() {
      var rs = rq.randUq(26).map((v) => v + 1);
      this.$set(this.cardList, "0", rs.splice(0, 13));
      this.$set(this.cardList, "1", rs);
    },
  },
  mounted() {
    if (this.modStat == 1) {
      this.init2();
    }
    globalThis.vv = this;
  },
};
</script>

<style>
.topDiv {
  width: 100%;
  float: center;
}
.topDiv > div {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* float: center; */
}
.topDiv > div > div {
  /* float: left;	 */
}
.topDiv > div > img {
  /* width:10%;	 */
}
</style>
