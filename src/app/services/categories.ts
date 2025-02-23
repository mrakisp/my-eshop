const url = "/api/categories";

export async function getCategories(pagination: {
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
  //if (pagination.page && pagination.perPage) {
  endpoint += `?pageNumber=${pagination.page + 1}&pageSize=${
    pagination.perPage
  }`;
  //}
  const res = await fetch(endpoint, postData);

  return res.json();
}

export async function getCategory(id: number) {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url + `/${id}`, postData);

  return res.json();
}

export async function addCategory(
  categoryName: string,
  categoryDescr: string | null,
  parentCategory: number | null,
  showType: string
  // categoryImage: string | null
) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryName: categoryName,
      categoryDescr: categoryDescr,
      parentCategory: parentCategory,
      showType: showType,
    }),
  };

  const res = await fetch(url, postData);

  return res.json();
}

export async function updateCategory(
  categoryName: string,
  categoryDescr: string | null,
  parentCategory: number | null,
  categoryId: number,
  showType: string
) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryName: categoryName,
      categoryDescr: categoryDescr,
      parentCategory: parentCategory,
      categoryId: categoryId,
      showType: showType,
    }),
  };

  const res = await fetch(url + "?type=update", postData);

  return res.json();
}

export async function deleteCategory(categoryId: number) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryId: categoryId,
    }),
  };

  const res = await fetch(url + `?type=delete`, postData);

  return res.json();
}

export async function deleteCategories(categoryIds: number[]) {
  const postData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryIds: categoryIds,
    }),
  };

  const res = await fetch(url + "/deleteMass", postData);

  return res.json();
}

export async function searchCategories(searchValue: string) {
  const postData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url + `/search?search=${searchValue}`, postData);

  return res.json();
}
