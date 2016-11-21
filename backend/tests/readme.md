# Running Tests and Viewing Code Coverage: (I used linux terminal so syntax may differ slightly)

## How to run testModels.py (or any test*.py file in the tests folder)
* (from tsumego/backend/tests directory): `../../manage.py test`

## How to view code coverage:
* Install Coverage (from tsumego directory): `sudo pip install coverage==3.6`
* Run tests with coverage: `coverage run manage.py test backend/tests -v 2`
* Create viewable coverage report (will create htmlcov dir) -> tsumego/htmlcov/index.html `coverage html`
	
