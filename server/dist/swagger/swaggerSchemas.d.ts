declare const schemas: {
    UserCreationSchema: {
        type: string;
        required: string[];
        properties: {
            userType: {
                type: string;
                enum: string[];
                example: string;
            };
            email: {
                type: string;
                example: string;
            };
            commerceName: {
                type: string;
                example: string;
            };
            password: {
                type: string;
                example: string;
            };
            confirmPassword: {
                type: string;
                example: string;
            };
        };
    };
    UserResponseSchema: {
        type: string;
        properties: {
            status: {
                type: string;
                example: string;
            };
            message: {
                type: string;
                example: string;
            };
        };
    };
    UserLoginSchema: {
        type: string;
        required: string[];
        properties: {
            email: {
                type: string;
                example: string;
            };
            password: {
                type: string;
                example: string;
            };
        };
    };
    UserLoginResponseSchema: {
        type: string;
        properties: {
            status: {
                type: string;
                example: string;
            };
            accessToken: {
                type: string;
                example: string;
            };
            refreshToken: {
                type: string;
                example: string;
            };
        };
    };
    UserProfileResponseSchema: {
        type: string;
        properties: {
            status: {
                type: string;
                example: string;
            };
            data: {
                type: string;
                properties: {
                    id: {
                        type: string;
                        example: number;
                    };
                    commerceName: {
                        type: string;
                        example: string;
                    };
                    userType: {
                        type: string;
                        example: string;
                    };
                    email: {
                        type: string;
                        example: string;
                    };
                    createdAt: {
                        type: string;
                        example: string;
                    };
                    updatedAt: {
                        type: string;
                        example: string;
                    };
                };
            };
        };
    };
    CategoryCreationSchema: {
        type: string;
        required: string[];
        properties: {
            name: {
                type: string;
                example: string;
            };
            description: {
                type: string;
                example: string;
            };
        };
    };
    CategoryResponseSchema: {
        type: string;
        properties: {
            status: {
                type: string;
                example: string;
            };
            message: {
                type: string;
                example: string;
            };
        };
    };
    AuthErrorResponseSchema: {
        type: string;
        properties: {
            status: {
                type: string;
                example: string;
            };
            message: {
                type: string;
                example: string;
            };
        };
    };
};
