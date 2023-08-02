import { IProduct } from "@/types/productTypes";
const url = "/api/product";

export async function getProduct(id: any) {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url + `/${id}`, postData);

  return res.json();
}

export async function addProduct(model: IProduct) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
    }),
  };

  const res = await fetch(url, postData);

  return res.json();
}

export async function updateProduct(attrName: string, attrId: number) {
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

export async function deleteProduct(attrId: number) {
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
