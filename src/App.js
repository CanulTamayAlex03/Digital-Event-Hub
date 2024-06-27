// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultHome from './screens/default_home';
import Plans from './screens/plans';
import Terms from './screens/terms';
import KnowUs from './screens/knowUs';
import LoginType from './screens/login_type';
import RegisterType from './screens/register_type'; 
import ClientLogin from './screens/client_pages/client_login';
import ClientRegister from './screens/client_pages/client_register';
import OrganizerLogin from './screens/organizer_pages/organizer_login';
import OrganizerRegister from './screens/organizer_pages/organizer_register';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" exact element={<DefaultHome />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/knowUs" element={<KnowUs />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/loginType" element={<LoginType />} />
      <Route path="/registerType" element={<RegisterType />} />

      <Route path="/loginClient" element={<ClientLogin />} />
      <Route path="/loginOrganizer" element={<OrganizerLogin />} />
      <Route path="/registerClient" element={<ClientRegister />} />
      <Route path="/registerOrganizer" element={<OrganizerRegister />} />
    </Routes>
  </Router>
);

export default App;