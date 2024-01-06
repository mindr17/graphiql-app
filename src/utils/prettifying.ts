export const prettifying = (query: string): string => {
  const TAB_SIZE = 2;

  let indentLevel = 0;
  let outputCode = '';

  for (let i = 0; i < query.length; i++) {
    const char = query[i];
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
      outputCode += ',\n' + ' '.repeat(TAB_SIZE * indentLevel);
    } else if (char === '(') {
      outputCode += ' (';
    } else if (char === ':') {
      outputCode += ': ';
    } else if (char.trim() !== '') {
      outputCode += char;
    }
  }

  return outputCode.trim();
};
