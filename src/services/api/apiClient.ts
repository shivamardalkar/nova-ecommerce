export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export interface ApiError {
    message: string;
    status?: number;
}

export const createApiResponse = <T>(
    data: T,
    message?: string,
): ApiResponse<T> => {
    return {
        data,
        success: true,
        message,
    };
};

export const createApiError = (message: string, status?: number): ApiError => {
    return {
        message,
        status,
    };
};