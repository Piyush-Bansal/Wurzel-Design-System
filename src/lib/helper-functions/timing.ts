const fps: number = 60;
const minUnit: number = 5;

const timeConstant = (unit: number) => (unit * 1) / fps;

export const time1 = timeConstant(minUnit); //0.0833333333333333 s
export const time2 = timeConstant(minUnit * 2); //0.1666666666666667 s
export const time3 = timeConstant(minUnit * 3); //0.25 s
export const time4 = timeConstant(minUnit * 4); //0.3333333333333333 s
export const time5 = timeConstant(minUnit * 6); //0.5 s
export const time6 = timeConstant(minUnit * 8); // 0.6666666666666667 s
export const time7 = timeConstant(minUnit * 12); // 1 s
export const time8 = timeConstant(minUnit * 16); // 1.333333333333333 s
export const time9 = timeConstant(minUnit * 24); // 2 s
export const time10 = timeConstant(minUnit * 32); // 2.666666666666667 s
export const time11 = timeConstant(minUnit * 48); // 4 s
export const time12 = timeConstant(minUnit * 64); // 5.333333333333333 s
export const time13 = timeConstant(minUnit * 96); // 8 s
export const time14 = timeConstant(minUnit * 128); // 10.66666666666667 s
export const time15 = timeConstant(minUnit * 192); // 16 s
