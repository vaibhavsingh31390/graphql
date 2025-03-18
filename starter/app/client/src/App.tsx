import { FormEvent, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleGraphQlReq = async (e: FormEvent) => {
    e.preventDefault();
    const graphqlEndpoint = "http://localhost:3001";
    const requestBody = {query: `{ ${query} }`}
    try {
      const res = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("GraphQL request failed", error);
      setResponse("Error fetching data");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">GraphQL Query</h1>
      <form onSubmit={handleGraphQlReq} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={5}
          placeholder="Enter GraphQL query here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Request
        </button>
      </form>
      {response && (
        <pre className="mt-4 p-2 bg-gray-100 border rounded">{response}</pre>
      )}
    </div>
  );
}

export default App;
