import { Router } from "express";
import { deleteUser, getMyInfo, updateUser } from "../controllers/user";
import { validateSession, isOwner, validateCSRF } from "../middlewares";
import { validateRequest } from "../middlewares/validate-input";
import { authCookieValidator, paramSchema, updateUserValidator } from "../db/validation-schema";

export default (router: Router) => {
  router.get("/user/me", validateRequest({ cookies: authCookieValidator }), validateSession, getMyInfo);

  router.patch(
    "/user/:id",
    validateRequest({ body: updateUserValidator, params: paramSchema, cookies: authCookieValidator }),
    validateSession,
    validateCSRF,
    isOwner,
    updateUser
  );

  router.delete(
    "/user/:id",
    validateRequest({ params: paramSchema, cookies: authCookieValidator }),
    validateSession,
    validateCSRF,
    isOwner,
    deleteUser
  );
};
