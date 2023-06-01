# Django-Notes-Project

A project built with Django web framework (Cookiecutter Django) and Graphene Django.

###  Project Goals

* Users can register for an account and sign in (handled by cookiecutter Django).

* Authenticated users can:

    * Perform Create, Read, Update and Delete (CRUD) operations on notes and list all their added notes on the website.
    
    * Protect the notes so that only its owner can update or delete it (in the website and GraphQL endpoint).

    * Throw a 403 forbidden page to any user who try to guess the URL to change something they are not authorized to do.

    * Access a GraphQL endpoint and Run several Quries and Mutations including (CRUD) Mutations.

    * Access a REST API endpoint and perform CRUD operations.
 


### To get started with this project

* Make sure that Docker and docker-compose are installed in your system.

* Clone the repository: git clone https://github.com/MoustafaShaaban/Django-Notes-Project.git

* Change directory to backend directory ``` cd backend ```

* Build the docker image to develop the project locally using docker-compose:

``` docker-compose -f local.yml build ```

* Create the database by running the following commands:

` docker-compose -f local.yml run --rm django python manage.py migrate `

* Create a super user:

` docker-compose -f local.yml run --rm django python manage.py createsuperuser `

* Now run the project:

``` docker-compose -f local.yml up ```

* Open the web browser and go to ` http://localhost:8000/ ` to see the results.
