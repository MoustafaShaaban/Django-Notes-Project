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