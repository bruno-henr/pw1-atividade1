import { v4 } from "uuid";

let users = [];

export function addUserService(user) {
  const newUser = { ...user, id: v4(), tecnologies: [] };
  users.push(newUser);
  return newUser;
}

export function listUserService() {
  return users;
}

export function findUserById(userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return null;
  }

  return user;
}

export function findUserByUsername(username) {
  const user = users.find((u) => u.username === username);
  if (!user) {
    return null;
  }

  return user;
}
export function addTecnology(userId, tecnology) {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return null;
  }
  user.tecnologies.push({
    title: tecnology.title,
    deadline: new Date(tecnology.deadline),
    id: v4(),
    studied: false,
    created_at: new Date(),
  });

  return user;
}
export function putTecnology(userId, tecnology) {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return null;
  }
  
  const tecnologyExists = user.tecnologies.find((t) => t.id === tecnology.id);
  if (!tecnologyExists) {
    return null;
  }
  Object.assign(tecnologyExists, {
    title: tecnology.title ?? tecnologyExists.title,
    deadline: tecnology.deadline ?? tecnologyExists.deadline,
  });

  return tecnologyExists;
}
export function markTechnologyAsStudied(userId, tecnologyId) {
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return null;
  }

  const tecnologyExists = user.tecnologies.find((t) => t.id === tecnologyId);
  if (!tecnologyExists) {
    return null;
  }
  Object.assign(tecnologyExists, {
    studied: true,
  });

  return tecnologyExists;
}
export function deleteTecnologyById(user, tecnologyId) {
  const tecnologyExists = user.tecnologies.find((t) => t.id === tecnologyId);
  if (!tecnologyExists) {
    return null;
  }
  user.tecnologies = user.tecnologies.filter(
    (technology) => technology.id !== tecnologyId
  );

  return user.tecnologies;
}
