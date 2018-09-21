import Color from 'color';

global.Color = Color;

export const tint = (color, weight) =>
    Color(color)
        .mix(Color('#fff'), weight)
        .string();
