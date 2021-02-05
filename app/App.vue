<template>
		<div class="topDiv" align="center">
			<div @dragover="dragOver(0)" >
				<!-- <div @dragenter="currentTop(index,0)"> -->
				<img v-for="(val,index) in cardList[0]" :src="getSrc(val,index,cardList[0])" :dd="index==0" :draggable="index==0||index==cardList[0].length-1"    width="10%" @dragend ="aTdrop(index,0)"/>
				<!-- </div> -->
			<!-- {{cardList[0]}}
			@mouseenter="currentTop(index,0)" 
			 -->
		</div>
		<div :dragover="dragOver(1)">

		<!-- <div @dragenter="currentTop(index,0)"> -->
			<img v-for="(val,index) in cardList[1]" :src="getSrc(val,index,cardList[1])" :draggable="index==0||index==cardList[1].length-1" 
			    width="10%" @dragend ="aTdrop(index,1)"/>
		<!-- </div> -->
			<!-- {{cardList[1]}}
			:drop="aTdrop(index,1)"
			 -->
		</div>
		 <div >{{win}}</div>
		</div>
		
</template>

<script>
// import { METHODS } from 'http'
// require("arayHelp")
var rq = require("arrayHelp/rand-lib/rand-uq");
var {compareFull} = require("arrayHelp/array.compare/index")
export default {
	data(){
		return {
			cardList:[[1,2,3],[0,1,2]],
			mousePoint:{
				index:0,
				row:0
			},
			targetOrder:Array.from(new Array(13),(v,index)=>{
				return index+1
			}),
			win: false
		}
	},
	methods:{
		getSrc:function(val,index,arr){
			if(index==0||index==arr.length-1){
				return '../img/a'+val+'.png'
			}else{
				return  '../img/back.png'
			}
		},
		currentTop(index,row){
			this.mousePoint.index = index;
			this.mousePoint.row = row;
			console.log(this.mousePoint.row,this.mousePoint.index)
		},
		aTdrop(index,row){
			if(index!=this.cardList[row].length-1  && index!==0){
				console.log("不可移动");
				return
			}
			if(this.mousePoint.index!=this.cardList[this.mousePoint.row].length-1 &&  this.mousePoint.index!==0){
				console.log("不可移动位置");
				return
			}
			var method = index==0?"shift":"pop";
			var val= this.cardList[row][method]();
			var changMethod = this.mousePoint.index ==0?"unshift":"push";
			this.cardList[this.mousePoint.row][changMethod](val);
			// if(this.mousePoint.row)
			this.win = compareFull(this.targetOrder,this.cardList[1])||compareFull(this.targetOrder,this.cardList[0])
		},
		dragOver(){
			// console.log("进来了")	
		}

	},
	mounted(){
			console.log("debug")
			var rs = rq.randUq(13).map(v=>v+1);
			this.$set(this.cardList,"0",rs.splice(0,6));
			this.$set(this.cardList,"1",rs);
			globalThis.vv = this;
			// this.cardList[0] = rs.splice(0,6);
			// this.cardList[1] = rs;
		}
}
 
</script>

<style>
.topDiv
{
	width: 100%;
	float: center;
	
}
.topDiv>div>img{
	width:10%;	
}
</style>
