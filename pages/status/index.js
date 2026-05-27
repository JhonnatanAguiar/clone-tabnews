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
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAt = "Carregando...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAt}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const db = data?.dependencies?.database;
  const dbVersion = db?.version;
  const dbMaxConnections = db?.max_connections;
  const dbOpenedConnections = db?.opened_connections;

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <p>Versão: {dbVersion}</p>
        <p>Conexões máximas: {dbMaxConnections}</p>
        <p>Conexões abertas: {dbOpenedConnections}</p>
      </>
    );
  }

  return (
    <>
      <h3>Status do Banco de Dados</h3>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
