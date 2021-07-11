const solution다익스트라 = (maps) => {
    const visited = new Array(maps.length).fill(false);

    for (let i = 0; i < maps.length; i++) {
        visited[i] = new Array(maps[i].length).fill(0);
    }
    const xMove = [0, 0, -1, 1];
    const yMove = [1, -1, 0, 0];
    const 다익스트라 = (startY, startX) => {
        const queue = [{ yPos: startY, xPos: startX }];

        while (queue.length) {
            const cur = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nextY = cur.yPos + yMove[i];
                const nextX = cur.xPos + xMove[i];

                if (
                    nextY >= 0 &&
                    nextY < maps.length &&
                    nextX >= 0 &&
                    nextX < maps[0].length
                ) {
                    if (
                        !visited[nextY][nextX] ||
                        visted[nextY][nextX] >
                            visted[cur.yPos][cur.xPos] + 가중치
                    ) {
                        if (maps[nextY][nextX]) {
                            queue.push({ yPos: nextY, xPos: nextX });
                            // 방문을 체크한다.

                            visited[nextY][nextX] =
                                visited[cur.yPos][cur.xPos] + 가중치;
                        }
                    }
                }
            }
        }
    };

    다익스트라(0, 0);

    const answer = visited[maps.length - 1][maps[0].length - 1];
    return answer ? answer + 1 : -1;
};

const solutionBFS = (maps) => {
    const visited = new Array(maps.length).fill(false);

    for (let i = 0; i < maps.length; i++) {
        visited[i] = new Array(maps[i].length).fill(0);
    }
    const xMove = [0, 0, -1, 1];
    const yMove = [1, -1, 0, 0];
    const bfs = (startY, startX) => {
        const queue = [{ yPos: startY, xPos: startX }];

        while (queue.length) {
            const cur = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nextY = cur.yPos + yMove[i];
                const nextX = cur.xPos + xMove[i];

                if (
                    nextY >= 0 &&
                    nextY < maps.length &&
                    nextX >= 0 &&
                    nextX < maps[0].length
                ) {
                    if (!visited[nextY][nextX]) {
                        if (maps[nextY][nextX]) {
                            queue.push({ yPos: nextY, xPos: nextX });
                            // 방문을 체크한다.

                            visited[nextY][nextX] =
                                visited[cur.yPos][cur.xPos] + 1;
                        }
                    }
                }
            }
        }
    };

    bfs(0, 0);

    const answer = visited[maps.length - 1][maps[0].length - 1];
    return answer ? answer + 1 : -1;
};

const solution = (maps) => {
    const visited = new Array(maps.length).fill(false);

    for (let i = 0; i < maps.length; i++) {
        visited[i] = new Array(maps[i].length).fill(0);
    }
    const xMove = [0, 0, -1, 1];
    const yMove = [1, -1, 0, 0];

    const dfs = (startY, startX) => {
        for (let i = 0; i < 4; i++) {
            const nextY = startY + yMove[i];
            const nextX = startX + xMove[i];

            if (
                nextY >= 0 &&
                nextY < maps.length &&
                nextX >= 0 &&
                nextX < maps[0].length
            ) {
                if (!visited[nextY][nextX]) {
                    if (maps[nextY][nextX]) {
                        // queue.push({yPos : nextY, xPos : nextX});
                        // // 방문을 체크한다.

                        visited[nextY][nextX] = visited[startY][startX] + 1;
                        dfs(nextY, nextX);
                    }
                }
            }
        }
    };

    visited[0][0] = 1;
    dfs(0, 0);

    const answer = visited[maps.length - 1][maps[0].length - 1];
    return answer ? answer + 1 : -1;
};
