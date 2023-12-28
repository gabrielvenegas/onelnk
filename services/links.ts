export const fetchLinksData = async (pageId: string) => {
  const response = await fetch(`/api/links/list?pageId=${pageId}`);
  return response.json();
};

export const updateLinks = async (links: any[]) => {
  const response = await fetch(`/api/links/update`, {
    method: "PUT",
    body: JSON.stringify({
      links,
    }),
  });

  return response.json();
};
