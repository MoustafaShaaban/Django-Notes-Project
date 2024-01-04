import gql from 'graphql-tag';

export const addNoteMutation = gql`
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
`

export const updateNoteMutation = gql`
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
`

export const deleteNoteMutation = gql`
    mutation deleteNote($id: Int!) {
        deleteNote(id: $id) {
            success
        }
    }
`