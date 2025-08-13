import type { TInputLoginName, TInputRegisterName } from "../types";

export interface IRegisterInput {
    name: TInputRegisterName;
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;
    },
}


export interface ILoginInput {
    name: TInputLoginName;
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

export default interface ITodo {
    id: number;
    title: string;
    description: string;
}