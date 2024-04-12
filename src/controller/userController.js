import {
  addTecnology,
  addUserService,
  deleteTecnologyById,
  findUserById,
  listUserService,
  markTechnologyAsStudied,
  putTecnology,
} from "../service/userService.js";

export function addUser(user) {
  const newUser = addUserService(user);
  return newUser;
}
export function getUsers() {
  return listUserService();
}
export function getUserById(userId) {
  return findUserById(userId);
}

export function addTecnologyUser(userId, tecnology) {
  return addTecnology(userId, tecnology);
}
export function editTecnology(userId, tecnology) {
  return putTecnology(userId, tecnology);
}
export function editTecnologyAsStudied(userId, tecnologyId) {
  return markTechnologyAsStudied(userId, tecnologyId);
}
export function deleteTecnology(user, tecnologyId) {
    return deleteTecnologyById(user, tecnologyId);
}
