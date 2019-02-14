import styled from 'styled-components';

import Card from './Card';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-width), 1fr));
  grid-gap: var(--spacing-normal);

  ${Card} {
    display: flex;
    flex-direction: column;
    height: 100%;

    & > *:last-child {
      flex: 1;
    }
  }
`;

export default ListContainer;
