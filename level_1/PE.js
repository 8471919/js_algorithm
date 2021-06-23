/* 점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

제한사항
전체 학생의 수는 2명 이상 30명 이하입니다.
체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.
입출력 예
n	lost	reserve	return
5	[2, 4]	[1, 3, 5]	5
5	[2, 4]	[3]	4
3	[3]	[1]	2 */

//실패
// const solution = (n, lost, reserve) => {
//     for (let i = 0; i < lost.length; i++) {
//         if (reserve.includes(lost[i])) {
//             reserve.splice(reserve.indexOf(lost[i]), 1);
//             lost.splice(lost.indexOf(lost[i]), 1);
//         }
//     }
//     let answer = n - lost.length;

//     for (let i = 0; i < reserve.length; i++) {
//         if (lost.includes(reserve[i] - 1)) {
//             lost.splice(lost.indexOf(reserve[i] - 1), 1);
//             answer++;
//         } else if (lost.includes(reserve[i] + 1)) {
//             lost.splice(lost.indexOf(reserve[i] + 1), 1);
//             answer++;
//         }
//     }

//     return answer;
// };

console.log(solution(5, [2, 4], [1, 3, 5]));
console.log(solution(5, [2, 4], [3]));
console.log(solution(3, [3], [1]));
console.log(solution(5, [2, 3, 4], [3, 4, 5]));

function solution(n, lost, reserve) {
    const arr = new Array(n + 1).fill(1);
    arr[0] = null;
    let answer = 0;

    lost.forEach((el) => arr[el]--);
    reserve.forEach((el) => arr[el]++);

    console.log(arr);

    arr.forEach((el, idx) => {
        if (el === 0) {
            if (arr[idx - 1] > 1) {
                arr[idx]++;
                arr[idx - 1]--;
            } else if (arr[idx + 1] > 1) {
                arr[idx]++;
                arr[idx + 1]--;
            }
        }
    });

    console.log(arr);

    arr.forEach((el) => {
        if (el > 0) answer++;
    });

    return answer;
}

//다른풀이(초반에 하려다가 실패함)
// const solution = (n, lost, reserve) => {
//     for (let i = 0; i < lost.length; i++) {
//         if (reserve.includes(lost[i])) {
//             reserve.splice(reserve.indexOf(lost[i]), 1);
//             lost.splice(lost.indexOf(lost[i]), 1);
//             i--;
//         }
//     }
//     let answer = n - lost.length;

//     for (let i = 0; i < reserve.length; i++) {
//         if (lost.includes(reserve[i] - 1)) {
//             lost.splice(lost.indexOf(reserve[i] - 1), 1);
//             answer++;
//         } else if (lost.includes(reserve[i] + 1)) {
//             lost.splice(lost.indexOf(reserve[i] + 1), 1);
//             answer++;
//         }
//     }

//     return answer;
// };
