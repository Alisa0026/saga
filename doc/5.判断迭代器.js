function* gen() {

}

let it = gen()

// 如果一个对象是一个迭代器的话，它身上会有一个属性 Symbol.iterator，是一个函数
console.log(it[Symbol.iterator]); // [Function: [Symbol.iterator]]

let arr = [1, 2, 3];
console.log(arr[Symbol.iterator]); // [Function: values]

// 有这个属性的可以用 for 循环迭代
for (const item of arr) {
    console.log(item); // 1,2,3
}