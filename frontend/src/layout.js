import { Navbar } from "./components/navbar.js";
import { Aside } from "./components/aside.js";
import { Topbar } from "./components/topbar.js";

export function Layout(viewContent, role, currentPath) {

  // if this is guest
  if (role === "guest") {
    return `
      ${Navbar(role)}
      <main class="p-6">
        ${viewContent}
      </main>
    `;
  }

  // if is user or vet.
  return `
    <div class="flex h-screen">

      ${Aside(role)}

      <div class="flex-1 flex flex-col">

        ${Topbar(role, currentPath)}

        <main class="flex-1 overflow-y-auto p-6">
          ${viewContent}
        </main>

      </div>

    </div>
  `;
}

