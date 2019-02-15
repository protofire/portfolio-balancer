import React, { useRef, useCallback, useState } from 'react';
import styled from 'styled-components';

import Card from '../components/Card';
import AddPortfolioForm from '../components/AddPortfolioForm';

import * as images from '../images';

interface Props {
  onCreatePorfolio: () => void;
}

const AddPortfolio = ({ onCreatePorfolio }: Props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [portfolio, setPortfolio] = useState(['GNO', 'DAI']);

  const root = useRef(null);

  const handleCardClick = useCallback(
    (event: MouseEvent) => {
      if (event && root && root.current) {
        if (event.target === root.current || root.current.contains(event.target)) {
          if (!isFormOpen) {
            setIsFormOpen(true);
          }
        }
      }
    },
    [isFormOpen],
  );

  const handleFormClose = useCallback(
    () => {
      setIsFormOpen(false);
    },
    [isFormOpen],
  );

  const handleCreatePortfolio = useCallback(
    () => {
      if (onCreatePorfolio) {
        onCreatePorfolio();
      }
      setIsFormOpen(false);
    },
    [onCreatePorfolio],
  );

  return (
    <>
      <AddPortfolioCard ref={root} onClick={handleCardClick}>
        <img src={images.add_button} />
        <span>Add Portfolio</span>
      </AddPortfolioCard>
      <AddPortfolioForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        tokens={portfolio}
        onCreatePorfolio={handleCreatePortfolio}
      />
    </>
  );
};

const AddPortfolioCard = styled(Card)`
  width: 260px;
  height: 422px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    margin-top: var(--spacing-narrow);
    font-size: 15px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: center;
    color: #000000;
  }
`;

export default AddPortfolio;
