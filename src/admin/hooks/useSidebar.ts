import { useState, useEffect } from 'react';

const STORAGE_KEY = 'kj_admin_sidebar_collapsed';

export function useSidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  const toggle = () => setCollapsed((c) => !c);
  const expand = () => setCollapsed(false);
  const collapse = () => setCollapsed(true);

  return { collapsed, toggle, expand, collapse };
}
