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
    AccessTokenResponseSchema: {
        type: string;
        properties: {
            status: {
                type: string;
                example: string;
            };
            data: {
                type: string;
                properties: {
                    token: {
                        type: string;
                        example: string;
                    };
                };
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
    AdsStatsResponseSchema: {
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
            stats: {
                type: string;
                properties: {
                    totalInteractions: {
                        type: string;
                        example: number;
                    };
                    mostCommonExpression: {
                        type: string;
                        example: string;
                    };
                    interactionsByAd: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                id: {
                                    type: string;
                                    example: number;
                                };
                                title: {
                                    type: string;
                                    example: string;
                                };
                                count: {
                                    type: string;
                                    example: number;
                                };
                            };
                        };
                    };
                    genderDistribution: {
                        type: string;
                        items: {
                            type: string;
                            properties: {
                                name: {
                                    type: string;
                                    example: string;
                                };
                                total: {
                                    type: string;
                                    example: number;
                                };
                            };
                        };
                    };
                    totalAds: {
                        type: string;
                        example: number;
                    };
                };
            };
        };
    };
    FileUploadRequestSchema: {
        type: string;
        required: string[];
        properties: {
            files: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        fileName: {
                            type: string;
                        };
                        url: {
                            type: string;
                        };
                        width: {
                            type: string;
                        };
                        height: {
                            type: string;
                        };
                        size: {
                            type: string;
                        };
                        resourceType: {
                            type: string;
                        };
                    };
                };
            };
        };
    };
    FileDeleteRequestSchema: {
        type: string;
        required: string[];
        properties: {
            userId: {
                type: string;
            };
            fileId: {
                type: string;
            };
        };
    };
    AdCreationRequestSchema: {
        type: string;
        required: string[];
        properties: {
            title: {
                type: string;
            };
            userId: {
                type: string;
            };
        };
    };
    AdPartialUpdateRequestSchema: {
        type: string;
        properties: {
            title: {
                type: string;
            };
            description: {
                type: string;
            };
        };
    };
    AdFaceExpressionsUpdateRequestSchema: {
        type: string;
        required: string[];
        properties: {
            facialExpressions: {
                type: string;
                items: {
                    type: string;
                };
            };
        };
    };
    AdGenderUpdateRequestSchema: {
        type: string;
        required: string[];
        properties: {
            genderId: {
                type: string;
            };
        };
    };
};
