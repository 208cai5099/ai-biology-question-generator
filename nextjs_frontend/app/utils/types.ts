export type UserInputs = {
    topic: string,
    pld: string,
    phenomenon: string,
    mc_number: number,
    open_number: number
}

export type Reading = {
    title: string,
    content: string
}

export type Data = {
    title: string,
    col_names: (string | number)[],
    row_values: (string | number)[][]
}

export type Question = {
    question_num: number,
    question_type: string,
    question: string,
    choice_a: string | number | null,
    choice_b: string | number | null,
    choice_c: string | number | null,
    choice_d: string | number | null,
    answer: string | number
}

export interface GeneratedContent {
    reading: Reading | undefined,
    data: Data | undefined
    question_list: Question[] | undefined
}

export type AccountInfo = {
    usernameFirst: string,
    usernameSecond: string,
    password: string
}

export interface LoginResponse {
    msg: string,
    access_token?: string,
    refresh_token?: string,
    status: string
}

export interface NewAccessToken {
    msg : string,
    access_token?: string, 
    status : string
}

export type HumanResponse = {
    sessionID: string,
    message: string
}

export interface ChatbotResponse {
    sessionID?: string,
    msg: string,
    status: string
}

export interface SignUpResponse {
    msg: string,
    status: string
}