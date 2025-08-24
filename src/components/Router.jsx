import React from 'react';
import { useApp } from '../context/AppContext';
import FieldsPage from '../pages/FieldsPage';
import FieldPage from '../pages/FieldPage';
import SectionPage from '../pages/SectionPage';
import ResourcePage from '../pages/ResourcePage';
import RewardsPage from '../pages/RewardsPage';

const Router = () => {
  const { state } = useApp();
  const { currentPage } = state;

  const renderPage = () => {
    switch (currentPage) {
      case 'fields':
        return <FieldsPage />;
      case 'field':
        return <FieldPage />;
      case 'section':
        return <SectionPage />;
      case 'resource':
        return <ResourcePage />;
      case 'rewards':
        return <RewardsPage />;
      default:
        return <FieldsPage />;
    }
  };

  return <>{renderPage()}</>;
};

export default Router;