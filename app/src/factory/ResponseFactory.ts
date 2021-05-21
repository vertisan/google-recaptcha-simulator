import GoogleResponse from "../interface/GoogleResponse";

export default class ResponseFactory {

  public static createSuccessResponse(req): GoogleResponse {
    const dateTime = new Date();

    return {
      success: true,
      challange_ts: dateTime.toISOString(),
      hostname: req.hostname,
      "error-codes": [],
    };
  }

  public static createErrorResponse(req, errorCode: string): GoogleResponse {
    const dateTime = new Date();

    return {
      success: false,
      challange_ts: dateTime.toISOString(),
      hostname: req.hostname,
      "error-codes": [errorCode],
    };
  }
}
