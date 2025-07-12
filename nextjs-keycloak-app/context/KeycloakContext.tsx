import { createContext, useContext } from 'react';
import Keycloak from 'keycloak-js';

export const KeycloakContext = createContext<Keycloak | null>(null);

export function useKeycloak() {
  const ctx = useContext(KeycloakContext);
  if (!ctx) {
    throw new Error('useKeycloak must be used within KeycloakProvider');
  }
  return ctx;
}
