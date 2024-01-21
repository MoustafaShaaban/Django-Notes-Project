# Django-Notes-Project

A notes project built using 
    [Django Web Framework](https://www.djangoproject.com/), 
    [Django REST Framework](https://www.django-rest-framework.org), 
    [Graphene Django](https://docs.graphene-python.org/projects/django/en/latest/), 
    [Cookiecutter Django](https://github.com/cookiecutter/cookiecutter-django),
    [Vue.js 3](https://vuejs.org/),
    [Quasar Framework](https://quasar.dev/),
    [Tanstack Vue Query](https://tanstack.com/query/latest/docs/vue/overview),
    [Vue Apollo](https://apollo.vuejs.org/)

###  Project Goals

* Users can register for an account and sign in (handled by cookiecutter Django).

* Authenticated users can:

    * Perform Create, Read, Update and Delete (CRUD) operations on notes and list all their added notes on the website.
    
    * Protect the notes so that only its owner can update or delete it (in the website and GraphQL endpoint).

    * Throw a 403 forbidden page to any user who try to guess the URL to change something they are not authorized to do.

    * Access a GraphQL endpoint and Run several Quries and Mutations including (CRUD) Mutations.

    * Access a REST API endpoint and perform CRUD operations.


* Users can access separate frontend project built using Vue.js 3 and Quasar Framework which connects with django through Django Rest Framework using Session Authentication.

* The frontend vue.js app also allows users to perform CRUD operations through connecting to a REST API and a GraphQL endpoints.
 


### To get started with this project

* Make sure that Docker and docker-compose are installed in your system.

* Clone the repository: git clone https://github.com/MoustafaShaaban/Django-Notes-Project.git

* Change directory to backend directory ``` cd backend ```

* Build the docker image to develop the project locally using docker-compose:

``` docker-compose -f local.yml build ```

* Create the database by running the following commands:

` docker-compose -f local.yml run --rm django python manage.py makemigrations `

` docker-compose -f local.yml run --rm django python manage.py migrate `

* Create a super user:

` docker-compose -f local.yml run --rm django python manage.py createsuperuser `

* Now run the project:

``` docker-compose -f local.yml up ```

* Open the web browser and go to ` http://localhost:8000/ ` to see the results.

* Start a new terminal and change directory to vue-frontend directory and install the requirements:

```bash

cd vue-frontend

npm install

```

* Run the Vue.js 3 frontend project:

```bash

    npm run dev

```


# References:

* [Django Session-based Auth for Single Page Apps](https://testdriven.io/blog/django-spa-auth/)

* [Use React and Spring Boot to Build a Simple CRUD App](https://developer.okta.com/blog/2022/06/17/simple-crud-react-and-spring-boot)


### GraphQL Queries and Mutations with Variables Examples:

* Get all Notes:

```gql

    query getNotes {
        allNotes {
            id
            title
            content
            createdOn
            user {
                username
            }
        }
    }

```

* Query note instance by its Id:

```gql

    query noteById($id: Int!) {
        noteById(id: $id) {
            id
            title
            content
        }
    }

```

* Create note mutation:

```gql

    mutation createNote($title:String, $content: String) {
            createNote(input: {
            title: $title,
            content: $content
        }) {
            success
            note {
                id
                title
                content
                createdOn
                user {
                    username
                }
            }
        }
    }

```

* Update note mutation:

```gql

    mutation updateNote($id: Int!,$title:String!, $content: String!) {
        updateNote(id: $id, input: {
            title: $title,
            content: $content
        }) {
            success
            note {
                id
                title
                content
                createdOn
                user {
                    username
                }
            }
        }
    }

```

* Delete note mutation:

```gql

    mutation deleteNote($id: Int!) {
        deleteNote(id: $id) {
            success
        }
    }

```
