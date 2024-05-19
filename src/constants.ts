const MOCKS_FILE_NAME = 'mocks.json';

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

export { MOCKS_FILE_NAME, ExitCode, HttpCode };
