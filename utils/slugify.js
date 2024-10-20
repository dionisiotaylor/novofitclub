// utils/slugify.js

export function slugify(text) {
    return text
      .toString() // Convert to string
      .toLowerCase() // Convert to lowercase
      .trim() // Remove whitespace from both ends
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -
  }