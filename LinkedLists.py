class Node:
    def __init__(self, data):
        self.data = data
        self.value = ""
        self.left = None
        self.right = None
        self.up = None
        self.down = None

class TernaryLinkedList:
    def __init__(self):
        self.head = None
        self.end = None
        
    def print_list(self):
        temp = self.head
        while temp:
            curr = temp
            while curr:
                print(curr.data, end=" -> ")
                curr = curr.right
            print("None")
            temp = temp.down
        print("None")

    def get_node(self, row_number, col_number):
        temp = self.head
        col = 0
        while col < col_number:
            temp = temp.right
            col += 1
        row = 0
        while row < row_number:
            temp = temp.down
            row += 1
        return temp

    def insert_node(self, i, j):
        node = Node(f"{i}, {j}")
        if i == 0 and j == 0:
            self.head = node
            self.end = node
            return

        if j > 0:
            node.left = self.end
            self.end.right = node
        elif j == 0 and i > 0:
            prev_row_start = self.get_node(i - 1, 0)
            prev_row_start.down = node
            node.up = prev_row_start

        if i > 0:
            upper_node = self.get_node(i - 1, j)
            node.up = upper_node
            upper_node.down = node

        self.end = node
