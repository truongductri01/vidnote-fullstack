import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TEST_QUERY } from "../graphql/queries/test";
import { GET_USER_BY_ID } from "../graphql/queries/searchUsersById";
import { CHANGE_USER_SEARCHABLE } from "../graphql/mutations/userMutations";

function TestScreen() {
    // const { loading, error, data } = useQuery(
    //     GET_USER_BY_ID("wK211sm6pAQGGQe7DDtzJsM3uPg2")
    // );
    const [changeSearchable, { data, error, loading }] = useMutation(
        CHANGE_USER_SEARCHABLE("wK211sm6pAQGGQe7DDtzJsM3uPg2")
    );

    console.log(error);
    return (
        <div>
            TestScreen
            <button
                onClick={() =>
                    changeSearchable().then((result) => console.log(result))
                }
            >
                Change visibility
            </button>
        </div>
    );
}

export default TestScreen;
