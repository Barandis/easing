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

// Sine functions

export const inSine = t => 1 - Math.cos(t * PI_OVER_TWO);

export const outSine = t => Math.sin(t * PI_OVER_TWO);

export const inOutSine = t => -(Math.cos(Math.PI * t) - 1) / 2;

// Quadratic functions

export const inQuad = t => t * t;

export const outQuad = t => t * (2 - t);

export const inOutQuad = t => (t < 0.5 ? 2 * t * t : t * (4 - 2 * t) - 1);

// Cubic functions

export const inCubic = t => t * t * t;

export const outCubic = t => {
  const u = t - 1;
  return 1 + u * u * u;
};

export const inOutCubic = t => {
  const u = t - 1;
  return t < 0.5 ? 4 * t * t * t : 1 + 4 * u * u * u;
};

// Quartic functions

export const inQuart = t => t * t * t * t;

export const outQuart = t => {
  const u = t - 1;
  return 1 - u * u * u * u;
};

export const inOutQuart = t => {
  const u = t - 1;
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * u * u * u * u;
};

// Quintic functions

export const inQuint = t => t * t * t * t * t;

export const outQuint = t => {
  const u = t - 1;
  return 1 + u * u * u * u * u;
};

export const inOutQuint = t => {
  const u = t - 1;
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * u * u * u * u * u;
};

// Exponential functions

export const inExpo = t => 2 ** (10 * (t - 1));

export const outExpo = t => 1 - 2 ** (-10 * t);

export const inOutExpo = t => {
  const u = t * 2 - 1;
  return t < 0.5 ? 2 ** (10 * u) / 2 : (2 - 2 ** (-10 * u)) / 2;
};

// Circular functions

export const inCirc = t => 1 - Math.sqrt(1 - t * t);

export const outCirc = t => Math.sqrt(t * (2 - t));

export const inOutCirc = t => {
  const u = 2 * t;
  const v = u - 2;
  return t < 0.5 ? (Math.sqrt(1 - u * u) - 1) / 2 : (Math.sqrt(1 - v * v) + 1) / 2;
};

// Backwards functions

export const inBack = t => t * t * ((BACK_OVERSHOOT + 1) * t - BACK_OVERSHOOT);

export const outBack = t => {
  const u = t - 1;
  return u * u * ((BACK_OVERSHOOT + 1) * u + BACK_OVERSHOOT) + 1;
};

export const inOutBack = t => {
  const u = 2 * t;
  const v = u - 2;
  const s = BACK_OVERSHOOT * 1.525;
  return t < 0.5 ? (u * u * ((s + 1) * u - s)) / 2 : (v * v * ((s + 1) * v + s) + 2) / 2;
};

// Elastic functions

export const inElastic = t => {
  const p = 0.3;
  const s = (p / TWO_PI) * Math.asin(1);
  const u = t - 1;
  return -(2 ** (10 * u) * Math.sin(((u - s) * TWO_PI) / p));
};

export const outElastic = t => {
  const p = 0.3;
  const s = (p / TWO_PI) * Math.asin(1);
  return 2 ** (-10 * t) * Math.sin(((t - s) * TWO_PI) / p) + 1;
};

export const inOutElastic = t => {
  const p = 0.45;
  const s = (p / TWO_PI) * Math.asin(1);
  const u = 2 * t - 1;
  return t < 0.5
    ? -(2 ** (10 * u) * Math.sin(((u - s) * TWO_PI) / p)) / 2
    : (2 ** (-10 * u) * Math.sin(((u - s) * TWO_PI) / p)) / 2 + 1;
};

// Bounce functions

export const outBounce = t => {
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

export const inBounce = t => 1 - outBounce(1 - t);

export const inOutBounce = t => (t < 0.5 ? inBounce(2 * t) / 2 : outBounce(2 * t - 1) / 2 + 0.5);

// Compatibility

export const jquerify = fn => (x, t, b, c, d) => b + fn(t / d) * (c - b);
