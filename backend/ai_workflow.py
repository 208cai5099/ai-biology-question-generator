import os
from dotenv import load_dotenv
from crewai import Process, Crew, Agent, Task
from pydantic import BaseModel
from typing import List, Union, Literal

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
model_name = os.getenv("MODEL")

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

class OutputFormat(BaseModel):
    reading: Reading
    data: Data
    question_list: List[Question]

class QuestionGenerator():
    def biology_writer_agent(self) -> Agent:
        return Agent(
            role="K-12 Biology Content Writer",
            goal="Design interesting and informative short texts about a biological topic for students.",
            backstory="You are a skilled biology writer for a publisher of K-12 educational books. "
            "You write brief articles about cool and exciting topics in biology, such as "
            "extinction events or advancements in biotechnology. You like to make the writings "
            "simple enough for even high school students to understand.",
            llm=model_name
            )
    
    def ngss_agent(self) -> Agent:
        return Agent(
            role="High School Biology Education Expert",
            goal="Create biology questions that are aligned to Next Generation Science Standards.",
            backstory="You are a veteran biology curriculum designer. You understand how the 3 dimensions "
            "Science and Engineering Practices, Disciplinary Core Ideas, and Crosscutting Concepts are the basis "
            "for the Next Generation Science Standards. You have a talent for designing and editing biology questions "
            "rooted in real-world context.",
            llm=model_name
        )

    def biology_expert_agent(self) -> Agent:
        return Agent(
            role="Biology and Computer Science Professor",
            goal="Verify the accuracy of biology content.",
            backstory="You are a well-respected professor who apply your deep knowledge to help high school teachers spot any mistakes in "
            "readings, images, or videos related to biology. You are very good at finding even the most subtle mistakes in "
            "conceptual understanding. You are also very good at formatting content in JSON syntax.",
            llm=model_name
            )

    def writing_task(self) -> Task:
        return Task(
            description="""
            Create a 2 paragraph (maximum of 150 words in total) reading about real-world example, observation, or 
            application about the following topic:

            Topic: {topic}.
                
            Make sure the writing is appropriate for a high school audience.""",
            expected_output="""
            A well-structured text with a descriptive title. DO NOT organize the writing as bullet points.""",
            agent=self.biology_writer_agent()
            )

    def question_task(self) -> Task:
        return Task(
            description= """
            Examine the reading from the previous task.

            Design {question_number} high school-level biology questions based on the reading. Include hypothetical data values to accompany the reading and design questions based on the data values.

            Include BOTH multiple-choice and open-ended questions.

            Make sure the questions align to the following standard(s): {standards}

            Make sure the questions are solvable using high school-level biology knolwedge.

            Make sure that the question style matches the following requirements.

            1. **Conceptual Understanding**: The questions focus on understanding key biological concepts, such as ecosystem dynamics, carbon cycling, and evolutionary processes. This aligns with NGSS's emphasis on deep learning and comprehension of core ideas rather than rote memorization.
            2. **Evidence-Based Reasoning**: Questions require students to use evidence from provided data (e.g., graphs, diagrams) to support their answers. This reflects the NGSS goal of integrating scientific practices with content knowledge, encouraging students to engage in scientific reasoning.
            3. **Interdisciplinary Connections**: The questions often connect biology to environmental science, chemistry (e.g., carbon cycling), and earth science (e.g., historical climate changes). NGSS promotes the integration of different disciplines to provide a holistic understanding of science.
            4. **Modeling and Analysis**: Some questions require students to use models (like graphical data or diagrams) to derive conclusions. This aligns with NGSS standards that emphasize the development and use of models as a practice for understanding and predicting phenomena.
            5. **Real-World Applications**: The scenarios often involve current issues (e.g., climate change, conservation of coral reefs), allowing students to see the relevance of scientific learning in real-world contexts. NGSS encourages students to understand the implications of science in everyday life and society.""",
            expected_output="""
            The sample answers for the open-ended questions should be 2-3 sentences.
            Follow this format:
            [Insert reading]
            [Insert data as rows and columns in a table, include a title]
            Question: [insert question]
            Answer: [Insert the answer]
            Blank line before next question""",
            agent=self.ngss_agent()
            )
    
    def fact_checking_task(self) -> Task:
        return Task(
            description="""
            Examine the questions and sample answers from the previous task. Check for any conceptual mistakes or 
            inaccuracies in the content. Correct them as needed. Format the content using JSON syntax.""",
            expected_output="""
            The content should be separated into reading, hypothetical data, and questions.
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
                "choice_a" : [insert choice a],
                "choice_b" : [insert choice b],
                "choice_c" : [insert choice c],
                "choice_d" : [insert choice d],
                "answer": [insert answer for question 2]
                },
                ...
            ]
            }""",
            agent=self.biology_expert_agent(),
            output_json=OutputFormat
        )
    
    def crew(self) -> Crew:
        return Crew(
            agents=[self.biology_writer_agent(), self.ngss_agent(), self.biology_expert_agent()],
            tasks=[self.writing_task(), self.question_task(), self.fact_checking_task()],
            process=Process.sequential,
            verbose=False
        )