const MOCKS_FILE_NAME = 'mocks.json';
const MAX_ID_LENGTH = 6;

const enum ExitCode {
  Error = 1,
  Success = 0
}

const enum HttpCode {
  Ok = 200,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500
}

const enum CommentsRestrict {
  Min = 0,
  Max = 4
}

export { MOCKS_FILE_NAME, MAX_ID_LENGTH, ExitCode, HttpCode, CommentsRestrict };
