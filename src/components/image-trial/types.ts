export type TrailItem = {
	id: ReturnType<typeof crypto.randomUUID>;
	x: number;
	y: number;
	z: number;
	src: string;
	speed: number;
	angle: number;
};

export type TrailingImageProps = TrailItem & {
	onExit: (id: ReturnType<typeof crypto.randomUUID>) => void;
};
