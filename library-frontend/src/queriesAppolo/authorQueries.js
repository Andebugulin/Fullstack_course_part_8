import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query AllAuthors {
        allAuthors {
        born
        bookCount
        name
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
        }
    }
`
