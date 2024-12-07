class Stack {
    constructor() {
        this.top = -1
        this.array = []
    }

    push(x) {
        this.top++
        this.array.push(x)
    }

    pop() {
        this.top--
        return this.array.pop()
    }

    peek() { return this.array[this.top] }

    empty() { return this.top === -1 }
}