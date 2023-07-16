export async function getProductsTabs() {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    //params: { role: "akis" },
  };
  const res = await fetch("http://localhost:3000/api/testapi", postData);

  return res.json();
}

export async function getTest() {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    //params: { role: "akis" },
  };
  const res = await fetch("http://localhost:3000/api/testapi", postData);

  return res.json();
}
