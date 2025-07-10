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