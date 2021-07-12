/**
 * root 폴더가 있다.
 *
 * 1. mkdir folderName : 폴더 만들기
 * 2. dir : 현재 폴더에 있는 폴더, 파일명 출력
 * 3. cd folderName : 폴더로 이동
 * 4. cd .. or cd.. : 이전 폴더로 이동
 * 5. new filename : file 생성
 * 6. new filename text : text가 들어간 file 생성
 * 7. cls : 스크린 초기화
 *
 * 8. write fileName : 파일 내용 수정
 *     - 명령 실행 후 원본 내용이 출력되고, 새로 바꿀 내용을 입력한다.
 * 9. read fileName : 파일 내용 출력
 *
 * 만약에 이것도 가능하다면...
 *
 * 10. cd : 현재 경로 출력
 * 11. cd / : 루트로 이동
 * 12. cd /folder1/folder2... : 절대경로로 한 번에 이동하기
 *
 * 무엇을 생각하라고 하는 거냐면...
 * - cmd 창이 어떻게 만들어지고 동작하는가?
 * - 파일과 폴더의 차이는?
 * - 폴더 구조는 어떤 자료구조인가?
 *
 *
 *
 */

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// class Program {}

class File {
    constructor(name, text = null) {
        this.name = name;
        this.text = text;
    }
    mkfile(name, text = null) {
        const file = new File(name, text);
        return file;
    }
}

class Folder extends File {
    constructor(name) {
        super(name);
        this.prev = null; //여기에 prev를 만든이유. cmd창에서 dir을 치면 이전폴더가 폴더 내부에 있기 때문.
        this.folderList = [];
        this.fileList = [];
    }
    //폴더명으로 인덱스를 찾는다.
    searchFolder(name) {
        let folder;
        for (folder of this.folderList) {
            if (folder.name === name) {
                break;
            }
        }
        return this.folderList.indexOf(folder);
    }
    //파일명으로 인덱스를 찾는다.
    searchFile(name) {
        let file;
        for (file of this.fileList) {
            if (file.name === name) {
                break;
            }
        }
        return this.fileList.indexOf(file);
    }
    //현재 경로를 나타낸다.
    curLocation() {
        const locationStack = [];
        let toRoot = this;
        while (toRoot) {
            locationStack.unshift(toRoot.name);
            toRoot = toRoot.prev;
        }
        process.stdout.write(locationStack.join("/") + "/");
    }
    //dir명령 - 현재 폴더의 폴더와 파일들을 보여준다.
    dir() {
        const print = (list) => {
            list.forEach((el, idx) => {
                process.stdout.write(el.name + "\t");
                if ((idx + 1) % 5 === 0) {
                    console.log();
                }
            });
            console.log();
        };
        // Array.prototype.print = funtion()
        console.log("폴더 : ");
        print(this.folderList);
        console.log("파일 : ");
        print(this.fileList);
        // this.curLocation();
    }
    //mkdir명령 - 현재 폴더에서 하위폴더를 만든다.
    mkdir(name) {
        //중복 폴더명인 경우, 생성불가
        if (this.folderList.some((el) => el.name === name)) {
            console.log("중복된 폴더명입니다.");
            return false;
        }
        const folder = new Folder(name);
        folder.prev = this;
        this.folderList.push(folder);
        // this.curLocation();
    }
    // cd명령 - 현재 폴더에서 다른 폴더로 이동한다.
    cd(name) {
        const next = this.searchFolder(name);
        if (next === undefined) {
            console.log("해당 폴더가 없습니다.");
            return false;
        }
        if (name === "..") {
            return this.prev;
        }
        // this.curLocation();
        return this.folderList[next];
    }
    new(name, text) {
        const file = this.mkfile(name, text);
        this.fileList.push(file);
        // this.curLocation();
    }
}

class Pointer {
    constructor(root) {
        this.root = root;
        this.curFolder = this.root;
        //Folder클래스 말고, 여기에 prev를 만들어도 좋았을 것 같다.
    }
    //화살표함수는 클래스 내에서 가급적 쓰지말자.
    dir() {
        this.curFolder.dir();
    }
    mkdir(name) {
        this.curFolder.mkdir(name);
    }
    cd(name) {
        this.curFolder = this.curFolder.cd(name);
    }
    new(name, text = null) {
        this.curFolder.new(name, text);
    }
    cls() {
        console.clear();
    }
    curLocation() {
        this.curFolder.curLocation();
    }
}

rl.on("line", (line) => {
    main(line);
});
const root = new Folder("root");
const pointer = new Pointer(root);

const main = (line) => {
    // pointer.mkdir("a");
    // pointer.mkdir("b");
    // pointer.mkdir("c");
    // pointer.new("hansu");
    // pointer.dir();
    // pointer.cd("b");
    // pointer.mkdir("abcd");
    // pointer.dir();
    // pointer.cd("..");
    // pointer.dir();
    // pointer.cls();
    const [command, condition1, ...condition2] = line.split(" ");
    if (pointer[command]) {
        pointer[command](condition1, condition2);
    }
    pointer.curLocation();
};
