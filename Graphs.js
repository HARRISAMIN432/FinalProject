class AdjacencyList {
    constructor() {
        this.graph = new Map();
    }

    addNode(cell) {
        if (!this.graph.has(cell)) {
            this.graph.set(cell, []);
        }
    }

    addEdge(fromCell, toCell) {
        if (!this.graph.has(fromCell)) {
            this.addNode(fromCell);
        }
        if (!this.graph.has(toCell)) {
            this.addNode(toCell);
        }
        this.graph.get(fromCell).push(toCell);
    }

    getDependents(cell) {
        return this.graph.has(cell) ? this.graph.get(cell) : [];
    }
}
