import datetime
from sql_db_setup import *

deletion_count = delete_messages(datetime.now())
with open("deletion_count_log.txt", "a") as file:
    file.write(f"Time: {datetime.now()}\n")
    file.write(f"Deleted {deletion_count} messages\n\n")