export const BASE_URL_TRANSACTION = process.env.NODE_ENV === 'production' ? 'https://api.wowlibre.com/transaction' : 'http://localhost:8092/transaction';
export const BASE_URL = process.env.NODE_ENV === 'production' ?'https://api.wowlibre.com/core': 'http://localhost:8091/core';
export const GOOGLE_API_KEY_RE_CAPTCHA  = process.env.NODE_ENV === 'production' ?'6LcbSqcqAAAAAEQ0ODkqHr7WT1OJ9RwQfA1D9U1x': '6Lcd3iArAAAAAAUJI-22bSPgBrh6lmT2BEXu66Hb';
