import { Router } from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getDashboardTasks,
  getTask,
  searchUsersTasks,
} from "../controllers/tasks";

import { isAuth } from "../middlewares";
import { validateRequest } from "../middlewares/validate-input";
import { isTaskOwner } from "../middlewares/tasks";
import { isListingOwner } from "../middlewares/listings";
import { isContactOwner } from "../middlewares/contacts";

import {
  authCookieValidator,
  createTaskValidator,
  updateTaskValidator,
  dashboardTaskQueryValidator,
  listingIDValidator,
  contactIDValidator,
  taskIDValidator,
  taskQueryValidator,
  taskQuerySearchValidator,
} from "../db/validation-schema";

export default (router: Router) => {
  router.get(
    "/dashboard/tasks",
    validateRequest({ query: dashboardTaskQueryValidator, cookies: authCookieValidator }),
    isAuth,
    getDashboardTasks
  );

  router.get("/tasks", validateRequest({ query: taskQueryValidator, cookies: authCookieValidator }), isAuth, getTasks);

  router.get(
    "/tasks/search",
    validateRequest({ cookies: authCookieValidator, query: taskQuerySearchValidator }),
    isAuth,
    searchUsersTasks
  );

  router.get(
    "/tasks/:taskID",
    validateRequest({ params: taskIDValidator, cookies: authCookieValidator }),
    isAuth,
    isTaskOwner,
    getTask
  );

  router.get(
    "/tasks/listings/:listingID",
    validateRequest({ query: taskQueryValidator, params: listingIDValidator, cookies: authCookieValidator }),
    isAuth,
    isListingOwner,
    getTasks
  );

  router.get(
    "/tasks/contacts/:contactID",
    validateRequest({ query: taskQueryValidator, params: contactIDValidator, cookies: authCookieValidator }),
    isAuth,
    isContactOwner,
    getTasks
  );

  router.post(
    "/tasks",
    validateRequest({ body: createTaskValidator, cookies: authCookieValidator }),
    isAuth,
    createTask
  );

  router.patch(
    "/tasks/:taskID",
    validateRequest({ body: updateTaskValidator, cookies: authCookieValidator, params: taskIDValidator }),
    isAuth,
    isTaskOwner,
    updateTask
  );

  router.delete(
    "/tasks/:taskID",
    validateRequest({ params: taskIDValidator, cookies: authCookieValidator }),
    isAuth,
    isTaskOwner,
    deleteTask
  );
};
