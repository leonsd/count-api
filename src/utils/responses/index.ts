import { HttpStatus } from "../../enums/httpStatus";

const headers = {
  "content-type": "application/json"
}

export const response = {
  success: {
    ok: (body: any) => {
      return {
        statusCode: HttpStatus.OK,
        headers,
        body: JSON.stringify(body)
      };
    },
    created: (body: any) => {
      return {
        statusCode: HttpStatus.CREATED,
        headers,
        body: JSON.stringify(body)
      };
    },
  },
  error: {
    badRequest: (body: any) => {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        headers,
        body: JSON.stringify(body)
      };
    },
    forbidden: (body: any) => {
      return {
        statusCode: HttpStatus.FORBIDDEN,
        headers,
        body: JSON.stringify(body)
      };
    },
    notFound: (body: any) => {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        headers,
        body: JSON.stringify(body)
      };
    },
    conflict: (body: any) => {
      return {
        statusCode: HttpStatus.CONFLICT,
        headers,
        body: JSON.stringify(body)
      };
    },
    internal: (body: any) => {
      return {
        statusCode: HttpStatus.INTERNAL,
        headers,
        body: JSON.stringify(body)
      };
    }
  }
}
