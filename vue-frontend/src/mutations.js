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

export const deleteNoteMutation = gql`
    mutation deleteNote($id: Int!) {
        deleteNote(id: $id) {
            success
    }
}
`