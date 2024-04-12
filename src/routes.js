import { Router } from "express";
import {
  addTecnologyUser,
  addUser,
  deleteTecnology,
  editTecnology,
  editTecnologyAsStudied,
  getUsers,
} from "./controller/userController.js";
import { findUserByUsername } from "./service/userService.js";

export const router = new Router();

const checkExistsUserAccount = (req, res, next) => {
  const { username } = req.headers;

  // Supondo que users seja um array de usuários já existentes
  const user = findUserByUsername(username);

  if (!user) {
    return res.status(404).json({ error: "User not exists" });
  }

  // Adiciona o usuário à requisição para que outras rotas possam acessá-lo
  req.user = user;
  next();
};

router.post("/users", (req, res) => {
  let user = addUser(req.body);
  return res.status(201).json(user);
});

router.get("/user", (req, res) => {
  let users = getUsers();
  return res.status(200).json(users);
});

router.get("/technologies", checkExistsUserAccount, (req, res) => {
  const user = req.user;
  console.log("user => ", user);
  return res.json({ tecnologies: user.tecnologies });
});

router.post("/technologies", checkExistsUserAccount, (req, res) => {
  const user = req.user;
  const userTecnology = req.body;
  const userTec = addTecnologyUser(user.id, userTecnology);
  return res.json({ user: userTec });
});
router.put("/technologies/:id", checkExistsUserAccount, (req, res) => {
  const user = req.user;

  let userTecnology = req.body;
  userTecnology.id = req.params.id;

  const tecnologyUpdated = editTecnology(user.id, userTecnology);
  if (!tecnologyUpdated) {
    return res.status(400).json({
      error: "Tecnologia não encontrada.",
    });
  }
  return res.json({ tecnology: tecnologyUpdated });
});
router.patch(
  "/technologies/:id/studied",
  checkExistsUserAccount,
  (req, res) => {
    const user = req.user;

    if (!req.params.id) {
      return res.status(400).json({
        error: "Id dá tecnologia não foi informado.",
      });
    }

    const tecnologyUpdatedAsStudied = editTecnologyAsStudied(
      user.id,
      req.params.id
    );
    if (!tecnologyUpdatedAsStudied) {
      return res.status(400).json({
        error: "Tecnologia não encontrada.",
      });
    }
    return res.json({ tecnology: tecnologyUpdatedAsStudied });
  }
);
router.delete("/technologies/:id", checkExistsUserAccount, (req, res) => {
  const user = req.user;

  if (!req.params.id) {
    return res.status(400).json({
      error: "Id dá tecnologia não foi informado.",
    });
  }

  const tecnologies = deleteTecnology(user, req.params.id);
  if (!tecnologies) {
    return res.status(400).json({
      error: "Tecnologia não encontrada.",
    });
  }
  return res.json({ tecnologies: tecnologies });
});
