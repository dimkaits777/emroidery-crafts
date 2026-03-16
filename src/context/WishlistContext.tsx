import { createContext, useContext, ReactNode, useState } from 'react';

interface WishlistContextType {
  isWishlistOpen: boolean;
  setIsWishlistOpen: (isOpen: boolean) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  return (
    <WishlistContext.Provider value={{ isWishlistOpen, setIsWishlistOpen }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
}
