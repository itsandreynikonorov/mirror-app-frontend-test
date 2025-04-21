export const formatDate = (
  dateString: string,
  locale = navigator.language,
): string => {
  const date = new Date(dateString);
  const now = new Date();

  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) {
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";

    let daysText = "days";
    if (diffDays === 1) daysText = "day";

    return `${diffDays} ${daysText} ago`;
  }

  return date.toLocaleDateString(locale);
};
