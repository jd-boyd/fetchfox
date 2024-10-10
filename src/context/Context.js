import {
  getAI,
  getCrawler,
  getFetcher,
  getExtractor,
  getExporter,
} from '../index.js';

export const contextKeys = [
  ['fetcher', getFetcher],
  ['ai', getAI],
  ['crawler', getCrawler],
  ['extractor', getExtractor],
  ['exporter', getExporter],
];

export const Context = class {
  constructor(args) {
    const cache = args?.cache;
    for (const [key, getter] of contextKeys) {
      let val;
      if (args && args[key]) {
        val = args[key];
      } else {
        val = getter(null, { ...this, cache });
      }
      this[key] = val;
    }
  }

  update(other) {
    for (const [key] of contextKeys) {
      if (other[key]) {
        this[key] = other[key];
      }
    }

    if (other.cache) {
      for (const [key] of contextKeys) {
        this[key].cache = other.cache;
      }
    }

    return this;
  }
}