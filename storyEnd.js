var QUESTION = {
 0: {
  selection: [],
  question: ["人間はなきながらこの世に生まれてくる。[　　]ばかりの世に生まれたことを悲しんでな。",
    		"それは私が[　　]のように青かった時のこと、善し悪しの判断もできず、愛の熱も知らず",
  			 "恋は目でなく[　　]で見るもの。"],
  answer: ["阿呆","サラダ","心"]
 },
 1: {
  selection: [["親戚","彼氏","動物","女"],["恋愛", "結婚", "離婚","一目惚れ"],["趣味","遊び","旅行","君"]],
  question: ["[　　]には違いないが、なれなれしくされてたまるか！",
    		 "男ってやつは口説くときだけ春で、[　　]した途端に冬になっちゃう",
  			"もし１年中お祭りだったら、[　　]も仕事と同じに退屈なものになる"],
  answer: ["親戚","結婚","遊び"]
 },
 2: {
  selection: [["雨","海","火","太陽"],["舞台","地球","役者","主役"],["心","涙","青春","ため息"]],
  question: ["[　　]の本性は濡れること、[　　]は燃えること、夜の一大原因は[　　]が見えなくなること。",
  			"この世は[　　]、ひとはみな[　　]。",
  			"恋は、[　　]と[　　]でできているもの。"],
  answer: [["雨","火","太陽"],["舞台","役者"],["ため息","涙"]]
 }
};

var order = [];
var num = 0;
var q_num = 0;
var correct = 0;
var mis = ["正解","正解","正解"];

var end_num = 6000;
var count_num = 0;

function judge() {
	alert("正答数：　" + correct + "/3 \n" +
		"タイム：" + Math.floor((count_num - 1)/100) + "秒" +
		"\n 間違えた問題の解答：" + "\n 1." + mis[0] + "\n 2." + mis[1] + "\n 3." + mis[2] );
		

	if(correct == 3){ alert("イイカンジ！");}
	else if(correct == 2){ alert("なるほど！");}
	else if (correct== 1){ alert("アレレ、、、");}
	else { alert("ダメです！！！！！！！！");}

	end_num = count_num - 1;
}

function be_checked(){
	var choose_answer = [];
	var j = 0;
	var id = ["#a1","#a2","#a3","#a4"];
	for(var i = 0; i < 4; i++) {
		if($(id[i]).is(' :checked')) {
			choose_answer[j] = QUESTION[order[num]].selection[q_num][i];
			j++;
		}
	}
	return choose_answer;
}

function go_direction(){
	if(num == 2) {
		judge();
	}
	else {
		num++;
		q_random();
	}
}

function deside_check(){
	var choose_ans = be_checked();
	var check = [];
	var answer = QUESTION[order[num]].answer;

	if(answer[q_num].length != choose_ans.length) {
		mis[num] = answer[q_num];
		go_direction();
		return;
	}
	else {
		for(var i = 0; i < answer[q_num].length; i++){
			check[i] = choose_ans.some(function(element) { return element === answer[q_num][i]; });
		}
		if( check.every(function(elemet){ return elemet;}) ) { 
			correct++;
		}
		else { 
			mis[num] = answer[q_num];
		}
	}
	go_direction();
}

function deside_radio(){
	var answer = QUESTION[order[num]].answer;
	var selection = QUESTION[order[num]].selection;
	var selected_item_no = Number($("input[name='item']:checked").val()) - 1;

	if(answer[q_num] == selection[q_num][selected_item_no]) { 
		correct++;
	}
	else { 
		mis[num] = answer[q_num];
	}
	go_direction();
}

function deside_text(value){
	var answer = QUESTION[0].answer;
	if(answer[q_num] === value){ 
		correct++;
	}
	else { 
		mis[num] = answer[q_num];
	}
	go_direction();
}

function get_result(form){
	var n = order[num];
	if(n === 0) { deside_text( form.my_ans.value);}
	else if(n === 1) { deside_radio();}
	else if(n === 2) { deside_check();}
	else if(n === 3) {return;}
}

function create_box(){
	var result = "";
	var selection = QUESTION[order[num]].selection;
	var buttan_type = ["radio","checkbox"];
	if(order[num] === 0) {
		result = "<input type='text' name='my_ans' class = 'textbox'>";
	}
	else {
		for(var i = 0; i < 4; i++) {
			result += "<label><input id= 'a" + (i + 1) + "' type= " + buttan_type[order[num]-1] + " name='item' value='" +  (i + 1) + "' />" + selection[q_num][i] + "</label>";
		}
	}
	return result;
}

function q_random(){
	q_num = (Math.floor(Math.random() * 10) % 3);
	$(".q2").html(QUESTION[order[num]].question[q_num]);
	$(".answer").html( create_box() );
}

function count_up_start () {
	var speed = 9;
	setInterval(function() {
		if(count_num <= end_num) {
			if(count_num === end_num) {
				alert("タイムオーバー！！！");
				num = 3;
			}
			$("#cup").html( count_num );
			count_num++;
		}
	},speed);
}

function init() {
	order[0] = (Math.floor(Math.random() * 10) % 3);
	order[1] = order[0];
	while(order[0] === order[1]) {order[1] = (Math.floor(Math.random() * 10) % 3);}
	order[2] = 3 - (order[0] + order[1]); 
	count_up_start();
}

init();
$(document).ready(function(){
	var fade_tag = ".q1,.q2,.answer,h2";

	$(".mente").hover(
		function(){
			$(".hint").css("color","pink");
		},
    	function(){
    		$(".hint").css("color","white")
		});

	$(".key").hover(
		function(){
			$(fade_tag).css("color","pink");
		},
    	function(){
    		$(fade_tag).css("color","white")
		});
	q_random();
});
