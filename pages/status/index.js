import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <DatabaseInfo />
    </>
  );
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const updatedAtText = () => {
    if (!isLoading && data) {
      return new Date(data.updated_at).toLocaleString("pt-BR");
    }

    return "Carregando...";
  };

  const db = data?.dependencies?.database;
  const dbVersion = db?.version;
  const dbMaxConnections = db?.max_connections;
  const dbOpenedConnections = db?.opened_connections;

  return (
    <>
      <div>Última atualização {updatedAtText()}</div>

      <h3>Status do Banco de Dados</h3>
      <p>Versão: {dbVersion}</p>
      <p>Conexões máximas: {dbMaxConnections}</p>
      <p>Conexões abertas: {dbOpenedConnections}</p>
    </>
  );
}
