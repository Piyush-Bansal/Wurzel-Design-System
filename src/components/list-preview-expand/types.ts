export type ListItem = {
	index: number;
	id: number;
	location: string;
};

type HoverDetails = {
	image: string;
	country: string;
	id: number;
	location: string;
};

export type HoverDetailsCollection = { details: HoverDetails[] };

type Details = HoverDetails & {
	details: string;
};

export type DetailsCollection = { details: Details[] };
