from BE.Database.database import init
import os
from dotenv import load_dotenv

load_dotenv()

dbpath = os.getenv('dbpath')


if os.path.exists(dbpath):
    os.remove(dbpath)

init()