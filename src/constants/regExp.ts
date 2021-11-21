// eslint-disable-next-line import/no-anonymous-default-export
export default {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  PHONE_BODY_REGEX: /\d{6,13}$/i,
  PHONE_NUMBER: /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
  URL: /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,255}$/,
  POSITIVE_NUMBERS_REGEX: /^\d*[1-9]\d*$/,
  EMPTY_FIELD: /([^\s])/,
  NAME_FIELD: /^[a-zA-Z]+([\s -][a-zA-Z]+)*$/,
};