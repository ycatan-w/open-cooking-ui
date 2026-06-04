export class ReferenceGraph {
  private edges = new Map<string, Set<string>>()

  addEdge(from: string, to: string) {
    if (!this.edges.has(from)) {
      this.edges.set(from, new Set())
    }

    this.edges.get(from)!.add(to)
  }

  getEdges(node: string) {
    return this.edges.get(node) || new Set()
  }

  nodes() {
    return [...this.edges.keys()]
  }
  reset() {
    this.edges.clear()
  }
}
