// ============================================================
// App.tsx - تواق 2 - المسابقة الثقافية التنافسية
// Routes: Home, Leaderboard, Player, Store, Events, Admin
// Theme: Dark Tournament (Navy + Orange)
// ============================================================

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import PlayerPage from "./pages/PlayerPage";
import Store from "./pages/Store";
import Events from "./pages/Events";
import Admin from "./pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/player" component={PlayerPage} />
      <Route path="/store" component={Store} />
      <Route path="/events" component={Events} />
      <Route path="/admin" component={Admin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#1B2E45',
                border: '1px solid rgba(247,148,29,0.3)',
                color: '#fff',
                fontFamily: 'Tajawal, sans-serif',
                direction: 'rtl',
              },
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
