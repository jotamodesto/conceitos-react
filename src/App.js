import React, { useState, useEffect } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await api.get("/repositories");
      setRespositories(response.data);
    })();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "jotamodesto",
      url: "https://github.com/jotamodesto",
      techs: ["React", "C#"],
    });

    setRespositories(repositories.concat(response.data));
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRespositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
