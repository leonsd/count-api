export const response = {
  success: {
    ok: (body: any) => {
      return {
        statusCode: 200,
        body: JSON.stringify(body)
      };
    },
    created: (body: any) => {
      return {
        statusCode: 201,
        body: JSON.stringify(body)
      };
    },
  },
  error: {
    badRequest: (body: any) => {
      return {
        statusCode: 400,
        body: JSON.stringify(body)
      };
    },
    notFound: (body: any) => {
      return {
        statusCode: 404,
        body: JSON.stringify(body)
      };
    },
    conflict: (body: any) => {
      return {
        statusCode: 409,
        body: JSON.stringify(body)
      };
    },
    internal: (body: any) => {
      return {
        statusCode: 500,
        body: JSON.stringify(body)
      };
    }
  }
}
