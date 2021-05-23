const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '请输入>\t'
});
var start = false;
var stop = false;
var result;
var val;


console.log("猜大小游戏，请分别输入猜测范围start-stop")
rl.prompt();
rl.on('line', (line) => {
	let rel = cli(line.trim());
	if (rel != false) {
		if (start === false) {
			start = rel;
			console.log("start->" + start);
			rl.prompt();
			return true;
		}
		if (start !== false && stop === false) {
			stop = rel;
			console.log("stop->" + stop);
			result = rand(start, stop);
			// console.log(result);随机结果
			if (result !== 0) {
				console.log("请在区间[" + start + "," + stop + "]之间猜测一个数");
				rl.prompt();
				return true;
			} else {
				console.log("stop小于start，请重新输入");
				start = false;
				stop = false;
				rl.prompt();
				return false;
			}
			return true
		}
		if (start !== false && stop !== false) {
			val = rel;
			console.log("val->" + val);
			if (val < start) {
				console.log("输入的数必须大于" + start);
				console.log("请在区间[" + start + "," + stop + "]之间猜测一个数");
				rl.prompt();
				return false;
			}
			if (val > stop) {
				console.log("猜测是数必须小于" + stop);
				console.log("请在区间[" + start + "," + stop + "]之间猜测一个数");
				rl.prompt();
				return false;
			}
			if (val === result) {
				console.log("猜对了");
				rl.close();
			} else {
				if (val < result) {
					console.log("您猜测的数小了");
					start = val;
					console.log("请在区间[" + start + "," + stop + "]之间猜测一个数");
					rl.prompt();
					return false;
				}
				if (val > result) {
					console.log("您猜测的数大了");
					stop = val;
					console.log("请在区间[" + start + "," + stop + "]之间猜测一个数");
					rl.prompt();
					return false;
				}
			}
		}
	}
	rl.prompt();
}).on('close', () => {
	console.log('游戏结束！');
	process.exit(0);
});


//字符检测
function cli(num) {
	if (num == undefined || num == null) {
		console.log("输入不可为null或undefined");
		return false;
	}
	let isnum = parseInt(num);
	let Nan = Number(num);
	if (isnum !== Nan) {
		console.log("输入的字符必须是数字");
		return false;
	} else {
		return isnum;
	}
}

//随机生成数字，传入起始值start与结束值stop，start<stop返回随机数字，start>stop返回0
function rand(start, stop) {
	let Jstart = cli(start);
	if (Jstart != false) {
		let Jstop = cli(stop);
		if (Jstop != false) {
			let width = Jstop - Jstart;
			if (width <= 0) {
				return 0;
			} else {
				return Math.round(Jstart + Math.random() * width);
			}
		}
	}
}