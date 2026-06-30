import postcss from 'postcss';

const VAR_REGEX = /var\(\s*(--[\w-]+)/g;

export type DependencyGraph = Map<string, Set<string>>;

export function buildDependencyGraph(root: postcss.Root): DependencyGraph {
	const graph = new Map<string, Set<string>>();

	root.walkDecls((decl) => {
		if (!decl.prop.startsWith('--')) return;

		let deps = graph.get(decl.prop);

		if (!deps) {
			deps = new Set();
			graph.set(decl.prop, deps);
		}

		VAR_REGEX.lastIndex = 0;

		let match: RegExpExecArray | null;

		while ((match = VAR_REGEX.exec(decl.value))) {
			deps.add(match[1]);
		}
	});

	return graph;
}

export function expandDependencies(
	initial: Set<string>,
	graph: DependencyGraph
): Set<string> {
	const reachable = new Set(initial);

	const stack = [...initial];

	while (stack.length) {
		const current = stack.pop()!;

		const deps = graph.get(current);

		if (!deps) continue;

		for (const dep of deps) {
			if (reachable.has(dep)) continue;

			reachable.add(dep);
			stack.push(dep);
		}
	}

	return reachable;
}
