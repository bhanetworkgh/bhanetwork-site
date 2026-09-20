import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../styles/base.css';
import { VFarm } from './VFarm';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VFarm />
  </StrictMode>,
);
