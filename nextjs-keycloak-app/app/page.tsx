'use client'

import { useKeycloak } from '../components/KeycloakProvider';

export default function Home() {
  const { keycloak } = useKeycloak();

  if (!keycloak?.authenticated) return null;

  return (
    <div className="p-8">
      <h1 className="text-xl mb-4">
        Bienvenue {keycloak.tokenParsed?.preferred_username}
      </h1>
      <button
        className="rounded bg-blue-500 text-white px-3 py-1"
        onClick={() => keycloak.logout()}
      >
        Se déconnecter
      </button>
    </div>
  );
}
