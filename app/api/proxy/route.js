// app/api/proxy/route.js

export async function GET(request) {
  // Extract URL parameters from the request
  const url = new URL(request.url);
  const entity = url.searchParams.get("entity");
  const login = url.searchParams.get("login");
  const password = url.searchParams.get("password");

  // Construct the API URL with the received parameters
  const apiUrl = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=${entity}&login=${login}&password=${password}`;

  try {
    const response = await fetch(apiUrl);

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      return new Response("Error fetching data", { status: response.status });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in proxy handler", error);
    return new Response("Error in proxy handler", { status: 500 });
  }
}
