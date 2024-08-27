import { CodeEditor } from '@/components/code-editor'
import { ThemeProvider } from '@/components/contexts/theme-provider'
import { NavBar } from '@/components/navigation-bar'

export default function Index() {
  return (
    <ThemeProvider>
      <NavBar />
      <CodeEditor />
    </ThemeProvider>
  )
}
