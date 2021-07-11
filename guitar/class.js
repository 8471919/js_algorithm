class Stack {
    constructor() {
        this.arr = [];
        this.index = 0;
    }

    pop() {
        if (this.index <= 0) return null;
        const result = this.arr[--this.index];
        this.arr.length--;
        return result;
    }

    push(value) {
        this.arr[this.index++] = value;
    }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();
console.log(stack);

class List {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    insert(data) {
        this.next ? this.next.insert(data) : (this.next = new List(data));
    }
}

const list = new List(1);
list.insert(2);
list.insert(3);
list.insert(4);
list.insert(5);

console.log(list);

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    insert(data) {
        data <= this.data ? this.toLeft(data) : this.toRight(data);
    }

    toLeft(data) {
        this.left ? this.left.insert(data) : this.left = new Node(data);
    }

    toRight(data) {
        this.right ? this.right.insert(data) : this.right = new Node(data);
    }

    contains(data) {
        if(data === this.data) return this;
        return data <= this.data ? 
    }

}