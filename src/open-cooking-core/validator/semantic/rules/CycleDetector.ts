import type { ReferenceGraph } from '../../../registry'

export class CycleDetector {
  static detect(graph: ReferenceGraph): string[][] {
    const visited = new Set<string>()
    const stack = new Set<string>()
    const cycles: string[][] = []

    const visit = (node: string, path: string[]) => {
      if (stack.has(node)) {
        cycles.push([...path, node])
        return
      }

      if (visited.has(node)) {
        return
      }

      visited.add(node)
      stack.add(node)

      for (const next of graph.getEdges(node)) {
        visit(next, [...path, node])
      }

      stack.delete(node)
    }

    for (const node of graph.nodes()) {
      visit(node, [])
    }

    return cycles
  }
}
