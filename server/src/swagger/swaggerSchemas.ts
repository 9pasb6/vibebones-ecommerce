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
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkNPTU1FUkNFIiwidXNlcm5hbWUiOiJDb21tZXJjZSBOYW1lIiwiaWF0IjoxNzE3NDU5NDg2LCJleHAiOjE3MTc1NDU4ODZ9.UHzckLZT0Tmg_cNXvRI_NOqp-T6Fcx2OmwKOdx4DU08",
      },
      refreshToken: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkNPTU1FUkNFIiwidXNlcm5hbWUiOiJDb21tZXJjZSBOYW1lIiwiaWF0IjoxNzE3NDU5NDg2LCJleHAiOjE3MTgwNjQyODZ9.RblDbMRUHjZY2t_OT6OrpRgh2I1sm4Yni_aaIiB9fUE",
      },
    },
  },
  
  AccessTokenResponseSchema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "success",
      },
      data: {
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "new.jwt.token.here",
          },
        },
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
  AdsStatsResponseSchema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        example: "success",
      },
      message: {
        type: "string",
        example: "Estadísticas recuperadas con éxito",
      },
      stats: {
        type: "object",
        properties: {
          totalInteractions: {
            type: "integer",
            example: 100,
          },
          mostCommonExpression: {
            type: "string",
            example: "Happy",
          },
          interactionsByAd: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                  example: 1,
                },
                title: {
                  type: "string",
                  example: "Ad Title",
                },
                count: {
                  type: "integer",
                  example: 20,
                },
              },
            },
          },
          genderDistribution: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Male",
                },
                total: {
                  type: "number",
                  example: 60.5,
                },
              },
            },
          },
          totalAds: {
            type: "integer",
            example: 5,
          },
        },
      },
    },
  },
    FileUploadRequestSchema: {
      type: "object",
      required: ["files"],
      properties: {
        files: {
          type: "array",
          items: {
            type: "object",
            properties: {
              fileName: { type: "string" },
              url: { type: "string" },
              width: { type: "integer" },
              height: { type: "integer" },
              size: { type: "integer" },
              resourceType: { type: "string" },
            },
          },
        },
      },
    },
    FileDeleteRequestSchema: {
      type: "object",
      required: ["userId", "fileId"],
      properties: {
        userId: { type: "integer" },
        fileId: { type: "integer" },
      },
    },
    AdCreationRequestSchema: {
      type: "object",
      required: ["title", "userId"],
      properties: {
        title: { type: "string" },
        userId: { type: "integer" },
      },
    },
    AdPartialUpdateRequestSchema: {
      type: "object",
      properties: {
        
        title: { type: "string" },
        description: { type: "string" },
      },
    },
    AdFaceExpressionsUpdateRequestSchema: {
      type: "object",
      required: ["facialExpressions"],
      properties: {
        facialExpressions: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    AdGenderUpdateRequestSchema: {
      type: "object",
      required: ["genderId"],
      properties: {
        genderId: { type: "string" }
      }
    },
  
  
  
  
  
};

module.exports = schemas;
