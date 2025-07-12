'use client'

import React, { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { KeycloakContext } from '../context/KeycloakContext';

export function KeycloakProvider({ children }: { children: React.ReactNode }) {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);

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
    <KeycloakContext.Provider value={keycloak}>{children}</KeycloakContext.Provider>
  );
}
