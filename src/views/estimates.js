export const estimates_template = `
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
              <a class="sidebar-link active" href="/estimates" data-link>
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
          <h1 class="app-title">Item Estimates</h1>
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
          <!-- new estimate form -->
          <div class="estimate-form-card">
            <h2>New Item Estimate</h2>

            <form id="new-estimate-form">
              <div class="estimate-form-grid">
                <div class="form-group">
                  <label class="form-label" for="item-id">Item ID</label>
                  <input
                    class="form-input"
                    type="number"
                    id="item-id"
                    name="item"
                    placeholder="Enter item ID"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="worker-id">Worker ID</label>
                  <input
                    class="form-input"
                    type="number"
                    id="worker-id"
                    name="worker"
                    placeholder="Enter worker ID"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="estimate-date">Date</label>
                  <input
                    class="form-input"
                    type="date"
                    id="estimate-date"
                    name="date"
                    required
                  />
                </div>

                <div class="form-group">
                  <label class="form-label" for="estimate-cost">Price</label>
                  <input
                    class="form-input"
                    type="number"
                    id="estimate-cost"
                    name="cost"
                    placeholder="$0.00"
                    required
                  />
                </div>

                <div class="form-group" style="grid-column: 1 / -1;">
                  <label class="form-label" for="estimate-reasoning">Reasoning</label>
                  <textarea
                    class="form-textarea"
                    id="estimate-reasoning"
                    name="reasoning"
                    placeholder="Enter reasoning for this estimate..."
                  ></textarea>
                </div>
              </div>

              <div class="estimate-form-actions">
                <button class="btn btn-primary" type="submit">Submit Estimate</button>
                <button class="btn btn-secondary" type="reset">Clear Form</button>
              </div>
            </form>
          </div>
          <!-- end new estimate form -->

          <!-- pending estimates -->
          <div class="pending-section">
            <h2>Pending Estimates</h2>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Worker</th>
                    <th>Reasoning</th>
                    <th>Date</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <!-- end pending estimates -->
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
