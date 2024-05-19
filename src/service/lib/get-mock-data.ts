import { readFile } from 'node:fs/promises';
import { MOCKS_FILE_NAME } from '../../constants.js';
import type { Article } from '../types.js';

let data: Article[] = [];

const getMockData = async (): Promise<Article[]> => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await readFile(MOCKS_FILE_NAME);
    data = JSON.parse(fileContent.toString());
  } catch (err) {
    console.error(err);
  }

  return data;
};

export default getMockData;
