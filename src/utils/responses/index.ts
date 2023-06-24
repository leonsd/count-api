const headers = {
  "content-type": "application/json"
}

export const response = {
  success: {
    ok: (body: any) => {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(body)
      };
    },
    created: (body: any) => {
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(body)
      };
    },
  },
  error: {
    badRequest: (body: any) => {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify(body)
      };
    },
    notFound: (body: any) => {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify(body)
      };
    },
    conflict: (body: any) => {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify(body)
      };
    },
    internal: (body: any) => {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify(body)
      };
    }
  }
}
