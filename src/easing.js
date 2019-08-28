// Copyright (c) 2019 Thomas J. Otterson
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
//

const TWO_PI = 2 * Math.PI;
const PI_OVER_TWO = Math.PI / 2;

const BACK_OVERSHOOT = 1.70158;

const BOUNCE_BASE = 7.5635;
const BOUNCE_THRESHOLD_1 = 1 / 2.75;
const BOUNCE_THRESHOLD_2 = 2 / 2.75;
const BOUNCE_THRESHOLD_3 = 2.5 / 2.75;
const BOUNCE_FACTOR_2 = 1.5 / 2.75;
const BOUNCE_FACTOR_3 = 2.25 / 2.75;
const BOUNCE_FACTOR_4 = 2.625 / 2.75;
const BOUNCE_OFFSET_2 = 0.75;
const BOUNCE_OFFSET_3 = 0.9375;
const BOUNCE_OFFSET_4 = 0.984375;

// Linear, which is just the identity function

export const linear = t => t;

// Sinusoidal functions

export const sineIn = t => 1 - Math.cos(t * PI_OVER_TWO);

export const sineOut = t => Math.sin(t * PI_OVER_TWO);

export const sineInOut = t => -(Math.cos(Math.PI * t) - 1) / 2;

// Quadratic functions

export const quadraticIn = t => t * t;

export const quadraticOut = t => t * (2 - t);

export const quadraticInOut = t => (t < 0.5 ? 2 * t * t : t * (4 - 2 * t) - 1);

// Cubic functions

export const cubicIn = t => t * t * t;

export const cubicOut = t => {
  const u = t - 1;
  return 1 + u * u * u;
};

export const cubicInOut = t => {
  const u = t - 1;
  return t < 0.5 ? 4 * t * t * t : 1 + 4 * u * u * u;
};

// Quartic functions

export const quarticIn = t => t * t * t * t;

export const quarticOut = t => {
  const u = t - 1;
  return 1 - u * u * u * u;
};

export const quarticInOut = t => {
  const u = t - 1;
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * u * u * u * u;
};

// Quintic functions

export const quinticIn = t => t * t * t * t * t;

export const quinticOut = t => {
  const u = t - 1;
  return 1 + u * u * u * u * u;
};

export const quinticInOut = t => {
  const u = t - 1;
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * u * u * u * u * u;
};

// Exponential functions

export const exponentialIn = t => 2 ** (10 * (t - 1));

export const exponentialOut = t => 1 - 2 ** (-10 * t);

export const exponentialInOut = t => {
  const u = t * 2 - 1;
  return t < 0.5 ? 2 ** (10 * u) / 2 : (2 - 2 ** (-10 * u)) / 2;
};

// Circular functions

export const circularIn = t => 1 - Math.sqrt(1 - t * t);

export const circularOut = t => Math.sqrt(t * (2 - t));

export const circularInOut = t => {
  const u = 2 * t;
  const v = u - 2;
  return t < 0.5 ? (Math.sqrt(1 - u * u) - 1) / 2 : (Math.sqrt(1 - v * v) + 1) / 2;
};

// Backwards functions

export const backwardsIn = t => t * t * ((BACK_OVERSHOOT + 1) * t - BACK_OVERSHOOT);

export const backwardsOut = t => {
  const u = t - 1;
  return u * u * ((BACK_OVERSHOOT + 1) * u + BACK_OVERSHOOT) + 1;
};

export const backwardsInOut = t => {
  const u = 2 * t;
  const v = u - 2;
  const s = BACK_OVERSHOOT * 1.525;
  return t < 0.5 ? (u * u * ((s + 1) * u - s)) / 2 : (v * v * ((s + 1) * v + s) + 2) / 2;
};

// Elastic functions

export const elasticIn = t => {
  const p = 0.3;
  const s = (p / TWO_PI) * Math.asin(1);
  const u = t - 1;
  return -(2 ** (10 * u) * Math.sin(((u - s) * TWO_PI) / p));
};

export const elasticOut = t => {
  const p = 0.3;
  const s = (p / TWO_PI) * Math.asin(1);
  return 2 ** (-10 * t) * Math.sin(((t - s) * TWO_PI) / p) + 1;
};

export const elasticInOut = t => {
  const p = 0.45;
  const s = (p / TWO_PI) * Math.asin(1);
  const u = 2 * t - 1;
  return t < 0.5
    ? -(2 ** (10 * u) * Math.sin(((u - s) * TWO_PI) / p)) / 2
    : (2 ** (-10 * u) * Math.sin(((u - s) * TWO_PI) / p)) / 2 + 1;
};

// Bounce functions

export const bounceOut = t => {
  if (t < BOUNCE_THRESHOLD_1) {
    return BOUNCE_BASE * t * t;
  }
  if (t < BOUNCE_THRESHOLD_2) {
    const u = t - BOUNCE_FACTOR_2;
    return BOUNCE_BASE * u * u + BOUNCE_OFFSET_2;
  }
  if (t < BOUNCE_THRESHOLD_3) {
    const u = t - BOUNCE_FACTOR_3;
    return BOUNCE_BASE * u * u + BOUNCE_OFFSET_3;
  }
  const u = t - BOUNCE_FACTOR_4;
  return BOUNCE_BASE * u * u + BOUNCE_OFFSET_4;
};

export const bounceIn = t => 1 - bounceOut(1 - t);

export const bounceInOut = t => (t < 0.5 ? bounceIn(2 * t) / 2 : bounceOut(2 * t - 1) / 2 + 0.5);
