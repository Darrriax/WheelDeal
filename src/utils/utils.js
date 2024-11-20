import moment from 'moment';

/**
 * @param {string} date: date from backend
 * @return {string} Moment date with formatted date repr
 */
export const getDate = (date) => {
  if (!date) {
    return '';
  }
  return moment(date).format('DD.MM.YYYY');
};

/**
 * @param {Date} date
 * @returns {string} result for sending data to api
 */
export const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD');
};

/**
 * @param {string | Date} date: date from backend
 * @return {string} Moment date with formatted date repr
 */
export const getDateTime = (date) => {
  if (!date) {
    return '-';
  }
  return moment(date).format('DD.MM.YYYY HH:mm');
};

/**
 * get default value instead of empty string
 * @param value
 * @return {*|string}
 */
export const getDefaultValue = (value) => {
  if (!value) {
    return '-';
  }
  return value;
};

/**
 * Split and return user's name with different variants
 * @param {string} name: full name of the user << Zaluzhnyi Valery Fedorovych>>
 * @param {number} value:
 * 0 - initials, 1 - Zaluzhnyi V., 2 - Zaluzhnyi V. F., 3 - Zaluzhnyi Valery
 * @return {*|string} '-' if no name or concatenated string
 */
export const getUserName = (name, value) => {
  if (!name) {
    return '-';
  }
  const nameLst = name.split(' ');
  switch (value) {
    case 0:
      return `${nameLst[0][0]}${nameLst[1][0]}`;
    case 1:
      return `${nameLst[0]} ${nameLst[1][0]}.`;
    case 2:
      return `${nameLst[0]} ${nameLst[1][0]}. ${nameLst[2][0]}.`;
    case 3:
      return `${nameLst[0]} ${nameLst[1]}`;
  }
};

/**
 * Reset form fields errors
 * @param {object} formErrors
 */
export const resetErrors = (formErrors) => {
  Object.keys(formErrors).forEach((error) => formErrors[error] = '');
};

/**
 * Scroll the viewport to the top of the specified element if conditions are met.
 */
export const moveUp = () => {
    const element = document.getElementById('search-results');

    if (element && element.clientHeight < 205) {
        return;
    }

    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
};

/**
 * Return max date parameter(today's date), specially for date-type input
 */
export const maxDate = () => {
    return new Date().toISOString().split('T')[0];
};

/**
 * Build query by filtering empty params, mapping the rest and joining 'em via &
 * @param {{
 * search:string|undefined,
 * gender: string|undefined,
 * tree_id: string|undefined,
 * text: string|undefined,
 * page: int|undefined}
 * } params: query parameters
 * @return {*|string} '-' built request query
 */
export const buildQueryParams = (params) => {
    return Object.entries(params)
        .filter(([key, value]) => value || value === 0)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
};

export const showFileInBrowser = (file) => {
    Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: file.url,
    }).click();
};