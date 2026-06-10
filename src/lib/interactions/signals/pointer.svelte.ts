let position = $state({ x: 0, y: 0 });

const previous = $state({ x: 0, y: 0 });

const deltaX = $derived(position.x - previous.x);
const deltaY = $derived(position.y - previous.y);

const speed = $derived(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
const angle = $derived(Math.atan2(deltaY, deltaX));
const isMoving = $derived(speed > 0.1);

export const pointerDetails = {
	get position() {
		return position;
	},

	get speed() {
		return speed;
	},

	get angle() {
		return angle;
	},

	get isMoving() {
		return isMoving;
	}
};

function handlePointer(e: MouseEvent) {
	previous.x = position.x;
	previous.y = position.y;

	position.x = e.clientX;
	position.y = e.clientY;
}
export function createListener() {
	window.addEventListener('mousemove', handlePointer);
}

export function removeListener() {
	window.removeEventListener('mousemove', handlePointer);
}
