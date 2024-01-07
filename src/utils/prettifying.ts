export const prettifying = (query: string): string => {
  const TAB_SIZE = 2;

  let indentLevel = 0;
  let outputCode = '';

  const line = query.replace(/\s+/g, '~');

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '{') {
      outputCode += ' {\n' + ' '.repeat(TAB_SIZE * (indentLevel + 1));
      indentLevel++;
    } else if (char === '}') {
      indentLevel--;
      outputCode =
        outputCode.trimEnd() +
        '\n' +
        ' '.repeat(TAB_SIZE * indentLevel) +
        '}\n';
    } else if (char === ',') {
      outputCode += ', ';
    } else if (char === '(') {
      outputCode += ' (';
    } else if (char === ':') {
      outputCode += ': ';
    } else if (char === '~') {
      const lastChar = line[i - 1] === ' ';
      const nextChar = line[i + 1] === ' ';

      outputCode += lastChar || nextChar ? '' : ' ';
    } else {
      outputCode += char;
    }
  }

  console.log(outputCode);

  return outputCode.trim();
};
