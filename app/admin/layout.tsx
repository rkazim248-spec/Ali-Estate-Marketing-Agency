import React from 'react';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getCurrentSession } from '@/lib/auth/server-auth';
import { AdminShell } from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  // Allow login page access
  // Note: if user is logged in and visits login page, we can redirect to dashboard inside login page or layout
  return (
    <AdminShell session={session}>
      {children}
    </AdminShell>
  );
}
