/**
 * Server-Side Authentication & Session Management
 * Built with Node.js crypto and secure HTTP-only cookies
 */

import crypto from 'crypto';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export type UserRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'BROKER'
  | 'AGENT'
  | 'MARKETING_MANAGER'
  | 'CONTENT_EDITOR'
  | 'VIEWER';

export interface UserSession {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  expiresAt: string;
}

const SESSION_COOKIE_NAME = 'ali_admin_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Cryptographic Password Hashing
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(':');
    if (!salt || !originalHash) return false;
    const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(checkHash), Buffer.from(originalHash));
  } catch {
    return false;
  }
}

// Session Creation
export async function createSession(userId: string): Promise<UserSession | null> {
  const user = db.users.findById(userId);
  if (!user || !user.active) return null;

  const sessionId = crypto.randomBytes(32).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS);

  const session: UserSession = {
    id: sessionId,
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  db.sessions.create(session);

  // Set HTTP-only secure cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  // Log activity
  db.activityLogs.create({
    userId: user.id,
    userName: user.name,
    userRole: user.role,
    action: 'USER_LOGIN',
    entity: 'User',
    entityId: user.id,
    details: `User ${user.email} signed in successfully`,
  });

  return session;
}

// Session Retrieval
export async function getCurrentSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie?.value) return null;

    const session = db.sessions.findById(sessionCookie.value);
    if (!session) return null;

    // Check expiration
    if (new Date(session.expiresAt) < new Date()) {
      db.sessions.delete(session.id);
      cookieStore.delete(SESSION_COOKIE_NAME);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

// Session Termination
export async function destroySession(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (sessionCookie?.value) {
      const session = db.sessions.findById(sessionCookie.value);
      if (session) {
        db.activityLogs.create({
          userId: session.userId,
          userName: session.name,
          userRole: session.role,
          action: 'USER_LOGOUT',
          entity: 'User',
          entityId: session.userId,
          details: `User ${session.email} logged out`,
        });
      }
      db.sessions.delete(sessionCookie.value);
    }
    cookieStore.delete(SESSION_COOKIE_NAME);
  } catch {
    // Ignore error
  }
}

// Permission checking helper
export function hasPermission(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  if (userRole === 'SUPER_ADMIN') return true;
  return requiredRoles.includes(userRole);
}
