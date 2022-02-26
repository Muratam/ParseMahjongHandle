const hands = require("./hand").HANDS // 10009 hands by source code
const Riichi = require('riichi')

let per_place = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]
let any_z = 0;
for (let hand of hands) {
  let str = hand.replace(/\+\d+$/g, "").replace("+", "")
  let hand_any_z = false;
  for (let i = 0; i < 14; i++) {
    let s = str.substring(i * 2, i * 2 + 2)
    per_place[i][s] = (per_place[i][s] || 0) + 100.0 / hands.length
    if (s.match("z")) hand_any_z = true;
  }
  if (hand_any_z) any_z += 100.0 / hands.length;
}
console.log(any_z)

let hai_unis = [..."🀇🀈🀉🀊🀋🀌🀍🀎🀏🀙🀚🀛🀜🀝🀞🀟🀠🀡🀐🀑🀒🀓🀔🀕🀖🀗🀘🀀🀁🀂🀃🀆🀅🀄"]
let hais_raws = [
  "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m",
  "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p",
  "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s",
  "1z", "2z", "3z", "4z", "5z", "6z", "7z",
];
for (let h = 0; h < 3 * 9 + 7; h++) {
  let hai = hais_raws[h];
  let str = `|${hai_unis[h]}|`;
  let per_sum = 0;
  for (let i = 0; i < 14; i++) {
    let per = per_place[i][hai] || 0;
    per_sum += per;
    str += `${Math.round(per) || ""}|`
  }
  str += `${Math.round(per_sum)}|${hai_unis[h]}|`
  console.log(str)
}

let parse = () => {
  let print = x => console.log(JSON.stringify(x));
  let yakus = []
  let tens = []
  let hans = []
  for (let hand of hands) {
    const calc = new Riichi(hand).calc()
    yakus.push(calc.yaku)
    hans.push(calc.han)
    tens.push(calc.ten)
  }
  // 10009 hands
  // print(hands);
  // print(yakus);
  // print(tens);
  print(hans);
}
// parse();
// 読み方 +1m : 1mツモ, +東西南北[場風自風]
