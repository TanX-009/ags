export default function truncate(title: string, maxLength: number) {
  /**
   * Truncate the window title name to the specified maximum length, adding an ellipsis if needed.
   *
   * @param {string} title - The original window title name.
   * @param {number} maxLength - The maximum allowed length for the title.
   * @returns {string} The truncated title if it exceeds maxLength, otherwise the original title.
   */
  if (title.length > maxLength) {
    return title.slice(0, maxLength - 3) + "...";
  }
  return title;
}
