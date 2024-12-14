class BSTNode {
    constructor(value) {
        this.value = value;
        this.cells = [];
        this.left = null;
        this.right = null;
    }
};

class BST {
    constructor() {
        this.root = null;
    }

    insert(ref, val) {
        this.root = this._insert(this.root, ref, val);
    }

    _insert(node, ref, value) {
        if (!node) {
            const newNode = new BSTNode(value);
            newNode.cells.push(ref);
            return newNode;
        }
        if (value < node.value) {
            node.left = this._insert(node.left, ref, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, ref, value);
        } else {
            if (!node.cells.includes(ref)) {
                node.cells.push(ref);
            }
        }
        return node;
    }

    delete(rootNode, key) {
        if (!rootNode) return rootNode
        if (key < rootNode.value) node.left = this.delete(rootNode.left, key)
        else if (key > rootNode.value) rootNode.right = this.delete(rootNode.right, key)
        else {
            if(!this.root.left) {
                let temp = rootNode.right
                rootNode = null
                return temp
            }
            else if(!this.root.right) {
                let temp = rootNode.left
                rootNode = null
                return temp
            }
            let curr = rootNode.right
            while(curr.left) curr = curr.left
            let temp = curr
            rootNode.value = temp.value
            rootNode.cells = temp.cells
            rootNode.right = this.delete(rootNode.right, temp.value)
            return rootNode
        }
    }

    find(value) {
        const results = [];
        this._find(this.root, value, results);
        return results;
    }

    _find(node, value, results) {
        if (!node) return;
        if (typeof value === 'string') {
            if (node.value.toLowerCase().startsWith(value.toLowerCase())) {
                results.push(...node.cells);
            }
        } else {
            if (value === node.value) {
                results.push(...node.cells);
            }
        }
        if (value < node.value) {
            this._find(node.left, value, results);
        } else if (value > node.value) {
            this._find(node.right, value, results);
        }
    }
}
