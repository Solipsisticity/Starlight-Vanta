function expand(table) {
  const out = [];
  for (const [value, weight] of table) for (let i = 0; i < weight; i += 1) out.push(value);
  return out;
}

const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

export function isVowel(ch) {
  return VOWELS.has(ch);
}

export function vowelRatio(word) {
  if (!word.length) return 0;
  let count = 0;
  for (const ch of word) if (isVowel(ch)) count += 1;
  return count / word.length;
}

const AWKWARD = [
  /[bcdfgjkpqtvwxz]{3}/,
  /(.)\1\1/,
  /[qg]$/,
  /^[xq][bcdfgklmnprstvwz]/,
  /[aeiouy]{4}/,
  /[jqvxz]{2}/,
  /^[^a-z]/,
];

export function isPronounceable(word) {
  if (word.length < 2) return false;
  if (!/[aeiouy]/.test(word)) return false;
  for (const pattern of AWKWARD) if (pattern.test(word)) return false;
  const ratio = vowelRatio(word);
  return ratio >= 0.22 && ratio <= 0.68;
}

const COIN_ONSETS = expand([
  ["b", 3], ["c", 2], ["d", 3], ["f", 2], ["g", 2], ["h", 1], ["k", 3], ["l", 4],
  ["m", 4], ["n", 3], ["p", 2], ["r", 4], ["s", 4], ["t", 4], ["v", 4], ["z", 1],
  ["th", 2],
]);

const COIN_LEAD_ONSETS = expand([
  ["br", 1], ["dr", 1], ["fl", 1], ["pr", 1], ["st", 1], ["tr", 1], ["cr", 1],
]);

const COIN_FINAL_ONSETS = expand([
  ["d", 3], ["l", 4], ["m", 3], ["n", 4], ["r", 4], ["s", 3], ["t", 3], ["v", 3],
  ["th", 1], ["k", 2],
]);

const COIN_NUCLEI = expand([["a", 8], ["e", 7], ["i", 5], ["o", 6], ["u", 2], ["ae", 1], ["ia", 1]]);

const COIN_CODAS = expand([["", 12], ["l", 3], ["n", 4], ["r", 3], ["s", 2]]);

const COIN_ENDINGS = expand([
  ["a", 5], ["e", 3], ["o", 3], ["is", 2], ["yn", 2], ["ix", 1],
  ["en", 3], ["el", 2], ["ia", 2], ["ie", 1], ["on", 2], ["er", 1],
]);

const ONSET_CLUSTERS = new Set([
  "bl", "br", "ch", "cl", "cr", "dr", "fl", "fr", "gl", "gr", "kl", "kr", "ph", "pl", "pr",
  "sc", "sh", "sk", "sl", "sm", "sn", "sp", "st", "sw", "th", "tr", "tw", "wr", "str", "spr", "scr",
]);

const CODA_CLUSTERS = new Set([
  "ch", "ck", "ct", "ft", "ld", "lf", "lk", "lm", "lp", "ls", "lt", "lth", "mp", "nd", "ng", "nk",
  "ns", "nt", "nth", "nx", "rd", "rk", "rl", "rm", "rn", "rs", "rst", "rt", "rth", "sh", "sk", "sp",
  "st", "th", "ts", "ks", "xt",
]);

const MEDIAL_PAIRS = new Set([
  "lb", "lc", "ld", "lf", "lk", "lm", "lp", "ls", "lt", "lv", "mb", "mp", "ms", "nc", "nd", "nf",
  "ng", "nk", "ns", "nt", "nv", "nz", "rb", "rc", "rd", "rf", "rg", "rk", "rl", "rm", "rn", "rp",
  "rs", "rt", "rv", "rz", "sk", "sm", "sp", "st", "ct", "ft", "pt", "xt", "ll", "nn", "rr", "ss",
  "tt", "ff", "mm", "ck", "sh", "th", "ch", "ph",
]);

const VOWEL_PAIRS = new Set([
  "ae", "ai", "au", "ay", "ea", "ee", "ei", "eo", "ey", "ia", "ie", "io", "oa", "oe",
  "oi", "oo", "ou", "oy", "ua", "ue", "ui", "ya", "ye", "yo",
]);

const FINAL_SINGLE_BLOCKED = new Set(["j", "q", "v"]);

function medialAllowed(run) {
  if (run.length === 1) return true;
  if (run.length === 2) return MEDIAL_PAIRS.has(run) || ONSET_CLUSTERS.has(run);
  if (run.length === 3) {
    return ("lmnrs".includes(run[0]) && ONSET_CLUSTERS.has(run.slice(1))) || CODA_CLUSTERS.has(run);
  }
  return false;
}

export function soundsNatural(word) {
  if (/q(?!u)/.test(word)) return false;
  if (/([^aeiouy])([aeiouy])\1[aeiouy]/.test(word)) return false;
  if (/([a-z]{2,3})\1/.test(word)) return false;
  const runs = word.match(/[aeiouy]+|[^aeiouy]+/g) || [];
  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];
    if (isVowel(run[0])) {
      if (run.length > 2 || (run.length === 2 && !VOWEL_PAIRS.has(run))) return false;
      continue;
    }
    if (i === 0) {
      if (run.length > 1 && !ONSET_CLUSTERS.has(run)) return false;
    } else if (i === runs.length - 1) {
      if (run.length === 1 ? FINAL_SINGLE_BLOCKED.has(run) : !CODA_CLUSTERS.has(run)) return false;
    } else if (!medialAllowed(run)) {
      return false;
    }
  }
  return true;
}

function pick(rng, pool) {
  return pool[rng.int(pool.length)];
}

function coinAttempt(rng, syllables) {
  let word = "";
  let previous = "";
  for (let i = 0; i < syllables - 1; i += 1) {
    let onset = i === 0 && rng.chance(0.16) ? pick(rng, COIN_LEAD_ONSETS) : pick(rng, COIN_ONSETS);
    if (onset === previous) onset = pick(rng, COIN_ONSETS);
    const nucleus = pick(rng, COIN_NUCLEI);
    const coda = i === 0 && rng.chance(0.3) ? pick(rng, COIN_CODAS) : "";
    word += onset + nucleus + coda;
    previous = onset;
  }
  let finalOnset = pick(rng, COIN_FINAL_ONSETS);
  if (finalOnset === previous) finalOnset = pick(rng, COIN_FINAL_ONSETS);
  return word + finalOnset + pick(rng, COIN_ENDINGS);
}

export function coinWord(rng, syllables) {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const word = coinAttempt(rng, syllables).replace(/(.)\1+/g, "$1");
    if (word.length <= 9 && soundsNatural(word)) return word;
  }
  return null;
}

export function joinParts(left, right) {
  if (!left) return right;
  if (!right) return left;
  for (let overlap = Math.min(3, left.length - 1, right.length - 1); overlap >= 1; overlap -= 1) {
    if (left.slice(-overlap) === right.slice(0, overlap)) return left + right.slice(overlap);
  }
  if (isVowel(left[left.length - 1]) && isVowel(right[0])) return left.slice(0, -1) + right;
  return left + right;
}
