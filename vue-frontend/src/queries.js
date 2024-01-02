import gql from 'graphql-tag';


export const getAllNotes = gql`
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
`

export const noteById = gql`
    query noteById($id: Int!) {
        noteById(id: $id) {
            id
            title
            content
        }
    }
`