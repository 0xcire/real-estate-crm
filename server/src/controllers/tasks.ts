import type { Request, Response } from "express";
import { findUsersByID } from "../db/queries/user";
import { db } from "../db";
import { tasks, users } from "../db/schema";
import type { NewTask } from "../db/types";
import { and, eq } from "drizzle-orm";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userID = req.user.id;

    const userTasks = await db.query.users.findMany({
      where: eq(users.id, userID),
      columns: { id: true, name: true, username: true },
      with: {
        tasks: true,
      },
    });

    return res.status(200).json({
      message: "",
      tasks: userTasks[0].tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const authUserID = req.user.id;
    const { userID, title, description, notes, dueDate, completed, status, priority } = req.body;

    // TODO: along with auth, contacts, user, need to validate inputs against zod schema

    if (!title) {
      return res.status(400).json({
        message: "Tasks require at least a title.",
      });
    }

    // TODO: extract this, necessary?
    if (authUserID !== userID) {
      return res.status(409).json({
        message: "Cannot complete this operation.",
      });
    }

    const user = findUsersByID({ id: userID });

    const task: NewTask = {
      userID: authUserID,
      title: title,
      description: description,
      notes: notes,
      dueDate: dueDate,
      completed: completed,
      status: status,
      priority: priority,
    };

    console.log(task);

    const newTask = await db.insert(tasks).values(task).returning({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      notes: tasks.notes,
      dueDate: tasks.dueDate,
      completed: tasks.completed,
      status: tasks.status,
      priority: tasks.priority,
    });

    // TODO: Change message
    return res.status(201).json({
      message: `Added task ${newTask[0].id}`,
      task: newTask[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};

// TODO: along with auth, contacts, user, need to validate inputs against zod schema
// sanitize data (express-validator maybe just zod?)
// error handling
export const updateTask = async (req: Request, res: Response) => {
  try {
    const userID = req.user.id;
    const { id } = req.params;
    const { title, description, notes, dueDate, completed, status, priority } = req.body;

    if (!title && !description && !notes && !dueDate && !completed && !status && !priority) {
      return res.status(400).json({
        message: "Update fields.",
      });
    }

    const updatedTask = await db
      .update(tasks)
      .set({
        ...(title
          ? {
              title: title,
            }
          : {}),
        ...(description
          ? {
              description: description,
            }
          : {}),
        ...(notes
          ? {
              notes: notes,
            }
          : {}),
        ...(dueDate
          ? {
              dueDate: dueDate,
            }
          : {}),
        ...(completed
          ? {
              completed: completed,
            }
          : {}),
        ...(status
          ? {
              status: status,
            }
          : {}),
        ...(priority
          ? {
              priority: priority,
            }
          : {}),
      })
      .where(and(eq(tasks.id, +id), eq(tasks.userID, userID)))
      .returning({
        id: tasks.id,
        title: tasks.title,
        description: tasks.description,
        notes: tasks.notes,
        dueDate: tasks.dueDate,
        completed: tasks.completed,
        status: tasks.status,
        priority: tasks.priority,
      });

    if (updatedTask.length === 0) {
      return res.status(400).json({
        message: "No task to update.",
      });
    }
    return res.status(200).json({
      message: "",
      updatedTask: updatedTask[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userID = req.user.id;
    const { id } = req.params;

    const deletedTask = await db
      .delete(tasks)
      .where(and(eq(tasks.id, +id), eq(tasks.userID, userID)))
      .returning({ id: tasks.id });

    if (deletedTask.length === 0) {
      return res.status(400).json({
        message: "Could not find task to delete.",
      });
    }

    return res.status(200).json({
      task: deletedTask[0],
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({});
  }
};

// getOneTask
// deleteAllTasks
