import logger from "../winstonLogs.js";

export function schemaReqValidation(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body || {}, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const invalid_fields = error.details.reduce(
        (accum, { context, path, message }) => {
          const field = context.label || path[0] || "unknown";
          return { ...accum, [field]: message };
        },
        {},
      );

      console.log(invalid_fields);
      res.status(400).send({ invalid_fields });
      return;
    } else {
      next();
    }
  };
}

export function schemaResValidation(schema, response) {
  const { error } = schema.validate(response, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    let errorMessages = {};
    error.details.map((detailErr) => {
      logger.info(detailErr);
      const field = detailErr.context.label || detailErr.path?.[0] || "unknown";
      errorMessages[field] = detailErr.message;
    });
    return errorMessages;
  } else {
    return false;
  }
}
