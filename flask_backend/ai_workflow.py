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
            "standrds. You are talented at writing exam questions that assess understanding of biological concepts.",
            llm=gpt_4o,
            )


    def story_task(self) -> Task:
        return Task(
            description= """
            Your task is to write a 2-paragraph reading about a real-world biological phenomenon or event, such as coral reef 
            restoration, Devonian extinction, and invasive kudzu species. 
            
            If a biological phenomenon is provided below, write about it.
            The phenomenon is {phenomenon}. If the phenomenon is not provided, research online for real-world examples to write about.
            """,
            expected_output="""
            A text that has 2 distinct paragraphs about a real-life biological phenomenon or event.
            """,
            agent=self.phenomenon_agent()
            )
    
    def exam_task(self) -> Task:
        return Task(
            description="""
            Using the reading from the previous task, your task is to design exam questions about the reading.
            Create hypothetical data values to help with question design.

            Follow these specifications:
            1) The questions should be higher-order questions at the levels of Apply, Analyze, Evaluate, and Create from Bloom's taxonomy.
            2) The answers should NOT be found directly in the reading or data values! Students must critically think to arrive at the answers.
            3) The exam questions should be fitting for high school biology.
            4) The questions should follow the biological theme of {core_idea}.
            5) The questions should follow AT LEAST ONE of the following learning outcomes.
            Learning outcomes: {performance_level_descriptions}

            There should be {mc_number} multiple-choice question(s) and {open_number} open-ended question(s).
            """,
            expected_output="""
            The exam content should be separated into reading, hypothetical data, and questions.
            DO NOT start the output with ```json!!! DO NOT start with ```json.
            
            Follow this format for the output. Notice where you need to insert the necessary information.
            {
            "reading": {
                "title": [insert reading title],
                "content": [insert reading]
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
    
    def crew(self) -> Crew:
        return Crew(
            agents=[self.phenomenon_agent(), self.exam_agent()],
            tasks=[self.story_task(), self.exam_task()],
            process=Process.sequential,
            verbose=True
        )