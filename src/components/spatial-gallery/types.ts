import type { Snippet } from 'svelte';

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
	index: number;
};

export type InteractionPose = {
	idle: {
		depth: number;
		scale: number;
		rotationX: number;
		rotationY: number;
		brightness: number;
	};
	hover: {
		depth: number;
		scale: number;
		rotationX: number;
		rotationY: number;
		brightness: number;
	};
	dimmed: {
		depth: number;
		scale: number;
		rotationX: number;
		rotationY: number;
		brightness: number;
	};
	background: {
		depth: number;
		scale: number;
		rotationX: number;
		rotationY: number;
		brightness: number;
	};
	selected: {
		depth: number;
		scale: number;
		rotationX: number;
		rotationY: number;
		brightness: number;
	};
};

export type GalleryProps = { data: CardDetails[]; children: Snippet };
