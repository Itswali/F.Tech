/**
 * Wishlist persisted to localStorage.
 * Stores product slugs.
 */

const KEY = 'nova_wishlist';

export function getWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function isWishlisted(slug: string): boolean {
  return getWishlist().includes(slug);
}

export function toggleWishlist(slug: string): boolean {
  const list = getWishlist();
  const idx = list.indexOf(slug);
  if (idx === -1) {
    list.push(slug);
    localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } else {
    list.splice(idx, 1);
    localStorage.setItem(KEY, JSON.stringify(list));
    return false;
  }
}
