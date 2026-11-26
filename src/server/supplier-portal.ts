import 'server-only';

import { unauthorized } from 'next/navigation';
import prisma from '@/lib/prisma';
import { isAuthenticated } from '@/server/user';

export async function getSupplierPortalProfile() {
  const session = await isAuthenticated();
  if (!session) {
    unauthorized();
  }

  const account = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, emailVerified: true, banned: true }
  });

  if (
    !account ||
    account.role !== 'user' ||
    !account.emailVerified ||
    account.banned
  ) {
    return null;
  }

  return prisma.supplier.findFirst({
    where: {
      ownerUserId: session.user.id,
      deletedAt: null,
      AND: [
        { slug: { not: { startsWith: 'simulation-' } } },
        { slug: { not: { startsWith: 'test-only-' } } }
      ]
    },
    select: {
      businessName: true,
      tagline: true,
      description: true,
      status: true,
      isVerified: true,
      isActive: true,
      categories: {
        where: { isConfirmed: true },
        select: { category: { select: { name: true } } }
      },
      serviceAreas: {
        where: { isConfirmed: true, isActive: true },
        select: {
          city: {
            select: {
              name: true,
              province: { select: { name: true } }
            }
          }
        }
      }
    }
  });
}
