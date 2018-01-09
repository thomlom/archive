export const isNotEmpty = (value) => (value != '');

export const isMinimum = (min, value) => value.length > min;

export const isMaximum = (max, value) => value.length < max