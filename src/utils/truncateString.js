const truncateString = (string, num) => {
  if (string.length <= num) {
    return string;
  }
  return `${string.slice(0, num - 4)}...${string.slice(string.length - 4, string.length)}`;
};

export default truncateString;
