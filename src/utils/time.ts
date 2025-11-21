export const formatMessageTime = (isoString: string) => {
  const date = new Date(isoString);

  const datePart = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const timePart = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return { datePart, timePart };
};

export const isToday = (isoString: string) => {
  const today = new Date();
  const messageDate = new Date(isoString);

  return today.toDateString() === messageDate.toDateString();
};
