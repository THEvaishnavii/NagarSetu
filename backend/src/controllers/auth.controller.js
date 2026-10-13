
import bcrypt from "bcryptjs";

import { generateToken } from "../utils/jwt.js";

import prisma from "../../config/prisma.js";
import { signupSchema,loginSchema } from "../validators/auth.validator.js";

export const signup = async (req, res) => {
  try {
    // 1. Validate the request body
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    const { name, email, password } = result.data;

    // 2. Check whether the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // 3. Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Create the user without accepting a role from the request
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    const token = generateToken(user);
    // 5. Return the created user without passwordHash
    return res.status(201).json({
      message: "Signup successful",
      user,
      token
    });
  } catch (error) {
    console.error("Signup error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};




export const login = async (req, res) => {
  try {
    // 1. Validate request data
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues.map((issue) => issue.message),
      });
    }

    const { email, password } = result.data;

    // 2. Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Compare entered password with stored hash
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 4. Generate JWT
    const token = generateToken(user);

    // 5. Return safe user details
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    return res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};





export const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
