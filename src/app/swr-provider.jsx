'use client';
import { SWRConfig } from 'swr';
const fetcher = (...args) => fetch(...args, {
  headers: {
    'apiKey': process.env.NEXT_PUBLIC_API_KEY,
  }
}).then((res) => res.json());
export const SWRProvider = ({ children }) => {
  return <SWRConfig value={{fetcher}}>{children}</SWRConfig>
};