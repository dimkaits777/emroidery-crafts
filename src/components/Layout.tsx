import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WishlistDrawer } from './WishlistDrawer';
import { WishlistProvider } from '../context/WishlistContext';

export function Layout() {
  return (
    <WishlistProvider>
      <div className="min-h-screen flex flex-col font-outfit bg-stone-50/50 text-stone-800 selection:bg-rose-200 selection:text-rose-900">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <WishlistDrawer />
      </div>
    </WishlistProvider>
  );
}
