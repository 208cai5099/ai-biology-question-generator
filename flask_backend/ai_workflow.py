import os
from dotenv import load_dotenv
from crewai import Process, Crew, Agent, Task, LLM
from crewai_tools import SerperDevTool
from pydantic import BaseModel
from typing import List, Union, Literal

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY")
gpt_4o = LLM(model="openai/gpt-4o")

class Reading(BaseModel):
    title: str
    content: str

class Data(BaseModel):
    title: str
    col_names: List[str]
    row_values: List[List[Union[str, int]]]
    
class Question(BaseModel):
    question_num: int
    question_type: Literal["multiple choice", "open ended"]
    question: str
    choice_a: Union[str, None]
    choice_b: Union[str, None]
    choice_c: Union[str, None]
    choice_d: Union[str, None]
    answer: str

class ExamFormat(BaseModel):
    reading: Reading
    data: Data
    question_list: List[Question]

class QuestionGenerator():

    def phenomenon_agent(self) -> Agent:
        return Agent(
            role="Award-Winning Biology Writer",
            goal="Write about real-world examples of biological phenomena",
            backstory="You are a highly knowledgeable biology writer with vast information about "
            "every field of biology, from botany to biophysics. You have a passion for making biology "
            "content easy to understand, so you regularly write blog posts about fascinating biology facts.",
            llm=gpt_4o,
            tools=[SerperDevTool()]
        )

    def exam_agent(self) -> Agent:
        return Agent(
            role="High School Biology Teacher",
            goal="Design exam questions aligned to New York State life science standards",
            backstory="You are a veteran teacher with expertise about high school biology education and "
            "standardized biology exams. You have a deep understanding of the Next Generation Science "
            "Standards. You are talented at writing exam questions that assess understanding of biological concepts.",
            llm=gpt_4o,
            tools=[SerperDevTool()]
            )


    def story_task(self) -> Task:
        return Task(
            description= """
            Your task is to write a 2-paragraph reading about a real-world biological phenomenon or event, such as coral reef 
            restoration, Devonian extinction, and invasive kudzu species. 
            
            If a biological phenomenon is provided below, write about it. No need to use any research.
            If the phenomenon is not provided, research online for real-world biological phenomena that are related to the topic of 
            {topic} from New York State's Life Science learning standards, which are very similar to the Next Generation Science Standards.

            The phenomenon is {phenomenon}. 

            Make sure the writing is suitable for high school-level biology.
            """,
            expected_output="""
            A text that has 2 distinct paragraphs about a real-life biological phenomenon or event.
            """,
            agent=self.phenomenon_agent()
            )
    
    def exam_task(self) -> Task:
        return Task(
            description="""
            Using the reading from the previous task, your task is to design exam questions. For this specific task, no need to do research online.

            Follow these specifications:
            1) Create hypothetical data values to design questions that have students make predictions or infer conclusions based on the data.
            2) The exam questions should require students to apply biological principles and create evidence-based responses.
            3) Create questions that assess understanding of interconnections and feedback mechanisms within systems (i.e. ocean acidity and marine life, mutated protein and homeostasis disruption).
            4) There should be {mc_number} multiple-choice question(s) and {open_number} open-ended question(s).

            """,
            expected_output="""
            The exam content should be separated into reading, hypothetical data, and questions.
            DO NOT start the output with ```json!!! DO NOT start with ```json.
            
            Follow this format for the output. Notice where you need to insert the necessary information.
            {
            "reading": {
                "title": [insert reading title],
                "content": [insert reading about {phenomenon}]
            },
            "data": {
                "title" : [insert table title],
                "col_names": [insert the columns names from left to right as an array],
                "row_values": [[row 1 values], [row 2 values], [row 3 values]...]]
            },
            "question_list": [
                {
                "question_num" : 1,
                "question_type": open ended,
                "question": [insert question 1],
                "choice_a" : null,
                "choice_b" : null,
                "choice_c" : null,
                "choice_d" : null,
                "answer": [insert answer for question 1]
                },
                {
                "question_num" : 2,
                "question_type": multiple choice,
                "question": [insert question 2],
                "choice_a" : A) [insert choice a],
                "choice_b" : B) [insert choice b],
                "choice_c" : C) [insert choice c],
                "choice_d" : D) [insert choice d],
                "answer": [insert answer for question 2]
                },
                ...
            ]
            }""",
            agent=self.exam_agent(),
            output_json=ExamFormat
        )
    
    def revision_task(self) -> Task:
        return Task(
            description="""
            Revise the questions and answers from the previous task.
            
            Follow these specifications:
            1) The questions should be aligned with the New York State Life Science learning standards, which are very similar to the 
            Next Generation Science Standards (NGSS). Feel free to research online for information about the state's life science standards
            about {topic}.
            2) The questions require students to analyze the reading and hypothetical data and make connections to biological concepts.
            3) The questions require students to make predictions or infer conclusions based on the data.
            4) The exam questions should require students to apply biological principles and create evidence-based responses.
            5) Create questions that assess understanding of interconnections and feedback mechanisms within systems (i.e. ocean acidity and marine life, mutated protein and disease progression).
            6) There should be {mc_number} multiple-choice question(s) and {open_number} open-ended question(s).
            7) The questions should require students to perform the following task(s):

            Task(s): {performance_level_descriptions}
            """,
            expected_output="""
            The revised exam content should follow the same JSON format as the previous task.
            """,
            agent=self.exam_agent(),
            output_json=ExamFormat
        )

    def crew(self) -> Crew:
        return Crew(
            agents=[self.phenomenon_agent(), self.exam_agent()],
            tasks=[self.story_task(), self.exam_task(), self.revision_task()],
            process=Process.sequential,
            verbose=False
        )