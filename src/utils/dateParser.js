const parseIssueDate = (date) => {
  const month =  date.toLocaleString('default', { month: 'long' });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return month + ' ' + day + ', ' + year;
}

module.exports = {
  parseIssueDate
}
