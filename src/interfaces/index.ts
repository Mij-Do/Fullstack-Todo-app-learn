import type { TInputName } from "../types";

export interface IRegisterInput {
    name: TInputName;
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;
    },
}


export interface ILoginInput {
    name: string;
    placeholder: string;
    type: string;
    validation: {
        required: boolean;
        minLength?: number;
        pattern?: RegExp;
    },
}

export interface IErrorResponse {
    error: {
        details?: {
            errors: {
                message: string;
            }[];
        };
        message?: string;
    };
}