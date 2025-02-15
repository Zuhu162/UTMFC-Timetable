export async function GET(request) {
  const url = new URL(request.url);
  const entity = url.searchParams.get("entity");

  let apiUrl = process.env.NEXT_PUBLIC_API_URL;

  switch (entity) {
    case "authentication":
      const login = url.searchParams.get("login");
      const password = url.searchParams.get("password");
      apiUrl += `entity=${entity}&login=${login}&password=${password}`;
      break;
    case "auth-admin":
      const session_id = url.searchParams.get("session_id");
      apiUrl = `${process.env.API_ADMIN_URL}session_id=${session_id}`;
      break;
    case "pelajar_subjek":
      const no_matrik = url.searchParams.get("no_matrik");
      apiUrl += `entity=${entity}&no_matrik=${no_matrik}`;
      break;
    default:
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
