import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import './styles.css';

const root = document.getElementById('root');
const app = <BrowserRouter><App /></BrowserRouter>;
// The build ships each page as ready-made HTML (good for Google and link previews); React then takes it over.
// If a host serves a different page's HTML, render from scratch instead of hydrating.
const here = window.location.pathname.replace(/\/$/, '') || '/';
if (root.hasChildNodes() && root.dataset.path === here) hydrateRoot(root, app);
else createRoot(root).render(app);
