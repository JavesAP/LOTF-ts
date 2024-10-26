import { ComponentProps } from "react";

export type UserInformation = {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
}

export type InputProps = ComponentProps<"input">

export type PhoneInput = [string, string, string, string]