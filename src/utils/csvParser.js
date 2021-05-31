const parseCSV = (input)=> {
  try {
    const lines = input.split("\r\n");
    lines.forEach((line, index) => {
      lines[index] = line.split(",");
    });
    const headers = lines.shift();
    const result = [];

    lines.forEach(line => {
      const entry = {};

      headers.forEach((key, index) => {
        entry[key] = line[index];
      });
      result.push(entry);
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

export default parseCSV;
