// ─── Shopify Storefront API Client ───────────────────────────────────────────
// Conectar: llena NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN y NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN en .env.local

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? '';
const SHOPIFY_TOKEN  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? '';
const API_VERSION    = '2025-01';

export const STOREFRONT_ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(STOREFRONT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // refresca precios/stock cada 60s
  });

  if (!res.ok) throw new Error(`Shopify fetch error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: ShopifyMoney;
    product: {
      title: string;
      featuredImage: ShopifyImage | null;
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
  };
  lines: { edges: { node: ShopifyCartLine }[] };
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          featuredImage { url altText }
          images(first: 5) { edges { node { url altText } } }
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      featuredImage { url altText }
      images(first: 10) { edges { node { url altText } } }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
          }
        }
      }
    }
  }
`;

// ─── Mutations ────────────────────────────────────────────────────────────────

export const CREATE_CART = `
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product {
                    title
                    featuredImage { url altText }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ADD_CART_LINES = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product {
                    title
                    featuredImage { url altText }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const REMOVE_CART_LINES = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product {
                    title
                    featuredImage { url altText }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CART_LINES = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount { amount currencyCode }
          subtotalAmount { amount currencyCode }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price { amount currencyCode }
                  product {
                    title
                    featuredImage { url altText }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatMoney(money: ShopifyMoney): string {
  const amount = parseFloat(money.amount);
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: money.currencyCode,
    minimumFractionDigits: 0,
  }).format(amount);
}
