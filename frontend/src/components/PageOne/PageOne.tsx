import { gql, useQuery } from "@apollo/client";
import { PlayerResponse } from "../../types/graphql";

export function PageOne() {
  const { data, loading } = useQuery<PlayerResponse>(gql`
    query {
      getPlayers {
        players {
          name
          age
          position
          team
          foot
          rating
        }
      }
    }
  `);

  if (loading) {
    return <>"Loading..."</>;
  }

  if (data) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }

  return null;
}
