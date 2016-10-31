# Setting up Tsumego skeleton

* Install Git
* Clone the repository
* Install Python 2.7
* Install pip
* `pip install -r requirements.txt`
* `python manage.py migrate`
* Install Node.js
* `cd frontend`
* `npm install`
* `npm install webpack -g`
* `npm start`

### Updating

`git pull && pip install -r requirements.txt && cd frontend && npm install && cd ..`

### Running the Server

Both the Python and JavaScript server must be running for the
application to work. In separate console windows, run `python
./manage.py runserver` in the root directory and `npm start` in the
frontend directory. The app will then be live at `http://localhost:8000`.

## SuperUser

Username: `cs506`

Password: `cs506cs506`
