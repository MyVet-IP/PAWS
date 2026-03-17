import { navbarController, navbarEvents } from "../components/navbar.js";
import { Aside } from "../components/aside.js";
import { Topbar, topbarEvents } from "../components/topbar.js";
import { getUser } from "../utils.js";
import { Footer } from "../components/footer.js";

export function Layout(content, path = '/') {

  const user = getUser();
  const role = user ? user.role : "guest";

  const currentPath = window.location.hash || "/#/";

  // if this is guest
  if (role === "guest") {

    const html = `
          ${navbarController()}

          <main class="${path === '/map-page' ? 'p-0' : 'p-6'}">
            ${content}
          </main>
          ${Footer()}
        `;

    setTimeout(navbarEvents, 0);

    return html;
  }

  // if is user or vet.
  setTimeout(topbarEvents, 0); 

  return `
        <div class="flex h-screen">

          ${Aside(role)}

          <div class="flex-1 flex flex-col min-w-0">

            ${Topbar(role, currentPath)}

            <main class="flex-1 ${path === '/map-page' ? 'overflow-hidden p-0' : 'overflow-y-auto p-6'}" id="main-content">
              ${content}
            </main>

          </div>

        </div>

      `;
}




