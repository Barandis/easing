// Copyright (c) 2019 Thomas J. Otterson
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { linear } from './easing';

const NEWTON_ITERATIONS = 4;
const NEWTON_MIN_SLOPE = 0.001;
const SUBDIVISION_PRECISION = 0.0000001;
const SUBDIVISION_MAX_ITERATIONS = 10;

const K_SPLINE_TABLE_SIZE = 11;
const K_SAMPLE_STEP_SIZE = 1 / (K_SPLINE_TABLE_SIZE - 1);

const calcA = (a1, a2) => 1 - 3 * a2 + 3 * a1;
const calcB = (a1, a2) => 3 * a2 - 6 * a1;
const calcC = a1 => 3 * a1;

function calcBezier(t, a1, a2) {
  return (calcA(a1, a2) * t + calcB(a1, a2)) * t + calcC(a1);
}

function calcSlope(t, a1, a2) {
  return 3 * calcA(a1, a2) * t * t + 2 * calcB(a1, a2) * t + calcC(a1);
}

function subdivide(x, a, b, x1, x2) {
  let cx = 0;
  let t = 0;
  let ta = a;
  let tb = b;
  let i = 0;

  do {
    t = ta + (tb - ta) / 2;
    cx = calcBezier(t, x1, x2) - x;
    if (cx > 0) {
      tb = t;
    } else {
      ta = t;
    }
  } while (Math.abs(x) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return t;
}

function newton(x, guess, x1, x2) {
  let t = guess;

  for (let i = 0; i < NEWTON_ITERATIONS; i++) {
    const slope = calcSlope(t, x1, x2);
    if (slope === 0) {
      break;
    }
    const cx = calcBezier(t, x1, x2) - x;
    t -= cx / slope;
  }

  return t;
}

export function makeBezier(x1, y1, x2, y2) {
  if (x1 === y1 && x2 === y2) {
    return linear;
  }

  const samples = new Float32Array(K_SPLINE_TABLE_SIZE);
  for (let i = 0; i < K_SPLINE_TABLE_SIZE; i++) {
    samples[i] = calcBezier(i * K_SAMPLE_STEP_SIZE, x1, x2);
  }

  function calcT(x) {
    let start = 0;
    let current = 1;
    const last = K_SPLINE_TABLE_SIZE - 1;

    for (; current !== last && samples[current] < x; current++) {
      start += K_SAMPLE_STEP_SIZE;
    }
    current -= 1;

    const dist = (x - samples[current]) / (samples[current + 1] - samples[current]);
    const guess = start + dist * K_SAMPLE_STEP_SIZE;
    const slope = calcSlope(guess, x1, x2);

    if (slope >= NEWTON_MIN_SLOPE) {
      return newton(x, guess, x1, x2);
    }
    if (slope === 0) {
      return guess;
    }
    return subdivide(x, start, start + K_SAMPLE_STEP_SIZE, x1, x2);
  }

  return function bezier(t) {
    return calcBezier(calcT(t), y1, y2);
  };
}
