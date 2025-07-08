// hooks/usePreviousRoute.js
'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function usePreviousRoute() {
  const pathname = usePathname();

  useEffect(() => {
    const current = sessionStorage.getItem('currentPath');
    if (current !== pathname) {
      sessionStorage.setItem('previousPath', current || '');
      sessionStorage.setItem('currentPath', pathname);
    }
  }, [pathname]);
}
