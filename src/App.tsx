import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/Home/HomePage';
import { PropertiesPage } from './pages/Properties/PropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetails/PropertyDetailsPage';
import { LocationsPage } from './pages/Locations/LocationsPage';
import { CommunityDetailsPage } from './pages/Communities/CommunityDetailsPage';
import { DevelopersPage } from './pages/Developers/DevelopersPage';
import { InsightsPage } from './pages/Insights/InsightsPage';
import { InsightDetailsPage } from './pages/Insights/InsightDetailsPage';
import { MortgagePage } from './pages/Mortgage/MortgagePage';
import { AboutPage } from './pages/About/AboutPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { ConsultationPage } from './pages/Consultation/ConsultationPage';
import { FavoritesPage } from './pages/Account/FavoritesPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="properties" element={<PropertiesPage />} />
              <Route path="properties/buy" element={<PropertiesPage />} />
              <Route path="properties/rent" element={<PropertiesPage />} />
              <Route path="properties/off-plan" element={<PropertiesPage />} />
              <Route path="properties/new-launches" element={<PropertiesPage />} />
              <Route path="property/:slug" element={<PropertyDetailsPage />} />
              <Route path="locations" element={<LocationsPage />} />
              <Route path="locations/:slug" element={<CommunityDetailsPage />} />
              <Route path="communities" element={<LocationsPage />} />
              <Route path="communities/:slug" element={<CommunityDetailsPage />} />
              <Route path="developers" element={<DevelopersPage />} />
              <Route path="developers/:slug" element={<DevelopersPage />} />
              <Route path="mortgage-calculator" element={<MortgagePage />} />
              <Route path="insights" element={<InsightsPage />} />
              <Route path="insights/:slug" element={<InsightDetailsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="consultation" element={<ConsultationPage />} />
              <Route path="account/favorites" element={<FavoritesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App;
