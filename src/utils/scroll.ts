export const scrollToBottom = () => {
  const doc = document.documentElement;
  const body = document.body;
  const scrollHeight = doc.scrollHeight || body.scrollHeight;

  window.scrollTo({
    top: scrollHeight,
    behavior: 'smooth',
  });
};
