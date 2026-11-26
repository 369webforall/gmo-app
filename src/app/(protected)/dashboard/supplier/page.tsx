import { DashboardGate } from '@/components/dashboard/auth-gate';
import { PageSkeleton } from '@/components/shared/page-skeleton';
import { getSupplierPortalProfile } from '@/server/supplier-portal';
import { connection } from 'next/server';
import { Suspense } from 'react';
import type { ReactNode } from 'react';

export default function SupplierPortalPage() {
  return (
    <DashboardGate>
      <Suspense fallback={<PageSkeleton />}>
        <SupplierPortal />
      </Suspense>
    </DashboardGate>
  );
}

async function SupplierPortal() {
  await connection();
  const supplier = await getSupplierPortalProfile();

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-6 md:p-10'>
      <header>
        <h1 className='text-3xl font-bold tracking-tight'>Supplier profile</h1>
        <p className='text-muted-foreground mt-2 text-sm'>
          Read-only view for the supplier account linked to your verified user
          account.
        </p>
      </header>

      {!supplier ? (
        <section className='border-border bg-card rounded-2xl border p-6'>
          <h2 className='font-semibold'>No supplier account linked</h2>
          <p className='text-muted-foreground mt-2 text-sm leading-6'>
            A GMO admin must link your email-verified GrowMeOnline account to
            an existing supplier profile. Public supplier applications are not
            available through this portal.
          </p>
        </section>
      ) : (
        <>
          <section className='border-border bg-card rounded-2xl border p-6'>
            <div className='flex flex-wrap items-start justify-between gap-4'>
              <div>
                <h2 className='text-xl font-semibold'>
                  {supplier.businessName}
                </h2>
                {supplier.tagline && (
                  <p className='text-muted-foreground mt-1 text-sm'>
                    {supplier.tagline}
                  </p>
                )}
              </div>
              <div className='flex flex-wrap gap-2'>
                <StatusBadge>{formatStatus(supplier.status)}</StatusBadge>
                <StatusBadge>
                  {supplier.isVerified ? 'Verified' : 'Not verified'}
                </StatusBadge>
                <StatusBadge>
                  {supplier.isActive ? 'Active' : 'Inactive'}
                </StatusBadge>
              </div>
            </div>
            {supplier.description && (
              <p className='mt-5 max-w-3xl text-sm leading-6'>
                {supplier.description}
              </p>
            )}
          </section>

          <div className='grid gap-6 md:grid-cols-2'>
            <section className='border-border bg-card rounded-2xl border p-6'>
              <h2 className='font-semibold'>Confirmed services</h2>
              {supplier.categories.length === 0 ? (
                <p className='text-muted-foreground mt-3 text-sm'>
                  No confirmed services are on record.
                </p>
              ) : (
                <ul className='mt-3 space-y-2 text-sm'>
                  {supplier.categories.map(({ category }) => (
                    <li key={category.name}>{category.name}</li>
                  ))}
                </ul>
              )}
            </section>

            <section className='border-border bg-card rounded-2xl border p-6'>
              <h2 className='font-semibold'>Confirmed service areas</h2>
              {supplier.serviceAreas.length === 0 ? (
                <p className='text-muted-foreground mt-3 text-sm'>
                  No confirmed service areas are on record.
                </p>
              ) : (
                <ul className='mt-3 space-y-2 text-sm'>
                  {supplier.serviceAreas.map(({ city }) => (
                    <li key={`${city.name}-${city.province.name}`}>
                      {city.name}, {city.province.name}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <p className='text-muted-foreground text-xs leading-5'>
            This first portal release is read-only. Contact GMO staff to request
            profile changes. Customer enquiries, assignments and messaging are
            not available here.
          </p>
        </>
      )}
    </main>
  );
}

function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className='bg-muted text-muted-foreground inline-flex rounded-full px-2.5 py-1 text-xs font-medium'>
      {children}
    </span>
  );
}

function formatStatus(status: string) {
  return status.replaceAll('_', ' ').toLowerCase();
}
