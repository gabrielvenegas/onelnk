export const fetchPageData = async (id: string, userId?: string) => {
  if (!userId) return Promise.resolve(null);

  const response = await fetch(`/api/pages/${id}?userId=${userId}`);
  return response.json();
};

export const updatePage = async (data: any) => {
  const response = await fetch(`/api/pages/${data.id}/update`, {
    method: "PUT",
    body: JSON.stringify({
      page: { ...data },
    }),
  });

  return response.json();
};
