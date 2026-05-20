export const users_template = `
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
          <h1 class="app-title">Users</h1>
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
          <!-- page actions -->
          <div class="page-actions">
            <h2>User List</h2>
            <a class="btn btn-primary" href="#create-user">+ Create User</a>
          </div>
          <!-- end page actions -->

          <!-- users table -->
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Birth Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
          <!-- end users table -->
        </main>
        <!-- end main content -->

        <!-- footer -->
        <footer class="footer">
          <p>&copy; 2024 Pawnshop Network. All rights reserved.</p>
        </footer>
        <!-- end footer -->
      </div>
    </div>

    <!-- create user modal -->
    <div id="create-user" class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Create User</h2>
        <a class="modal-close" href="#">&times;</a>
      </div>
      <div class="modal-body"></div>
          <div class="form-group">
            <label class="form-label" for="new-password">Password</label>
            <input class="form-input" type="password" id="new-password" name="password" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="confirm-password">Confirm Password</label>
            <input
              class="form-input"
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="user-role">Role</label>
            <select class="form-select" id="user-role" name="role">
              <option value="regular">Regular User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div class="modal-footer">
            <a class="btn btn-secondary" href="#">Cancel</a>
            <button class="btn btn-primary" type="submit">Create User</button>
          </div>
        </form>
      </div>
    </div>
    <a class="modal-overlay" href="#"></a>
    <!-- end create user modal -->

    <!-- delete user modal -->
    <div id="delete-user" class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Delete User</h2>
        <a class="modal-close" href="#">&times;</a>
      </div>
      <div class="modal-body"></div>
      </div>
    </div>
    <a class="modal-overlay" href="#"></a>
    <!-- end delete user modal -->
`;
