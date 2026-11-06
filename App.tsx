import AppShell from "@app/AppShell";
import useAppBootstrap from "@app/hooks/useAppBootstrap";
import Providers from "@app/Providers";

function App() {
  const { ready, session } = useAppBootstrap();
  if (!ready) return null; // splash hələ ekrandadır

  return (
    <Providers>
      <AppShell session={session} />
    </Providers>
  );
}

export default App;
