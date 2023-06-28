import { gql } from "@apollo/client";

export const CHANGE_USER_SEARCHABLE = (id: string) => gql`
    mutation {
        changeSearchable(id: "${id}") {
            message
            error
            success
        }
    }
`;
