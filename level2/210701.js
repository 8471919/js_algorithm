/* n개의 음이 아닌 정수가 있습니다. 이 수를 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3
사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

제한사항
주어지는 숫자의 개수는 2개 이상 20개 이하입니다.
각 숫자는 1 이상 50 이하인 자연수입니다.
타겟 넘버는 1 이상 1000 이하인 자연수입니다.
입출력 예
numbers	target	return
[1, 1, 1, 1, 1]	3	5 */

/* 
let num;
let visited;
let answer = 0;

const dfs = (plus, arr, cur, target) => {
    visited[cur] = true;
    if (plus) arr.push(num[cur]);
    else arr.push(-num[cur]);

    if (cur + 1 === num.length) {
        if (arr.reduce((acc, cur) => acc + cur) === target) answer++;
        return;
    }

    dfs(true, arr, cur + 1, target);
    arr.pop();
    visited[cur + 1] = false;

    dfs(false, arr, cur + 1, target);
    arr.pop();
    visited[cur + 1] = false;
};

const solution = (numbers, target) => {
    num = numbers;
    visited = new Array(num.length).fill(false);

    dfs(true, [], 0, target);
    dfs(false, [], 0, target);

    return answer;
};

console.log(solution([1, 1, 1, 1, 1], 3));

//이 코드는 다른 사람의 것을 차용하였습니다.
 */

const solution = (numbers, target) => {
    let answer = 0;
    const visited = new Array(numbers.length).fill(false);
    let arr = [];

    const dfs = (plus, cur) => {
        visited[cur] = true;

        if (plus) arr.push(numbers[cur]);
        else arr.push(-numbers[cur]);

        if (numbers.length === cur + 1) {
            if (arr.reduce((acc, cur) => acc + cur) === target) {
                answer++;
            }
            return;
        }

        dfs(true, cur + 1);
        arr.pop();
        visited[cur + 1] = false;

        dfs(false, cur + 1);
        arr.pop();
        visited[cur + 1] = false;
    };

    dfs(true, 0);

    arr = [];

    dfs(false, 0);

    return answer;
};

console.log(solution([1, 1, 1, 1, 1], 3));
