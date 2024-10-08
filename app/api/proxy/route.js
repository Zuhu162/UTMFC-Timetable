// app/api/proxy/route.js

export async function GET(request) {
  const url = new URL(request.url);
  const entity = url.searchParams.get("entity");

  let apiUrl;

  if (entity === "authentication") {
    const login = url.searchParams.get("login");
    const password = url.searchParams.get("password");
    apiUrl = `http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?entity=${entity}&login=${login}&password=${password}`;
  } else if (entity === "auth-admin") {
    const session_id = url.searchParams.get("session_id");
    apiUrl = `http://web.fc.utm.my/ttms/auth-admin.php?session_id=${session_id}`;
  } else {
    return new Response("Invalid entity", { status: 400 });
  }

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

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
