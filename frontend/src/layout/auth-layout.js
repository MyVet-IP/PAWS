
export function AuthLayout(content) {
  return `
    <main class="min-h-screen bg-surface-soft dark:bg-dark-bg">
      ${content}
    </main>
  `;
}