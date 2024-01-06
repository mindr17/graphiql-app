export const checkValues = (value: string): boolean => {
  try {
    return !!JSON.parse(value);
  } catch (error: unknown) {
    return false;
  }
};
