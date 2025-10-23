import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider as LocalCartProvider } from './contexts/LocalCartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { CartPage } from './pages/CartPage';
import { Profile } from './pages/Profile';
import { OrderHistory } from './pages/OrderHistory';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/admin/Dashboard';
import { ProductsManagement } from './pages/admin/ProductsManagement';
import { OrdersManagement } from './pages/admin/OrdersManagement';
import { CategoriesManagement } from './pages/admin/CategoriesManagement';
import { CategoryPage } from './pages/CategoryPage';
import Categories from './pages/Categories';
import { NotFound } from './pages/NotFound';
import { Unauthorized } from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LocalCartProvider>
          <AppContent />
        </LocalCartProvider>
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={
            <Login onNavigate={(path) => window.location.href = `/${path}`} />
          } />
          <Route path="/signup" element={
            <Signup 
              onNavigate={(path) => window.location.href = `/${path}`}
              onBack={() => window.history.back()}
            />
          } />
          <Route path="/fruits" element={<Products />} />
          <Route path="/fruits/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          
          {/* Protected user routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute requireAdmin>
              <ProductsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute requireAdmin>
              <OrdersManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/categories" element={
            <ProtectedRoute requireAdmin>
              <CategoriesManagement />
            </ProtectedRoute>
          } />

          {/* Error routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
