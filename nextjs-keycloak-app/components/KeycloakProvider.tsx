'use client'

import React, { useState, useEffect, createContext, useContext } from 'react';
import Keycloak, { KeycloakInstance } from 'keycloak-js';

interface KeycloakContextValue {
  keycloak?: KeycloakInstance;
}

const KeycloakContext = createContext<KeycloakContextValue>({});
export const useKeycloak = () => useContext(KeycloakContext);

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
  const [keycloak, setKeycloak] = useState<KeycloakInstance>();

  useEffect(() => {
    const kc = new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL!,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM!,
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
    });
    kc.init({ onLoad: 'login-required' }).then(() => setKeycloak(kc));
  }, []);

  if (!keycloak) return <p>Loading...</p>;

  return (
    <KeycloakContext.Provider value={{ keycloak }}>
      {children}
    </KeycloakContext.Provider>
  );
}
