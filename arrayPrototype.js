// // const curry =
// //     (f) =>
// //     (a, ...rest) =>
// //         rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest);

// // const curry2 =
// //     (f) =>
// //     (a, ...rest) =>
// //         rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest);

// const add = (a, b) => a + b;

// const apply = (fn, a) => (b) => fn(a, b);

// const curry =
//     (fn) =>
//     (a, ...rest) =>
//         rest.length ? fn(a, ...rest) : (...rest) => fn(a, ...rest);

// const curriedAdd = curry(add);
// console.log(curriedAdd(3)(10));

// const take = (l, iter) => {
//     const res = [];
//     for (const item of iter) {
//         res.push(item);
//         if (res.length === l) return res;
//     }
//     return res;
// };

// const takeAll = (iter) => take(Infinity, iter);

// function* mapL(f, iter) {
//     for (const a of iter) {
//         console.log("mapL", a);
//         yield f(a);
//     }
// }

// function* filterL(f, iter) {
//     for (const a of iter) {
//         console.log("fiterL", a);
//         if (f(a)) yield a;
//     }
// }

// console.log(
//     take(
//         3,
//         [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//             .map((el) => el + 10)
//             .filter((el) => el % 2)
//     )
// ); // map 10, filter 10, 총 20번의 연산을 했다. + 3번, 23번.

// console.log(
//     takeAll(
//         filterL(
//             (a) => a % 2,
//             mapL((a) => a + 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
//         )
//     )
// );

// const f = (acc, cur) => acc + cur;

// const reduce = (f, acc, iter) => {
//     for (const a of iter) {
//         acc = f(acc, a);
//     }
//     return acc;
// };

// const sum = reduce((acc, cur) => acc + cur, 0, [1, 2, 3, 4, 5]);
// console.log(sum);

Array.prototype.join2 = function (del) {
    const answer = this.reduce((acc, cur) => `${acc}${del}${cur}`);
    return answer;
};

[1, 2, 3, 4, 5].join2("+");

// console.log([1, 2, 3, 4, 5, 6, 7].reduce();

const maps = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
];

// function makeQuarter(maps) {
//     const up = maps.splice(0, maps.length / 2);
//     const down = maps;

//     const upLeft = up.map((el) => el.splice(0, el.length / 2));
//     const upRight = up;

//     const downLeft = down.map((el) => el.splice(0, el.length / 2));
//     const downRight = down;

//     console.log([upLeft, upRight, downRight, downLeft]);
//     return [upLeft, upRight, downRight, downLeft];
// }

// makeQuarter(maps);

const arr = new Array(4).fill([]);
arr[0].push(1);
arr[1].push(2);

const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
};

// (100 / gcd(10, 100) * 10 / gcd(10, 100)) * gcd(10, 100)
// console.log(gcd(10, 100));

//    2 8      5  25 100
//    2 4      5   5  20
//      2          1   4
