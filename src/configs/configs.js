export const BASE_URL_TRANSACTION = process.env.NODE_ENV === 'production' ? process.env.BASE_URL_TRANSACTION  : 'http://localhost:8092/transaction';
export const BASE_URL_CORE = process.env.NODE_ENV === 'production' ? process.env.BASE_URL_CORE : 'http://localhost:8091/core';
export const GOOGLE_API_KEY_RE_CAPTCHA  = process.env.NODE_ENV === 'production' ?  process.env.GOOGLE_API_KEY_RE_CAPTCHA : '6Lcd3iArAAAAAAUJI-22bSPgBrh6lmT2BEXu66Hb';
export const SERVER_NAME = process.env.NODE_ENV === 'production' ? process.env.SERVER_NAME : 'Wow Libre CMS';
export const SERVER_LOGO = process.env.NODE_ENV === 'production' ? process.env.SERVER_LOGO : 'https://static.wixstatic.com/media/5dd8a0_2f7e5d3dec3c4f699c7f576486664baa~mv2.png';