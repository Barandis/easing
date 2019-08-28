// Copyright (c) 2019 Thomas J. Otterson
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export const reverse = easing => t => 1 - easing(1 - t);

export const mirror = easing => t => (t < 0.5 ? easing(2 * t) / 2 : 1 - easing(2 * (1 - t)) / 2);

export const addScaling = easing => (x, t, b, c, d) => b + easing(t / d) * (c - b);
