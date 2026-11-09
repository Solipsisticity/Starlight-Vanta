import {
  BLOCKED_SUBSTRINGS,
  ENDINGS,
  NUMBER_SUFFIXES,
  REGISTERS,
  REGISTER_WEIGHTS,
  SHORT_ROOTS,
  STRUCTURES,
  STRUCTURE_LABELS,
  STYLES,
  TONES,
  TONE_LABELS,
} from "./lexicon.js";
import { coinWord, isPronounceable, isVowel, joinParts, soundsNatural } from "./phonology.js";
import { describe, flow, rarity } from "./score.js";

export { STYLES, STRUCTURES, STRUCTURE_LABELS, TONES, TONE_LABELS };

function createRng(seed) {
  let state = seed >>> 0 || 0x9e3779b9;
  const next = () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0x100000000;
  };
  return {
    next,
    int: (max) => Math.floor(next() * max),
    pick: (list) => list[Math.floor(next() * list.length)],
    chance: (probability) => next() < probability,
  };
}

function randomSeed() {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    return crypto.getRandomValues(new Uint32Array(1))[0];
  }
  return Math.floor(Math.random() * 0xffffffff);
}

function rootPool(style) {
  const weights = REGISTER_WEIGHTS[style] || REGISTER_WEIGHTS.aesthetic;
  const pool = [];
  for (const [register, weight] of Object.entries(weights)) {
    const words = REGISTERS[register] || [];
    for (let i = 0; i < weight; i += 1) pool.push(...words);
  }
  return pool;
}

function trimRoot(word) {
  return word.replace(/(ing|ed|ium|ius|us|um)$/, "");
}

function withEnding(stem, ending) {
  const base = stem.length > 4 && /[^aeiouy]e$/.test(stem) ? stem.slice(0, -1) : stem;
  const lastIsVowel = isVowel(base[base.length - 1]);
  if (lastIsVowel && isVowel(ending[0])) return base.slice(0, -1) + ending;
  if (!lastIsVowel && !isVowel(ending[0])) return null;
  return base + ending;
}

const STYLE_PARTS = {
  rare: { starts: ["aer", "elv", "lyr", "or", "sel", "ves", "zel", "kael", "nael", "ser", "thal", "valen"], ends: ["ion", "ora", "en", "iel", "is", "ara"] },
  aesthetic: { starts: ["aura", "lumi", "mira", "sora", "vela", "ciela", "lila", "nora", "elara", "sylva", "melo", "seren"], ends: ["elle", "ora", "ine", "ia", "en", "is"] },
  minimal: { starts: ["ali", "eva", "kai", "lio", "mio", "noa", "sai", "ael", "eno", "ivo", "tavi", "yara"], ends: ["an", "en", "el", "io", "on", "ra"] },
  clean: { starts: ["aero", "cala", "mira", "nova", "sera", "vela", "luma"], ends: ["en", "ia", "on", "ora", "is", "el"] },
  dark: { starts: ["ashen", "dusk", "noct", "raven", "umbra", "vesper", "sable", "nyra", "morrow", "shade", "hollow", "cinder"], ends: ["en", "is", "or", "ine", "ara", "el"] },
  futuristic: { starts: ["axi", "cyra", "kine", "nexo", "prisma", "velox", "zyra", "syna", "vectra", "orbi", "quant", "tera"], ends: ["on", "ix", "ara", "ium", "is", "en"] },
  gaming: { starts: ["aeg", "draven", "kairo", "nyx", "riven", "vex", "zeph"], ends: ["ar", "en", "ion", "is", "or", "yn"] },
  nature: { starts: ["alder", "briar", "clover", "fern", "moss", "sorrel", "willow", "lark", "flora", "reed", "meadow", "tundra"], ends: ["en", "ia", "is", "on", "ora", "el"] },
  mythic: { starts: ["aeg", "elys", "lyra", "orion", "sera", "thalia", "valka", "arion", "kaela", "mira", "selene", "taryn"], ends: ["el", "en", "is", "ora", "or", "iel"] },
  experimental: { starts: ["aero", "cyno", "luma", "nexo", "riva", "sora", "vexa"], ends: ["en", "ia", "on", "ora", "is", "el"] },
};

function buildSingle(rng, pool) {
  return rng.pick(pool);
}

function portmanteau(left, right) {
  const options = [];
  const minLeft = Math.max(3, Math.ceil(left.length * 0.6));
  const minRight = Math.max(4, Math.ceil(right.length * 0.6));
  for (let i = minLeft; i <= left.length; i += 1) {
    const pivot = left[i - 1];
    for (let j = 1; j <= right.length - minRight + 1; j += 1) {
      if (right[j - 1] !== pivot) continue;
      if (j > 1 && !isVowel(right[j - 2]) && !isVowel(pivot)) continue;
      const merged = left.slice(0, i) + right.slice(j);
      if (merged !== left && merged !== right && merged.length >= 5 && merged.length <= 10) options.push(merged);
    }
  }
  return options;
}

function buildBlend(rng, pool) {
  const left = trimRoot(rng.pick(pool));
  const right = trimRoot(rng.pick(pool));
  if (left === right || left.slice(0, 3) === right.slice(0, 3)) return null;
  const options = portmanteau(left, right).filter(soundsNatural);
  return options.length ? rng.pick(options) : null;
}

function buildRootAffix(rng, pool, style) {
  const root = trimRoot(rng.pick(pool));
  if (root.length > 7) return null;
  return withEnding(root, rng.pick(STYLE_PARTS[style]?.ends || ENDINGS));
}

function buildCoined(rng, pool, style) {
  const parts = STYLE_PARTS[style] || STYLE_PARTS.aesthetic;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const word = joinParts(rng.pick(parts.starts), rng.pick(parts.ends));
    if (isPronounceable(word) && !/(.{2,3})\1/.test(word)) return word;
  }
  return coinWord(rng, 2);
}

function buildCompound(rng, pool, style) {
  const left = rng.pick(STYLE_PARTS[style]?.starts || SHORT_ROOTS);
  const right = trimRoot(rng.pick(pool));
  if (left === right || right.startsWith(left) || right.length > 7) return null;
  if (isVowel(left[left.length - 1]) && isVowel(right[0])) return null;
  const compound = left.endsWith(right[0]) ? left + right.slice(1) : left + right;
  return compound.length >= 5 && compound.length <= 11 ? compound : null;
}

function buildShort(rng) {
  const start = rng.pick(["b", "c", "d", "f", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "z"]);
  const middle = rng.pick(["a", "e", "i", "o", "u"]);
  const end = rng.pick(["d", "l", "m", "n", "r", "s", "t", "v", "y"]);
  return start + middle + end;
}

function buildNumbered(rng, pool) {
  const base = rng.chance(0.5) ? buildSingle(rng, pool) : buildRootAffix(rng, pool, "rare");
  return base ? base + rng.pick(NUMBER_SUFFIXES) : null;
}

const BUILDERS = {
  single: buildSingle,
  blend: buildBlend,
  "root-affix": buildRootAffix,
  coined: buildCoined,
  compound: buildCompound,
  numbered: buildNumbered,
};

const WHOLE_WORD_STRUCTURES = new Set(["single", "compound"]);

function applyTone(rng, name, tone) {
  switch (tone) {
    case "capitalized":
      return name.charAt(0).toUpperCase() + name.slice(1);
    case "condensed":
      return name.replace(/[aeiou]$/, "");
    case "spaced": {
      const cut = 2 + rng.int(Math.max(1, name.length - 4));
      if (cut <= 1 || cut >= name.length - 1) return name;
      return `${name.slice(0, cut)}_${name.slice(cut)}`;
    }
    default:
      return name.toLowerCase();
  }
}

const COMMON_SHORT_WORDS = new Set(["and", "are", "art", "bad", "bat", "bed", "bet", "big", "bit", "boy", "bus", "but", "can", "car", "cat", "cod", "cut", "day", "did", "dig", "dog", "dot", "dry", "ear", "eat", "end", "far", "fat", "fed", "few", "fit", "fix", "fly", "for", "fun", "get", "god", "got", "had", "has", "hat", "her", "hey", "him", "his", "hit", "hot", "how", "its", "job", "joy", "key", "kid", "law", "lay", "let", "lid", "lie", "lip", "lit", "log", "lot", "low", "mad", "man", "map", "mat", "may", "men", "met", "mix", "mom", "mud", "new", "nod", "nor", "not", "now", "nut", "odd", "off", "old", "one", "our", "out", "own", "pan", "pay", "pen", "pet", "pie", "pig", "pin", "pit", "pop", "pot", "put", "ran", "rat", "raw", "red", "rid", "rip", "rob", "rod", "row", "rub", "run", "sad", "sat", "saw", "say", "sea", "see", "set", "she", "shy", "sin", "sir", "sit", "six", "sky", "son", "sun", "tan", "tap", "tar", "tax", "tea", "ten", "the", "tie", "tin", "tip", "toe", "top", "toy", "try", "two", "use", "van", "war", "was", "way", "web", "wed", "wet", "who", "why", "win", "wit", "won", "yes", "yet", "you", "zip", "zoo"]);

const ENGLISH_NOISE = /their|there|about|would|could|should|people|through|another|between|nothing|thing|which|where|because|please|really/;

const FLOW_FLOOR = { coined: 84, blend: 80, compound: 72, seeded: 76, remix: 76, default: 74 };

function isAcceptable(name, config, structure = "default") {
  const bare = name.toLowerCase();
  if (bare.length < config.minLength || bare.length > config.maxLength) return false;
  if (!/^[a-z][a-z0-9_]*$/.test(bare)) return false;
  if (!config.allowDigits && /\d/.test(bare)) return false;
  if (!config.allowSeparators && /_/.test(bare)) return false;
  for (const blocked of BLOCKED_SUBSTRINGS) if (bare.includes(blocked)) return false;

  const letters = bare.replace(/[0-9_]/g, "");
  if (!isPronounceable(letters)) return false;
  if (ENGLISH_NOISE.test(letters) || COMMON_SHORT_WORDS.has(letters) || /ii|uu|yy/.test(letters)) return false;
  if (/(.{2,4})\1/.test(letters) || /(xix|isis|enen|elel|erer)$/.test(letters)) return false;
  if (!WHOLE_WORD_STRUCTURES.has(structure) && structure !== "numbered" && structure !== "coined" && !soundsNatural(letters)) return false;
  return flow(letters) >= (FLOW_FLOOR[structure] ?? FLOW_FLOOR.default);
}

export const DEFAULT_CONFIG = {
  style: "aesthetic",
  minLength: 4,
  maxLength: 10,
  structures: ["coined"],
  tone: "lowercase",
  allowDigits: false,
  allowSeparators: false,
};

export function normalizeConfig(config = {}) {
  const merged = { ...DEFAULT_CONFIG, ...config };
  const structures = (merged.structures || []).filter((s) => STRUCTURES.includes(s));
  const maxLength = Math.min(20, Math.max(3, merged.maxLength));
  return {
    ...merged,
    structures: structures.length ? structures : DEFAULT_CONFIG.structures,
    maxLength,
    minLength: Math.min(Math.max(2, merged.minLength), maxLength),
    style: STYLES.includes(merged.style) ? merged.style : DEFAULT_CONFIG.style,
    tone: TONES.includes(merged.tone) ? merged.tone : DEFAULT_CONFIG.tone,
  };
}

function decorate(name, config, structure) {
  return {
    name,
    style: config.style,
    structure,
    rarity: rarity(name),
    flow: flow(name),
    note: describe(name),
  };
}

export function generate(rawConfig, count = 12, seed = randomSeed()) {
  const config = normalizeConfig(rawConfig);
  const rng = createRng(seed);
  const pool = rootPool(config.style);
  const results = new Map();
  const stems = new Map();

  const structures = config.allowDigits
    ? [...config.structures, "numbered"]
    : config.structures.filter((s) => s !== "numbered");
  const active = structures.length ? structures : ["single"];

  let attempts = 0;
  while (results.size < count && attempts < count * 160) {
    attempts += 1;
    const structure = active[attempts % active.length];
    const raw = config.maxLength === 3 ? buildShort(rng) : BUILDERS[structure](rng, pool, config.style);
    if (!raw || (structure === "coined" && pool.includes(raw))) continue;

    const toned = applyTone(rng, String(raw).toLowerCase(), config.tone);
    if (!isAcceptable(toned, config, structure)) continue;

    const key = toned.toLowerCase();
    if (results.has(key)) continue;

    const stem = key.slice(0, 3);
    if ((stems.get(stem) || 0) >= 1) continue;
    stems.set(stem, (stems.get(stem) || 0) + 1);

    results.set(key, decorate(toned, config, structure));
  }

  return [...results.values()];
}

function collect(recipes, count, accept) {
  const results = new Map();
  let attempts = 0;
  while (results.size < count && attempts < count * 60) {
    const raw = recipes[attempts % recipes.length]();
    attempts += 1;
    if (!raw) continue;
    const candidate = raw.toLowerCase();
    if (results.has(candidate) || !accept(candidate)) continue;
    results.set(candidate, candidate);
  }
  return [...results.values()];
}

export function generateFromSeed(word, rawConfig, count = 9, seed = randomSeed()) {
  const config = normalizeConfig({ ...rawConfig, minLength: 3, maxLength: 13 });
  const base = String(word || "").toLowerCase().replace(/[^a-z]/g, "");
  if (base.length < 2) return [];

  const rng = createRng(seed);
  const pool = rootPool(config.style);
  const stem = trimRoot(base);

  const recipes = [
    () => withEnding(stem, rng.pick(ENDINGS)),
    () => portmanteau(stem, trimRoot(rng.pick(pool))).find(soundsNatural),
    () => portmanteau(trimRoot(rng.pick(pool)), base).find(soundsNatural),
    () => stem + rng.pick(SHORT_ROOTS),
    () => rng.pick(SHORT_ROOTS) + base,
    () => withEnding(stem.slice(0, Math.max(3, stem.length - 1)), rng.pick(ENDINGS)),
  ];

  const names = collect(recipes, count, (candidate) => {
    const toned = applyTone(rng, candidate, config.tone);
    return candidate !== base && isAcceptable(toned, { ...config, minLength: 3, maxLength: 13 }, "compound");
  });

  return names
    .map((name) => decorate(applyTone(rng, name, config.tone), config, "seeded"))
    .sort((a, b) => b.rarity + b.flow - (a.rarity + a.flow));
}

export function remix(name, count = 9, seed = randomSeed()) {
  const base = String(name || "").toLowerCase().replace(/[^a-z0-9_]/g, "");
  if (base.length < 2) return [];
  const rng = createRng(seed);
  const letters = base.replace(/[^a-z]/g, "");
  const stem = trimRoot(letters);

  const recipes = [
    () => withEnding(stem, rng.pick(ENDINGS)),
    () => letters.replace(/[aeiou]$/, "") + rng.pick(["a", "e", "o", "ia", "ae"]),
    () => stem + rng.pick(SHORT_ROOTS),
    () => rng.pick(SHORT_ROOTS) + stem,
    () => withEnding(letters.slice(0, Math.max(3, letters.length - 2)), rng.pick(ENDINGS)),
    () => portmanteau(letters, rng.pick(SHORT_ROOTS)).find(soundsNatural),
  ];

  return collect(recipes, count, (candidate) =>
    candidate !== base &&
    candidate.length >= 3 &&
    candidate.length <= 16 &&
    isPronounceable(candidate) &&
    !BLOCKED_SUBSTRINGS.some((blocked) => candidate.includes(blocked)),
  ).map((candidate) => decorate(candidate, { style: "remix" }, "remix"));
}

export function buildCustom({ head = "", core = "", tail = "", tone = "lowercase" }) {
  const rng = createRng(0x5bf03635);
  const joined = joinParts(joinParts(head.toLowerCase(), core.toLowerCase()), tail.toLowerCase());
  const name = applyTone(rng, joined, tone).slice(0, 24);
  return {
    name,
    rarity: name ? rarity(name) : 0,
    flow: name ? flow(name) : 0,
    note: name ? describe(name) : "",
    valid: name.length >= 2 && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(name),
  };
}

export const PRESETS = [
  {
    name: "Gallery",
    desc: "Soft one-word handles that look right in lowercase.",
    config: { style: "aesthetic", minLength: 4, maxLength: 9, structures: ["single", "blend"], tone: "lowercase", allowDigits: false, allowSeparators: false },
  },
  {
    name: "Four letters",
    desc: "The short end of the register, where almost nothing is free.",
    config: { style: "minimal", minLength: 3, maxLength: 5, structures: ["single", "coined"], tone: "lowercase", allowDigits: false, allowSeparators: false },
  },
  {
    name: "Invented",
    desc: "Invented-sounding names assembled from curated syllable parts.",
    config: { style: "mythic", minLength: 5, maxLength: 9, structures: ["coined"], tone: "lowercase", allowDigits: false, allowSeparators: false },
  },
  {
    name: "Nightfall",
    desc: "Darker roots, longer vowels, no digits.",
    config: { style: "dark", minLength: 5, maxLength: 11, structures: ["single", "blend", "root-affix"], tone: "lowercase", allowDigits: false, allowSeparators: false },
  },
  {
    name: "Systems",
    desc: "Technical vocabulary for tooling, bots, and side projects.",
    config: { style: "futuristic", minLength: 4, maxLength: 12, structures: ["single", "compound", "root-affix"], tone: "lowercase", allowDigits: false, allowSeparators: false },
  },
  {
    name: "Field notes",
    desc: "Plants, weather, terrain — names that sound lived in.",
    config: { style: "nature", minLength: 4, maxLength: 11, structures: ["single", "blend"], tone: "lowercase", allowDigits: false, allowSeparators: false },
  },
  {
    name: "Competitive",
    desc: "Sharper compounds for tags that have to read at a glance.",
    config: { style: "gaming", minLength: 4, maxLength: 12, structures: ["compound", "root-affix"], tone: "capitalized", allowDigits: false, allowSeparators: false },
  },
  {
    name: "Taken twice over",
    desc: "Longer builds with digits, for platforms where everything is gone.",
    config: { style: "rare", minLength: 6, maxLength: 14, structures: ["blend", "root-affix", "numbered"], tone: "lowercase", allowDigits: true, allowSeparators: false },
  },
];

export const COLLECTIONS = [
  { name: "Rare", config: { style: "rare", minLength: 4, maxLength: 8, structures: ["single", "blend"], tone: "lowercase" } },
  { name: "Three letters", config: { style: "minimal", minLength: 3, maxLength: 3, structures: ["single", "coined"], tone: "lowercase" } },
  { name: "Four letters", config: { style: "minimal", minLength: 4, maxLength: 4, structures: ["single", "coined"], tone: "lowercase" } },
  { name: "Five letters", config: { style: "aesthetic", minLength: 5, maxLength: 5, structures: ["single", "coined", "blend"], tone: "lowercase" } },
  { name: "Invented", config: { style: "mythic", minLength: 5, maxLength: 10, structures: ["coined"], tone: "lowercase" } },
  { name: "Celestial", config: { style: "rare", minLength: 4, maxLength: 11, structures: ["single", "blend", "root-affix"], tone: "lowercase" } },
  { name: "Dark", config: { style: "dark", minLength: 4, maxLength: 11, structures: ["single", "blend"], tone: "lowercase" } },
  { name: "Technical", config: { style: "futuristic", minLength: 4, maxLength: 12, structures: ["single", "compound"], tone: "lowercase" } },
  { name: "Soft", config: { style: "aesthetic", minLength: 4, maxLength: 10, structures: ["single", "root-affix"], tone: "lowercase" } },
  { name: "Outdoors", config: { style: "nature", minLength: 4, maxLength: 11, structures: ["single", "blend"], tone: "lowercase" } },
  { name: "Mythic", config: { style: "mythic", minLength: 5, maxLength: 12, structures: ["single", "blend", "root-affix"], tone: "lowercase" } },
  { name: "With digits", config: { style: "rare", minLength: 5, maxLength: 13, structures: ["numbered"], tone: "lowercase", allowDigits: true } },
];
