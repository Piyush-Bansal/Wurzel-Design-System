const fps: number = 60;
const minUnit: number = 5;

const timeConstant = (unit: number) => ((unit * 1) / fps) * 1000;

export const time1 = timeConstant(minUnit); //8.33 ms
export const time2 = timeConstant(minUnit * 2); //16.67 ms
export const time3 = timeConstant(minUnit * 3); //25 ms
export const time4 = timeConstant(minUnit * 4); //33.33 ms
export const time5 = timeConstant(minUnit * 6); //50 ms
export const time6 = timeConstant(minUnit * 8); //66.67 ms
export const time7 = timeConstant(minUnit * 12); //100 ms
export const time8 = timeConstant(minUnit * 16); //133.33 ms
export const time9 = timeConstant(minUnit * 24); //200 ms
export const time10 = timeConstant(minUnit * 32); //266.67 ms
export const time11 = timeConstant(minUnit * 48); //400 ms
export const time12 = timeConstant(minUnit * 64); //533.33 ms
export const time13 = timeConstant(minUnit * 96); //800 ms
export const time14 = timeConstant(minUnit * 128); //1066.67 ms
export const time15 = timeConstant(minUnit * 192); //1600 ms
