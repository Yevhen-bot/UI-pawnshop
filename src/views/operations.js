export const operations_template = `
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
              <a class="sidebar-link active" href="/operations" data-link>
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
          <h1 class="app-title">Operations History</h1>
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
          <!-- stats summary -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Loans</div>
              <div class="stat-value blue" id="stat-loans"></div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total Redemptions</div>
              <div class="stat-value green" id="stat-redemptions"></div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Items Sold</div>
              <div class="stat-value orange" id="stat-sold"></div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total Value</div>
              <div class="stat-value dark" id="stat-total-value"></div>
            </div>
          </div>
          <!-- end stats summary -->

          <!-- filter section -->
          <div class="filter-bar">
            <div class="filter-row">
              <div class="form-group">
                <input class="form-input" type="date" />
              </div>
              <span>to</span>
              <div class="form-group">
                <input class="form-input" type="date" />
              </div>
              <select class="form-select">
                <option value="">All Types</option>
                <option value="loan">Loan</option>
                <option value="redemption">Redemption</option>
                <option value="sale">Sale</option>
              </select>
              <select class="form-select">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
          <!-- end filter section -->

          <!-- operations table -->
          <div class="operations-section">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Customer</th>
                    <th>Item</th>
                    <th>Store</th>
                    <th>Price</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <!-- end operations table -->
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
