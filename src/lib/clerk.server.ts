import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { getTursoDb } from "./turso.server";

export async function getClerkAdminState() {
  const session = await auth();
  if (!session.isAuthenticated || !session.userId) {
    return { isAuthenticated: false, isAdmin: false };
  }

  const db = getTursoDb();
  const role = await db.get(
    "SELECT role FROM admin_roles WHERE clerk_user_id = ? LIMIT 1",
    session.userId,
  );

  return { isAuthenticated: true, isAdmin: role?.role === "admin" };
}

export async function requireClerkAdmin() {
  await bootstrapClerkAdmin();
  const session = await auth();
  if (!session.isAuthenticated || !session.userId) {
    throw new Error("Sign in is required.");
  }

  const db = getTursoDb();
  const role = await db.get(
    "SELECT role FROM admin_roles WHERE clerk_user_id = ? LIMIT 1",
    session.userId,
  );
  if (role?.role !== "admin") throw new Error("Administrator access is required.");
  return { userId: session.userId, db };
}

export async function bootstrapClerkAdmin() {
  const session = await auth();
  if (!session.isAuthenticated || !session.userId) return false;

  const allowedEmail = process.env["CLERK_ADMIN_EMAIL"]?.trim().toLowerCase();
  if (!allowedEmail) return false;

  const user = await clerkClient().users.getUser(session.userId);
  const hasVerifiedEmail = user.emailAddresses.some(
    (address) =>
      address.emailAddress.trim().toLowerCase() === allowedEmail &&
      address.verification?.status === "verified",
  );
  if (!hasVerifiedEmail) return false;

  const db = getTursoDb();
  const existingAdmin = await db.get("SELECT clerk_user_id FROM admin_roles WHERE role = ? LIMIT 1", "admin");
  if (existingAdmin && existingAdmin.clerk_user_id !== session.userId) return false;

  await db.run(
    "INSERT OR IGNORE INTO admin_roles (clerk_user_id, role) VALUES (?, ?)",
    session.userId,
    "admin",
  );
  return true;
}