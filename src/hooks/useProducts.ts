import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Product } from '../types';
import { extractCategory } from '../lib/utils';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/products.csv');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const csvData = await response.text();
        
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedProducts: Product[] = results.data.map((row: any, index) => ({
              id: `prod-${index}`,
              title: row.title || '',
              description: row.description || '',
              image_url: row.image_url || '',
              product_url: row.product_url || '',
              affilate_url: row.affilate_url || '',
              button: row.button || '',
              category: extractCategory(row.title || ''),
            })).filter((p: Product) => p.title && p.image_url); // Filter out invalid rows
            
            setProducts(parsedProducts);
            setLoading(false);
          },
          error: (error: any) => {
            setError(error.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
