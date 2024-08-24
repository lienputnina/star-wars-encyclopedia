'use client';

import { gql, useQuery } from '@apollo/client';

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

export function ExampleComponent() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
}
