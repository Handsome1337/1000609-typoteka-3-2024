const MOCKS_FILE_NAME = 'mocks.json';
const MAX_ID_LENGTH = 6;
const BAD_REQUEST_MESSAGE_TEXT = 'Некорректный запрос';
const NOT_FOUND_MESSAGE_TEXT = 'Не найдено';

const enum ExitCode {
  Error = 1,
  Success = 0
}

const enum HttpCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500
}

const enum CommentsRestrict {
  Min = 0,
  Max = 4
}

export {
  MOCKS_FILE_NAME,
  MAX_ID_LENGTH,
  BAD_REQUEST_MESSAGE_TEXT,
  NOT_FOUND_MESSAGE_TEXT,
  ExitCode,
  HttpCode,
  CommentsRestrict
};
