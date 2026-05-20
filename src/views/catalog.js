export const catalog_template = `
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
              <a class="sidebar-link active" href="/catalog" data-link>
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
          <h1 class="app-title">Item Catalog</h1>
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
          <!-- filter section -->
          <div class="filter-bar">
            <div class="filter-row">
              <div class="form-group">
                <input class="form-input" type="search" placeholder="Search items..." />
              </div>
              <select class="form-select">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="jewelry">Jewelry</option>
                <option value="vehicles">Vehicles</option>
                <option value="other">Other</option>
              </select>
              <select class="form-select">
                <option value="">All Status</option>
                <option value="instock">In Stock</option>
                <option value="redeemed">Redeemed</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
          <!-- end filter section -->

          <!-- items grid -->
          <div class="items-grid"></div>
          <!-- end items grid -->
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
