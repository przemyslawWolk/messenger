export const formatDate = (date) => {
  const numFormat = (num) => (num < 10 ? "0" + num : num);
  const year = date.getFullYear();
  const month = numFormat(date.getMonth() + 1);
  const day = numFormat(date.getDate());
  const hours = numFormat(date.getHours());
  const minutes = numFormat(date.getMinutes());
  const seconds = numFormat(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
