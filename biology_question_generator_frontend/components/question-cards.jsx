'use client'

import jsonData from '/Users/zhuobiaocai/Desktop/ai-biology-question-generator/test_result.json' assert { type: 'json' };

export default function QuestionCards(props) {

    const questions = jsonData.question_list

    return (
        <div>
            {questions.map((question, idx) => {

                if (question.question_type === "multiple choice") {

                    const choices = [question.choice_a, question.choice_b, question.choice_c, question.choice_d]

                    return (
                        <div className="card card-border bg-slate-800 my-5 lg:w-200 md:w-200 sm:50 shadow-sm" key={idx}>
                            <div className="card-body">
                                <div className="mx-10">
                                    <h1 className="my-5 text-left text-lg">{`Question Number ${question.question_num}`}</h1>
                                    <p>{question.question}</p>
                                    <p></p>
                                    {choices.map((choice, idx) => {
                                        return (
                                            <div>
                                                <p key={idx}>{choice}</p>
                                                <p></p>
                                            </div>
                                        )
                                    })}
                                    <p>{`Answer: ${question.answer}`}</p>
                                </div>
                            </div>
                        </div> 
                    )
                } else {

                    return (
                        <div className="card card-border bg-slate-800 my-5 lg:w-200 md:w-200 sm:50 shadow-sm" key={idx}>
                            <div className="card-body">
                                <div className="mx-10">
                                    <h1 className="my-5 text-left text-lg">{`Question Number ${question.question_num}`}</h1>
                                    <p>{question.question}</p>
                                    <p></p>
                                    <p>{`Answer: ${question.answer}`}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}

        </div>

    )
}