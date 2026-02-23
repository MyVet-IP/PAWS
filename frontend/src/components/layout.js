import { Aside } from "../components/asidebar.js";
import { TopBar } from "../components/topbar.js";

export function Layout(viewContent, role, currentView) {
  return `
    <section class="flex h-screen">

      ${Aside(role)}

      <div class="flex-1 flex flex-col bg-gray-50">

        ${TopBar(currentView)}

        <main class="flex-1 overflow-y-auto p-6">
          ${viewContent}
        </main>

      </div>

    </section>
  `;
}