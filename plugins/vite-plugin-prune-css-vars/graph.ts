import postcss from 'postcss';

export type DependencyGraph = Map<string, Set<string>>;

const VAR_REGEX = /var\(\s*(--[\w-]+)/g;

function buildDependencyGraph(root: postcss.Root): DependencyGraph {
	const graph = new Map<string, Set<string>>();

	root.walkDecls((decl) => {
		if (!decl.prop.startsWith('--')) return;

		let dependencies = graph.get(decl.prop);

		if (!dependencies) {
			dependencies = new Set<string>();
			graph.set(decl.prop, dependencies);
		}

		VAR_REGEX.lastIndex = 0;

		let match: RegExpExecArray | null;

		while ((match = VAR_REGEX.exec(decl.value))) {
			dependencies.add(match[1]);
		}
	});

	return graph;
}

function expandDependencies(
	initial: Set<string>,
	graph: DependencyGraph
): Set<string> {
	const reachable = new Set(initial);
	const stack = [...initial];

	while (stack.length) {
		const current = stack.pop()!;

		const dependencies = graph.get(current);

		if (!dependencies) continue;

		for (const dependency of dependencies) {
			if (reachable.has(dependency)) continue;

			reachable.add(dependency);
			stack.push(dependency);
		}
	}

	return reachable;
}

export function buildReachableVariables(
	css: string,
	used: Set<string>
): Set<string> {
	const root = postcss.parse(css);

	const graph = buildDependencyGraph(root);

	return expandDependencies(used, graph);
}
