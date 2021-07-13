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
    getText() {
        return this.text;
    }
    setText(text) {
        this.text = text;
    }
}

class Folder extends File {
    constructor(name) {
        super(name);
        this.prev = null; //여기에 prev를 만든이유. cmd창에서 dir을 치면 이전폴더가 폴더 내부에 있기 때문.
        this.folderList = [];
        this.fileList = [];
    }
    //파일을 생성한다.
    mkfile(name, text = null) {
        const file = new File(name, text);
        return file;
    }
    //파일, 폴더명으로 인덱스를 찾는다.
    search(name, list) {
        let fileOrFolder;
        for (fileOrFolder of list) {
            if (fileOrFolder.name === name) {
                break;
            }
        }
        return list.indexOf(fileOrFolder);
    }
    //현재 경로를 나타낸다.
    curLocation() {
        const locationStack = [];
        let toRoot = this;
        while (toRoot) {
            locationStack.unshift(toRoot.name);
            toRoot = toRoot.prev;
        }
        process.stdout.write(locationStack.join("/") + ">");
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
    }
    // cd명령 - 현재 폴더에서 다른 폴더로 이동한다.
    cd(name) {
        //현재 경로 출력
        if (name === undefined) {
            this.curLocation();
            console.log();
            return this;
        }
        const next = this.search(name, this.folderList);
        //해당 폴더가 존재하지 않을 경우
        if (next === undefined) {
            console.log("해당 폴더가 없습니다.");
            return false;
        }
        //아래의 if문들을 없앨 수는 없을까?
        // ->cd class를 따로 만들어서 객체로 만든다??
        // ->명령어 하나를 위해 클래스를 만드는건 아닌 듯하다.
        // ->애당초 명령어마다 클래스를 만들던가 했어야 했다.
        // ->문제: ..과같은 명령은 함수명으로 사용할 수 없다.
        // 그렇다면 어떻게 해야하지? 잘 모르겠다.
        //cd .. - 상위 폴더로 이동
        if (name === "..") {
            return this.prev;
        }
        return this.folderList[next];
    }
    //new명령 - 파일을 생성한다.
    new(name, text) {
        const file = this.mkfile(name, text);
        this.fileList.push(file);
    }
    //read명령 - 현재 파일 내용을 출력한다.
    read(name) {
        //파일명을 입력하지 않았을 경우.
        if (name === undefined) {
            console.log("파일명을 입력해주세요.");
            return false;
        }
        const fileIndex = this.search(name, this.fileList);
        const file = this.fileList[fileIndex];
        const text = file.getText();
        console.log(text);
        return file;
    }
    //write명령 - 현재 파일 내용을 출력하고, 수정할 내용을 입력받는다.
    write(name, text) {
        console.log("수정 전");
        const file = this.read(name);
        file.setText(text);
    }
}

class Pointer {
    constructor(root) {
        this.root = root;
        this.curFolder = this.root;
        //프로그램 실행 되자마자 경로가 뜰 수 있도록 생성자에 넣어주었다.
        this.curFolder.curLocation();
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
        if (name === "/") {
            this.curFolder = this.root;
            return false;
        }
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
    read(name) {
        this.curFolder.read(name);
    }
    write(name, text) {
        this.curFolder.write(name, text);
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
        let con2 = condition2.join(" ");
        pointer[command](condition1, con2);
    } else {
        console.log("명령어가 잘못 되었습니다.");
    }
    pointer.curLocation();
};
