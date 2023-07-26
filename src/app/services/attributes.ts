const url = "/api/attributes";

export async function getAttributes(pagination: {
  page: number;
  perPage: number;
}) {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let endpoint = url;

  endpoint += `?pageNumber=${pagination.page + 1}&pageSize=${
    pagination.perPage
  }`;

  const res = await fetch(endpoint, postData);

  return res.json();
}

export async function getAttribute(id: number) {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url + `/${id}`, postData);

  return res.json();
}

export async function addAttribute(attrName: string) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attrName: attrName,
    }),
  };

  const res = await fetch(url, postData);

  return res.json();
}

export async function updateAttribute(attrName: string, attrId: number) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attrName: attrName,
      attrId: attrId,
    }),
  };

  const res = await fetch(url + "?type=update", postData);

  return res.json();
}

export async function deleteAttribute(attrId: number) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attrId: attrId,
    }),
  };

  const res = await fetch(url + "?type=delete", postData);

  return res.json();
}

export async function searchAttributes(searchValue: string) {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url + `/search?search=${searchValue}`, postData);

  return res.json();
}
