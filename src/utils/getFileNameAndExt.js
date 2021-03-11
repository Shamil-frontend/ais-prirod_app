const getFileNameAndExt = (fileName) => {
  return {
    name: fileName.substr(0, fileName.lastIndexOf('.')),
    ext: fileName.substr(fileName.lastIndexOf('.') + 1, fileName.length),
  };
};

export default getFileNameAndExt;
