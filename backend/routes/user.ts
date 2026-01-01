import  { Router, type Request, type Response } from 'express'
import jwt from "jsonwebtoken";
import { prisma } from '../lib/prisma.js';


import bcrypt from "bcryptjs";
import { authMiddleware } from '../middleware/auth.js';
import { Prisma } from '../generated/prisma/client.js';

const userRoutes = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret"

userRoutes.post("/signup", async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
            select: {
                email:true,
                id: true,
                name: true,
            }
        });

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user,
            token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
});


userRoutes.post('/signin', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            })
        }

        const verify = await bcrypt.compare(password, user.password);
        if (!verify) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            })
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(201).json({
            success: true,
            message: "Signed in",
            user,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        })
    }



})


userRoutes.delete(
  "/delete",
  authMiddleware,
  async (req: any, res: Response) => {
    try {
      const userId = req.user.userId;

      await prisma.user.delete({
        where: { id: userId },
      });

      return res.status(200).json({
        success: true,
        message: "Account deleted successfully",
      });

    } catch (error) {

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
);

export default userRoutes