<template>
  <div class="topDiv" align="center">
    <div :hidden="moveStat" width="10%" :style="{ left: mLeft, top: mTop }">
      <img src="./card.img/back.png" width="10%" />
    </div>
    <div @dragover="dragOver(0)" class="moveStat">
      <div width="5%" @dragenter="currentTop(0, 0)"  class="c0-0" >
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
          @touchstart="touchStart(index, 0)"
          @touchmove="touchMove($event, val)"
          @touchend="touchEnd(index,0,$event, val)"
        />
      </div>
      <div width="5%" class="c1-0"  @dragenter="currentTop(cardList[0].length - 1, 0)">
        <img src="./card.img/side.png" width="90%" />
      </div>
    </div>

    <div :dragover="dragOver(1)">
      <div width="5%" class="c0-1" @dragenter="currentTop(0, 1)">
        <img src="./card.img/side.png" width="90%" />
      </div>

      <div v-for="(val, index) in cardList[1]" width="10%">
        <img
          :src="getSrc(val, index, cardList[1])"
          :draggable="index == 0 || index == cardList[1].length - 1"
          @dragend="aTdrop(index, 1)"
          @dragstart="currentTop(index, 1)"
          width="80%"
          @touchstart="touchStart(index, 1)"
          @touchmove="touchMove($event, val)"
          @touchend="touchEnd(index,1,$event, val)"
        />
      </div>

      <div class="c1-1"
        width="5%"
        @dragenter="currentTop(cardList[1].length - 1, 1)"
        @dragover="atdragover"
      >
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
var rq = require("arrayhelp/rand-lib/rand-uq");
var { compareFull } = require("arrayhelp/array.compare/index");
module.exports = {
  data() {
    var obj= {
      cardList: [
        [1, 2, 3],
        [1, 2, 3],
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
      moveStat: false,
      mLeft: 50,
      mTop: 50,
      // mWidth"10%",
    };
	// this.init2();
  return obj
  },
  methods: {
    getSrc: function (val, index, arr) {
      // if(index==0||index==arr.length-1){
      // 	var cardNum = val.toString().padStart(4,'0')
      // 	return `./card.img/${cardNum}.png`
      // }else{
      // 	return  './card.img/back.png'
      // }
      console.log(cardNum);
      if (val == 0) debugger;
      var cardNum = val.toString().padStart(4, "0");
      return `./card.img/${cardNum}.png`;
    },
    currentTop(index, row) {
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
    touchStart(index, row, evt) {
      if (index != this.cardList[row].length - 1 && index !== 0) {
        // ev.preventDefault();
        return;
      }
      console.log(evt);
      console.log("被拖动了");
      //  oL = touch.clientX - div1.offsetLeft;
      // oT = touch.clientY - div1.offsetTop;
    },
    touchMove(e,val) {
      var ev = e;
      var touch = ev.targetTouches[0];
      var oLeft = touch.clientX;
      var oTop = touch.clientY;
      document.body.offsetWidth;

     /*  if (oLeft < 0) {
        oLeft = 0;
      } else if (oLeft >= document.body.offsetWidth) {
        oLeft = document.body.offsetWidth;
      }
      if (oTop < 0) {
        oTop = 0;
      } else if (oTop >= document.body.offsetHeight) {
        oTop = offsetHeight;
      } */
      this.mLeft = oLeft + "px";
      this.mTop = oTop + "px";
    },
	touchEnd(index,row,e,val){
		var element = document.elementFromPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
		console.log();
    var classStr=element.parentElement.getAttribute("class");
    if(classStr==""||!/c[1|0]{1}\-{1}[1|0]{1}/.test(classStr)){
      return
    }
    // console.log
    // var 

    
    this.mousePoint.row=Number( classStr[3]);
     this.mousePoint.index =Number( classStr[1]);
     if(Number( classStr[1])==1){
        this.mousePoint.index= this.cardList[this.mousePoint.row].length-1
     }
    this.aTdrop(index,row);
    // console.loh("当前牌是",val)
    // this/
	  // var dom= this.$createElement(element)
    // dom.$emit(dragend)

	},
    atdragover() {
      console.log(arguments);
    },
  },
  mounted() {
    if (this.modStat == 1) {
      this.init2();
    }
    globalThis.vv = this;
  },
};
// module.exports={default:defaul}
</script>

<style>
moveStat {
  width: 10%;
  z-index: 90;
  position: absolute;
}
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
