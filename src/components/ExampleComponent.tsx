import { gql } from '@apollo/client';
import { client } from '../lib/apollo-client';

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export const ExampleComponent = async () => {
  const { data } = await client.query({
    query: GET_LOCATIONS,
  });

  return (
    <div>
      {data.locations.map((location: any) => (
        <div key={location.id}>
          <h3>{location.name}</h3>
          <p>{location.description}</p>
          <img src={location.photo} alt={location.name} />
        </div>
      ))}
    </div>
  );
};
