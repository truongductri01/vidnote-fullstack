import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
    query GetUserById($id: String) {
        getUserById(id: $id) {
            user {
                firstName
                lastName
                avatarUrl
                notesId
                username
            }
        }
    }
`;
