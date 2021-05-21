import * as express from 'express';
import * as bodyParser from 'body-parser';
import GoogleResponse from './interface/GoogleResponse';
import ResponseFactory from './factory/ResponseFactory';
import { gResponseError } from './type/GoogleErrorCodes';

const app = express();
const port = 80;
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/recaptcha/api/siteverify', (req, res) => {
  const data = req.body;
  let response: GoogleResponse;

  if (data.response === undefined || data.response === '') {
    response = ResponseFactory.createErrorResponse(req, gResponseError.MISSING_RESPONSE);
  } else if (data.secret === undefined || data.secret === '') {
    response = ResponseFactory.createErrorResponse(req, gResponseError.MISSING_SECRET);
  } else if (Object.values(gResponseError).includes(data.response)) {
    response = ResponseFactory.createErrorResponse(req, data.response);
  } else {
    response = ResponseFactory.createSuccessResponse(req);
  }

  res.status(200).send(response);
});

app.listen(port, () => console.info(`Google reCaptcha simulator is running on port '${port}'`));
