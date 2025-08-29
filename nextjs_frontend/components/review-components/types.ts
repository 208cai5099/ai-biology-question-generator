export type Reading = {
    title: string | undefined,
    content: string | undefined
}

export type Data = {
    title: string | undefined,
    col_names: (string | number)[] | undefined,
    row_values: (string | number)[][] | undefined
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
    reading: Reading,
    data: Data
    question_list: Question[]
}

export type ReviewContext = {
    reading: Reading | undefined,
    data: Data | undefined,
    question_list: Question[] | undefined,
    setReading: React.Dispatch<React.SetStateAction<Reading | undefined>>,
    setData: React.Dispatch<React.SetStateAction<Data | undefined>>,
    setQuestions: React.Dispatch<React.SetStateAction<Question[] | undefined>>
}

export type RowType = {
    row: (string | number)[] | undefined, 
    rowIndex?: number
}

export type CellType = {
    cellValue: string | number, 
    cellIndex: number, 
    rowIndex?: number
}

export type EditQuestionInputType = {
    question: Question, 
    idx: number
}