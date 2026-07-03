export type CardDetails = {
	id: number;
	image: string;
	title: string;
	x: number;
	y: number;
	depth: number;
	rotateX: number;
	rotateY: number;
};

export type Card = {
	details: CardDetails;
};
