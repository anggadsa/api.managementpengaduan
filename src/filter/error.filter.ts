export function createErrorResponse(res, message) {
  return res.status(400).json({
    message: `${message}`,
  });
}
