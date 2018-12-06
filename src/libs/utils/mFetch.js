const mimeTypes = {
  json: "application/json"
};

export default async (
  resource,
  method = "GET",
  body = null,
  baseUrlApi = process.env.REACT_APP_BASE_URL_API,
  cType = "json"
) => {
  let options = {
    headers: {
      "Content-Type": mimeTypes[cType]
    },
    method
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let response = await fetch(`${baseUrlApi}${resource}`, options);
  console.log(`${baseUrlApi}${resource}`);
  console.log(response);

  if (cType === "json") {
    response = await response.json();
  }
  console.log(response);

  return response;
};
