import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import SoftwareSection from '@/components/SoftwareSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Modals from '@/components/Modals';

export default function Home() {
  return (
    <StoreProvider>
      <div className="bg-[#F7F7F5] min-h-screen flex flex-col relative">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          <ProductGrid />
          <SoftwareSection />
        </main>

        <Footer />
        <CartDrawer />
        <Modals />
      </div>
    </StoreProvider>
  );
}
