class Stack:
    def __init__(self):
        self.top = -1
        self.array = []

    def push(self, x):
        """Push an element onto the stack."""
        self.top += 1
        self.array.append(x)

    def pop(self):
        """Pop the top element from the stack."""
        if self.is_empty():
            raise IndexError("pop from empty stack")
        self.top -= 1
        return self.array.pop()

    def peek(self):
        """Return the top element without removing it."""
        if self.is_empty():
            raise IndexError("peek from empty stack")
        return self.array[self.top]

    def is_empty(self):
        """Check if the stack is empty."""
        return self.top == -1
