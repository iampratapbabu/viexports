//Handling Error 
exports.errorResponse = (res, message, error) => {
  console.log("ERROR HANDLER RUNS", message, error.httpCode);
  console.log("Full Error", error.message);

  let msgbody = error && error.message ? error.message : message;
  let statusCode = error && error.httpCode ? error.httpCode : 500
  if (statusCode == 500) {
    msgbody = msgbody + " [" + message + "] ";
  }

  res.status(statusCode).json({
    statusCode,
    success: false,
    message: msgbody,
    resData: error,
  });

};

//Handling Success
exports.successResponse = (res, message, resData) => {
  res.status(200).json({
    statusCode: 200,
    success: true,
    message,
    resData
  });
}