export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};
