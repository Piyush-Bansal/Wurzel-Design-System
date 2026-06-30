import postcss from 'postcss';

export class CssRootCache {
	private id = '';
	private root?: postcss.Root;

	get(id: string) {
		return this.id === id ? this.root : undefined;
	}

	set(id: string, root: postcss.Root) {
		this.id = id;
		this.root = root;
	}

	clear() {
		this.id = '';
		this.root = undefined;
	}
}

export const cssRootCache = new CssRootCache();
