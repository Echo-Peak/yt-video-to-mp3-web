const generateUuid = () => {
  const randomPart = Math.random().toString(36).substring(2, 15);
  const timestampPart = Date.now().toString(36);
  return `${randomPart}-${timestampPart}`;
};

export const getClientUuid = () => {
  const existingId = localStorage.getItem("clientId");
  if (existingId) return existingId;
  const newId = generateUuid();
  localStorage.setItem("clientId", newId);
  return newId;
};
