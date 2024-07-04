// TODO: implement swagger schemas for all the endpoints
const schemas = {
  UserCreationSchema: {
    type: "object",
    required: [
      "userType",
      "email",
      "commerceName",
      "password",
      "confirmPassword",
    ],
    properties: {
      userType: {
        type: "string",
        enum: ["COMMERCE"],
        example: "COMMERCE",
      },
      email: {
        type: "string",
        example: "email@mail.com",
      },
      commerceName: {
        type: "string",
        example: "Commerce Name",
      },
      password: {
        type: "string",
        example: "password",
      },
      confirmPassword: {
        type: "string",
        example: "password",
      },
    },
  },
  UserResponseSchema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "success",
      },
      message: {
        type: "string",
        example: "Usuario creado con éxito",
      },
    },
  },
  UserLoginSchema: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        example: "email@mail.com",
      },
      password: {
        type: "string",
        example: "password",
      },
    },
  },
  UserLoginResponseSchema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "success",
      },
      accessToken: {
        type: "string",
        example: "new.jwt.token.here",
      },
      refreshToken: {
        type: "string",
        example: "new.refresh.token.here",
      },
    },
  },
  UserProfileResponseSchema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "success",
      },
      data: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          commerceName: {
            type: "string",
            example: "Commerce Name",
          },
          userType: {
            type: "string",
            example: "COMMERCE",
          },
          email: {
            type: "string",
            example: "email@mail.com",
          },
          createdAt: {
            type: "string",
            example: "00/00/0000 00:00:00",
          },
          updatedAt: {
            type: "string",
            example: "00/00/0000 00:00:00",
          },
        },
      },
    },
  },
  CategoryCreationSchema: {
    type: "object",
    required: [
      "name",
      "description"
    ],
    properties: {
      name: {
        type: "string",
        example: "Category Name"
      },
      description: {
        type: "string",
        example: "Category Description"
      }
    }
  },
  CategoryResponseSchema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "success"
      },
      message: {
        type: "string",
        example: "Category created successfully"
      }
    }
  },
  AuthErrorResponseSchema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "error"
      },
      message: {
        type: "string",
        example: "Authentication failed"
      }
    }
  }
};

module.exports = schemas;
