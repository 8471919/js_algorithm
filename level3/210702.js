/* n개의 노드가 있는 그래프가 있습니다. 각 노드는 1부터 n까지 번호가 적혀있습니다. 1번 노드에서 가장 멀리 떨어진 노드의 갯수를 구하려고 합니다. 가장 멀리 떨어진 노드란 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들을 의미합니다.

노드의 개수 n, 간선에 대한 정보가 담긴 2차원 배열 vertex가 매개변수로 주어질 때, 1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인지를 return 하도록 solution 함수를 작성해주세요.

제한사항
노드의 개수 n은 2 이상 20,000 이하입니다.
간선은 양방향이며 총 1개 이상 50,000개 이하의 간선이 있습니다.
vertex 배열 각 행 [a, b]는 a번 노드와 b번 노드 사이에 간선이 있다는 의미입니다.
입출력 예
n	vertex	return
6	[[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]	3 */

//인접행렬로 구현, 시간초과가 뜬다.
// const solution = (n, edge) => {

//     const visited = new Array(n).fill(false);

//     const maps = new Array(n).fill(0);
//     for(let i = 0; i < n; i++) {
//         maps[i] = new Array(n).fill(0);
//     }

//     for(let i = 0; i < edge.length; i++) {
//         const fromNode = edge[i][0]-1;
//         const toNode = edge[i][1]-1;
//         maps[fromNode][toNode] = 1;
//         maps[toNode][fromNode] = 1;
//     }

//     console.log(maps);

//     const bfs = (start) => {
//         const queue = [start];
//         visited[start] = null;

//         while(queue.length) {
//             const cur = queue.shift();
//             for(let next = 0; next < n; next++) {
//                 if(!visited[next] && maps[cur][next]) {
//                     visited[next] = visited[cur] + 1;
//                     queue.push(next);
//                 }
//             }
//         }

//         visited[start] = -1;
//     }

//     bfs(0);

//     const max = Math.max(...visited);

//     const answer = visited.filter((el) => el === max);

//     return answer.length;
// }

const solution = (n, edge) => {
    const visited = new Array(n).fill(false);
    //인접리스트 구현
    const maps = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        maps[i] = [];
        for (let j = 0; j < edge.length; j++) {
            if (edge[j][0] === i + 1) maps[i].push(edge[j][1]);
            else if (edge[j][1] === i + 1) maps[i].push(edge[j][0]);
        }
    }

    const bfs = (start) => {
        const queue = [start];

        while (queue.length) {
            const cur = queue.shift();
            for (let i = 0; i < maps[cur].length; i++) {
                const next = maps[cur][i] - 1;
                if (!visited[next]) {
                    visited[next] = visited[cur] + 1;
                    queue.push(next);
                }
            }
        }
        visited[start] = -1;
    };

    bfs(0);

    const max = Math.max(...visited);

    const answer = visited.filter((el) => el === max);

    return answer.length;
};
