import json
import os
import re

output_list = []

current_dir = os.path.dirname(os.path.abspath(__file__))
target_dir = os.path.join(current_dir, "exams")

transcript_filenames_list = [fp for fp in os.listdir(target_dir) if "transcript" in fp]

for transcript_filename in transcript_filenames_list:

    input_filepath = os.path.join(current_dir, "exams", transcript_filename)

    with open(input_filepath, "r", encoding="utf-8", errors="ignore") as file:

        exam_transcript = file.read().lstrip("\ufeff")

        clusters_list = [cluster.strip() for cluster in re.split(r"Cluster Number:\s*\d{1,2}", exam_transcript) if len(cluster.strip()) > 0]

        for i in range(len(clusters_list)):
            cluster = clusters_list[i]
            title_pattern = r"Title:(.*?)Content:"
            title = re.findall(title_pattern, cluster, re.DOTALL)

            content_pattern = r"Content:(.*)"
            content = re.findall(content_pattern, cluster, re.DOTALL)

            if len(title) == len(content) == 1:

                output_list.append({
                    "id" : f"cluster_{len(output_list) + 1}",
                    "source" : transcript_filename.replace(".txt", ""),
                    "title" : title[0].strip(),
                    "content" : content[0].strip(),
                })
            else:
                print(f"Parsing Error: {input_filepath}, Cluster Number: {i+1}")

output_filepath = os.path.join(current_dir, "exam_clusters.json")

with open(output_filepath, "w") as file:
    json.dump(output_list, file, indent=4)