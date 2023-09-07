import { IProduct } from "@/types/productTypes";

const url = "/api/products";

export async function getProducts(pagination: {
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

export async function searchProducts(searchValue: string) {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url + `/search?search=${searchValue}`, postData);

  return res.json();
}

export async function getProductsVariations(id: number) {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const endpoint = url + `/${id}`;

  const res = await fetch(endpoint, postData);

  return res.json();
}

// export async function addProduct(model: IProduct) {
//   const postData = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: model,
//     }),
//   };

//   const res = await fetch(url, postData);

//   return res.json();
// }

// export async function updateProduct(attrName: string, attrId: number) {
//   const postData = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       attrName: attrName,
//       attrId: attrId,
//     }),
//   };

//   const res = await fetch(url + "?type=update", postData);

//   return res.json();
// }

// export async function deleteProduct(id: number) {
//   const postData = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       id: id,
//     }),
//   };
//   const res = await fetch(url + `/${id}/?type=delete`, postData);

//   return res.json();
// }

// export async function searchAttributes(searchValue: string) {
//   const postData = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const res = await fetch(url + `/search?search=${searchValue}`, postData);

//   return res.json();
// }
