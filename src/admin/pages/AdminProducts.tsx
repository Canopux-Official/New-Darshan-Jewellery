import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/ui/PageHeader';
import StatusBadge from '../components/ui/StatusBadge';
import AdminButton from '../components/ui/AdminButton';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import AddProductModal from '../components/modals/AddProductModal';
import EmptyState from '../components/ui/EmptyState';
import { TableSkeleton } from '../components/ui/LoadingSkeleton';
import { productsService } from '../services/products.service';
import { categoriesService } from '../services/categories.service';
import { PURITY_LABEL } from '../utils/purity';

const PURITIES = ['All', '24K', '22K', '18K', '14K'];
const PER_PAGE = 10;

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [purity, setPurity] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    productsService.getAllAdmin({
      search: search || undefined,
      purity: purity !== 'All' ? purity : undefined,
      category: categoryFilter !== 'all' ? categoryFilter : undefined,
      page, limit: PER_PAGE,
    }).then((res) => {
      setProducts(res.data); setTotal(res.total); setTotalPages(res.totalPages);
    }).finally(() => setLoading(false));
  }, [search, purity, categoryFilter, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { categoriesService.getAll().then(setCategories); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(deleteTarget.id);
    await productsService.delete(deleteTarget.id);
    setDeleteTarget(null); fetchProducts();
    setActionLoading(null);
  };

  const handleToggleHidden = async (id: string) => {
    setActionLoading(id);
    await productsService.toggleHidden(id);
    fetchProducts(); setActionLoading(null);
  };

  const handleBulkDelete = async () => {
    await Promise.all(selected.map((id) => productsService.delete(id)));
    setSelected([]); setBulkDeleteOpen(false); fetchProducts();
  };

  const toggleSelect = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);

  return (
    <>
      <PageHeader
        title="Products"
        subtitle={`${total} products in catalogue`}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            {selected.length > 0 && (
              <AdminButton variant="danger" size="sm" onClick={() => setBulkDeleteOpen(true)}>
                Delete {selected.length} selected
              </AdminButton>
            )}
            <AdminButton variant="primary" onClick={() => setAddOpen(true)} icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>}>
              Add Product
            </AdminButton>
          </div>
        }
      />

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '220px', maxWidth: '340px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--admin-text-3)" strokeWidth="1.5" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search products…"
            style={{ width: '100%', padding: '8px 12px 8px 36px', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text)', backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: '8px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <select value={purity} onChange={(e) => { setPurity(e.target.value); setPage(1); }}
          style={{ padding: '8px 12px', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text)', backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: '8px', outline: 'none', cursor: 'pointer' }}
        >
          {PURITIES.map((p) => <option key={p} value={p}>{p === 'All' ? 'All Purities' : p}</option>)}
        </select>
        <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          style={{ padding: '8px 12px', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text)', backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: '8px', outline: 'none', cursor: 'pointer' }}
        >
          <option value="all">All Categories</option>
          {categories.map((c: any) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
        style={{ backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', borderRadius: '10px', overflow: 'hidden' }}
      >
        {loading ? (
          <div style={{ padding: '16px 24px' }}><TableSkeleton rows={6} /></div>
        ) : products.length === 0 ? (
          <EmptyState title="No products found" description={search ? `No results for "${search}"` : 'Add your first product to get started.'} icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>} action={<AdminButton variant="primary" onClick={() => setAddOpen(true)}>Add Product</AdminButton>} />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--admin-border)' }}>
                  <th style={{ padding: '10px 20px', width: '40px' }}>
                    <input type="checkbox" checked={selected.length === products.length && products.length > 0}
                      onChange={(e) => setSelected(e.target.checked ? products.map((p) => p.id) : [])}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  {['Product', 'Category', 'Purity', 'Weight', 'Price', 'Status', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--admin-text-2)', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p: any, i: number) => (
                  <tr key={p.id} style={{ borderBottom: i < products.length - 1 ? '1px solid var(--admin-border)' : 'none', transition: 'background 0.15s', backgroundColor: selected.includes(p.id) ? 'rgba(199,161,90,0.04)' : 'transparent' }}
                    onMouseEnter={(e) => !selected.includes(p.id) && (e.currentTarget.style.backgroundColor = 'var(--admin-bg)')}
                    onMouseLeave={(e) => !selected.includes(p.id) && (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '12px 20px' }}>
                      <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} style={{ cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {p.images?.[0]?.url && <img src={p.images[0].url} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />}
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--admin-text)', whiteSpace: 'nowrap', marginBottom: '2px' }}>{p.name}</p>
                          {p.isFeatured && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color: 'var(--color-gold)', backgroundColor: 'rgba(199,161,90,0.12)', padding: '1px 6px', borderRadius: '4px' }}>Featured</span>}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}><span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text-2)', whiteSpace: 'nowrap' }}>{p.category?.name || '—'}</span></td>
                    <td style={{ padding: '12px 16px' }}><span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text)' }}>{PURITY_LABEL[p.purity] || p.purity}</span></td>
                    <td style={{ padding: '12px 16px' }}><span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text-2)', whiteSpace: 'nowrap' }}>{p.weight}</span></td>
                    <td style={{ padding: '12px 16px' }}><span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text)', whiteSpace: 'nowrap' }}>{p.price ?? '—'}</span></td>
                    <td style={{ padding: '12px 16px' }}>
                      <StatusBadge variant={p.isHidden ? 'hidden' : p.isAvailable ? 'active' : 'pending'} label={p.isHidden ? 'Hidden' : p.isAvailable ? 'Active' : 'Made to Order'} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <button onClick={() => handleToggleHidden(p.id)} disabled={actionLoading === p.id}
                          title={p.isHidden ? 'Show' : 'Hide'}
                          style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--admin-text-2)', transition: 'all 0.15s' }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--admin-warning)'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--admin-border)'}
                        >
                          {p.isHidden
                            ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                          }
                        </button>
                        <button onClick={() => setDeleteTarget(p)}
                          style={{ padding: '5px 8px', borderRadius: '6px', border: '1px solid var(--admin-border)', backgroundColor: 'transparent', cursor: 'pointer', color: 'var(--admin-text-2)', transition: 'all 0.15s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--admin-danger)'; e.currentTarget.style.color = 'var(--admin-danger)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.color = 'var(--admin-text-2)'; }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderTop: '1px solid var(--admin-border)' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--admin-text-2)' }}>
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, total)} of {total}
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <AdminButton variant="ghost" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>← Prev</AdminButton>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((pg) => (
                <button key={pg} onClick={() => setPage(pg)}
                  style={{ width: '32px', height: '32px', borderRadius: '6px', border: `1px solid ${pg === page ? 'var(--color-gold)' : 'var(--admin-border)'}`, backgroundColor: pg === page ? 'rgba(199,161,90,0.1)' : 'transparent', color: pg === page ? 'var(--color-gold)' : 'var(--admin-text-2)', fontFamily: 'var(--font-body)', fontSize: '0.8125rem', cursor: 'pointer' }}
                >{pg}</button>
              ))}
              <AdminButton variant="ghost" size="sm" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>Next →</AdminButton>
            </div>
          </div>
        )}
      </motion.div>

      {/* Confirm delete */}
      <ConfirmDialog
        open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        title="Delete Product" description={`"${deleteTarget?.name}" will be permanently deleted. This cannot be undone.`}
        confirmLabel="Delete" isDangerous
      />
      <ConfirmDialog
        open={bulkDeleteOpen} onClose={() => setBulkDeleteOpen(false)} onConfirm={handleBulkDelete}
        title={`Delete ${selected.length} Products`} description={`${selected.length} selected products will be permanently deleted.`}
        confirmLabel="Delete All" isDangerous
      />

      <AddProductModal open={addOpen} onClose={() => setAddOpen(false)} onSaved={fetchProducts} />
    </>
  );
}
