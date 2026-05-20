export const user_profile_template = `
<!-- main application layout -->
    <div class="app-layout">
      <!-- sidebar navigation -->
      <aside class="app-sidebar sidebar">
        <div class="sidebar-logo">
          <h2>Pawnshop</h2>
          <p>Network Manager</p>
        </div>
        <nav>
          <ul class="sidebar-nav">
            <li>
              <a class="sidebar-link" href="/users" data-link>
                <span class="sidebar-icon">👥</span>
                Users
              </a>
            </li>
            <li>
              <a class="sidebar-link" href="/catalog" data-link>
                <span class="sidebar-icon">📦</span>
                Catalog
              </a>
            </li>
            <li>
              <a class="sidebar-link" href="/estimates" data-link>
                <span class="sidebar-icon">💰</span>
                Estimates
              </a>
            </li>
            <li>
              <a class="sidebar-link" href="/operations" data-link>
                <span class="sidebar-icon">📋</span>
                Operations
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <!-- end sidebar navigation -->

      <!-- main content area -->
      <div class="app-content">
        <!-- header with logout -->
        <header class="app-header">
          <h1 class="app-title">User Profile</h1>
          <div class="app-user">
            <div class="app-user-info">
              <div class="app-user-name"></div>
              <div class="app-user-role"></div>
            </div>
            <a class="app-logout" href="/index" data-link>Logout</a>
          </div>
        </header>
        <!-- end header -->

        <!-- main content -->
        <main class="app-main">
          <!-- back link -->
          <div class="profile-back">
            <a class="btn btn-small btn-secondary" href="/users" data-link>← Back to Users</a>
          </div>

          <!-- profile info card -->
          <div class="profile-card">
            <div class="profile-header"></div>
            <div class="profile-details"></div>
          </div>
          <!-- end profile info card -->

          <!-- edit user section -->
          <div id="edit-user" class="modal">
            <div class="modal-header">
              <h2 class="modal-title">Edit User</h2>
              <a class="modal-close" href="#">&times;</a>
            </div>
            <div class="modal-body"></div>
          </div>
          <a class="modal-overlay" href="#"></a>

          <!-- edit button -->
          <a class="btn btn-primary" href="#edit-user">Edit User</a>
          <!-- end edit user section -->
        </main>
        <!-- end main content -->

        <!-- footer -->
        <footer class="footer">
          <p>&copy; 2024 Pawnshop Network. All rights reserved.</p>
        </footer>
        <!-- end footer -->
      </div>
    </div>
`;
