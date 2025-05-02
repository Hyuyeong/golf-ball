export default function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // 01~12
  const day = `0${date.getDate()}`.slice(-2); // 01~31
  return `${year}.${month}.${day}`;
}
