import { gql } from '@apollo/client';
import { getClient } from '@/server/apollo-client';

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    person(id: $id) {
      name
      birthYear
      species {
        name
      }
      homeworld {
        name
        climates
        gravity
        terrains
      }
      filmConnection {
        films {
          title
        }
      }
    }
  }
`;

export const getCharacterData = async (id: string) => {
  const client = getClient();

  try {
    const { data: characterData } = await client.query({
      query: GET_CHARACTER,
      variables: { id: decodeURIComponent(id) },
    });

    if (characterData?.person) {
      return characterData.person;
    } else {
      console.error('Character data is missing');
      return null;
    }
  } catch (error: any) {
    if (error.networkError) {
      throw new Error(
        'Network error: Unable to reach the server. Please check your internet connection and try again.',
      );
    } else if (error.graphQLErrors?.length > 0) {
      throw new Error(
        'Error fetching data: The requested character data could not be retrieved. Please try again later.',
      );
    } else {
      throw new Error(
        'Unexpected error: Something went wrong while fetching the character data. Please refresh the page or try again later.',
      );
    }
  }
};
