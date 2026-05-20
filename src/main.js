import { router } from './router/index.js';
import { fetchUsers, fetchCatalogItems } from './api/index.js';

const BASE_URL = 'http://127.0.0.1:8000';

document.addEventListener('DOMContentLoaded', () => {
  router.init();
});

const showLoading = (selector, type = 'table') => {
  const el = document.querySelector(selector);
  if (!el) return;
  if (type === 'table') {
    el.innerHTML = '<tr><td colspan="10" style="text-align:center">Loading...</td></tr>';
  } else {
    el.innerHTML = '<div style="text-align:center; padding: 20px;">Loading...</div>';
  }
};

document.addEventListener('routeChanged', async (e) => {
  const { path } = e.detail;

  const userNameEl = document.querySelector('.app-user-name');
  const userRoleEl = document.querySelector('.app-user-role');
  if (userNameEl) userNameEl.textContent = 'Retail Manager';
  if (userRoleEl) userRoleEl.textContent = 'Administrator';

  if (path === '/users') {
    const tbody = document.querySelector('.table tbody');
    showLoading('.table tbody');

    const [users, rolesRes] = await Promise.all([
      fetchUsers(),
      window.fetch(`${BASE_URL}/roles/`),
    ]);

    const roles = rolesRes.ok ? await rolesRes.json() : [];
    const roleMap = Object.fromEntries(roles.map((r) => [r.id, r.role]));

    if (tbody) {
      if (users && users.length > 0) {
        tbody.innerHTML = users.map((user) => `
          <tr>
            <td>${user.id}</td>
            <td>${user.first_name} ${user.last_name}</td>
            <td>
              <span class="badge ${roleMap[user.role] === 'Admin' ? 'badge-admin' : 'badge-regular'}">
                ${roleMap[user.role] || 'Worker'}
              </span>
            </td>
            <td><span class="badge badge-active">Active</span></td>
            <td>${user.birth_date}</td>
            <td>
              <div class="table-actions">
                <a class="btn btn-small btn-secondary" href="/user-profile?id=${user.id}" data-link>View</a>
              </div>
            </td>
          </tr>
        `).join('');
      } else {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center">No data found</td></tr>';
      }
    }
  } else if (path === '/user-profile') {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    if (!userId) {
      router.navigateTo('/users');
      return;
    }

    const header = document.querySelector('.profile-header');
    const details = document.querySelector('.profile-details');
    const modalBody = document.querySelector('.modal-body');

    if (header) header.innerHTML = 'Loading...';

    const res = await window.fetch(`${BASE_URL}/workers/${userId}/`);
    if (!res.ok) {
      if (header) header.innerHTML = 'Error loading user';
      return;
    }
    const user = await res.json();

    if (header) {
      header.innerHTML = `
        <div class="profile-avatar">${user.first_name[0]}${user.last_name[0]}</div>
        <div class="profile-info">
          <h2>${user.first_name} ${user.last_name}</h2>
          <span class="badge badge-active">Active</span>
        </div>
      `;
    }

    if (details) {
      details.innerHTML = `
        <div class="profile-detail">
          <div class="detail-label">Worker ID</div>
          <div class="detail-value">${user.id}</div>
        </div>
        <div class="profile-detail">
          <div class="detail-label">Email</div>
          <div class="detail-value">${user.email}</div>
        </div>
        <div class="profile-detail">
          <div class="detail-label">Phone</div>
          <div class="detail-value">${user.phone_number}</div>
        </div>
        <div class="profile-detail">
          <div class="detail-label">Birth Date</div>
          <div class="detail-value">${user.birth_date}</div>
        </div>
      `;
    }

    if (modalBody) {
      modalBody.innerHTML = `
        <form id="edit-worker-form">
          <div class="form-group">
            <label class="form-label">First Name</label>
            <input class="form-input" type="text" name="first_name" value="${user.first_name}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Last Name</label>
            <input class="form-input" type="text" name="last_name" value="${user.last_name}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input class="form-input" type="email" name="email" value="${user.email}" required />
          </div>
          <div class="modal-footer">
            <a class="btn btn-secondary" href="#">Cancel</a>
            <button class="btn btn-primary" type="submit">Save Changes</button>
          </div>
        </form>
      `;

      document.getElementById('edit-worker-form').addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const fd = new FormData(ev.target);
        const updated = {
          ...user,
          first_name: fd.get('first_name'),
          last_name: fd.get('last_name'),
          email: fd.get('email'),
        };

        const saveRes = await window.fetch(`${BASE_URL}/workers/${userId}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        });

        if (saveRes.ok) {
          window.location.hash = '';
          router.navigateTo(`/user-profile?id=${userId}`);
        }
      });
    }
  } else if (path === '/catalog') {
    const grid = document.querySelector('.items-grid');
    showLoading('.items-grid', 'grid');

    const items = await fetchCatalogItems();

    if (grid) {
      if (items && items.length > 0) {
        grid.innerHTML = items.map((item) => `
          <div class="item-card">
            <div class="item-image">📦</div>
            <div class="item-content">
              <div class="item-header">
                <h3>${item.name}</h3>
                <span class="badge badge-active">In Stock</span>
              </div>
              <p class="item-description">${item.description || 'No description available'}</p>
              <div class="item-footer">
                <span class="item-price">ID: ${item.id}</span>
              </div>
            </div>
          </div>
        `).join('');
      } else {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center">No items found</div>';
      }
    }
  } else if (path === '/operations') {
    const tbody = document.querySelector('.table tbody');
    showLoading('.table tbody');

    const [hisRes, opRes, clientRes, itemRes, storeRes] = await Promise.all([
      window.fetch(`${BASE_URL}/op-his/`),
      window.fetch(`${BASE_URL}/operations/`),
      window.fetch(`${BASE_URL}/clients/`),
      window.fetch(`${BASE_URL}/items/`),
      window.fetch(`${BASE_URL}/stores/`),
    ]);

    const history = hisRes.ok ? await hisRes.json() : [];
    const ops = opRes.ok ? await opRes.json() : [];
    const clients = clientRes.ok ? await clientRes.json() : [];
    const items = itemRes.ok ? await itemRes.json() : [];
    const stores = storeRes.ok ? await storeRes.json() : [];

    const opMap = Object.fromEntries(ops.map((o) => [o.id, o.operation]));
    const clientMap = Object.fromEntries(clients.map((c) => [c.id, `${c.first_name} ${c.last_name}`]));
    const itemMap = Object.fromEntries(items.map((i) => [i.id, i.name]));
    const storeMap = Object.fromEntries(stores.map((s) => [s.id, s.name]));

    if (tbody) {
      if (history.length > 0) {
        tbody.innerHTML = history.slice(0, 50).map((op) => `
          <tr>
            <td>${new Date(op.date).toLocaleDateString()}</td>
            <td>${opMap[op.operation] || `Op #${op.operation}`}</td>
            <td>${clientMap[op.client] || `Client #${op.client}`}</td>
            <td>${itemMap[op.item] || `Item #${op.item}`}</td>
            <td>${storeMap[op.store] || `Store #${op.store}`}</td>
            <td>$${op.price}</td>
            <td>${op.info || '-'}</td>
          </tr>
        `).join('');
      } else {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center">No records found</td></tr>';
      }
    }

    // Statistics logic
    const totalValue = history.reduce((sum, op) => sum + parseFloat(op.price), 0);
    const loans = history.filter((op) => (opMap[op.operation] || '').toLowerCase().includes('lend')).length;
    const redemptions = history.filter((op) => {
      const name = (opMap[op.operation] || '').toLowerCase();
      return name.includes('borrow') || name.includes('purch');
    }).length;
    const sales = history.filter((op) => (opMap[op.operation] || '').toLowerCase().includes('sell')).length;

    const statLoans = document.getElementById('stat-loans');
    const statRedemptions = document.getElementById('stat-redemptions');
    const statSold = document.getElementById('stat-sold');
    const statTotalValue = document.getElementById('stat-total-value');

    if (statLoans) statLoans.textContent = loans;
    if (statRedemptions) statRedemptions.textContent = redemptions;
    if (statSold) statSold.textContent = sales;
    if (statTotalValue) statTotalValue.textContent = `$${Math.round(totalValue).toLocaleString()}`;
  } else if (path === '/estimates') {
    const tbody = document.querySelector('.table tbody');
    showLoading('.table tbody');

    const [estRes, itemRes, workerRes] = await Promise.all([
      window.fetch(`${BASE_URL}/estimates/`),
      window.fetch(`${BASE_URL}/items/`),
      window.fetch(`${BASE_URL}/workers/`),
    ]);

    const estimates = estRes.ok ? await estRes.json() : [];
    const items = itemRes.ok ? await itemRes.json() : [];
    const workers = workerRes.ok ? await workerRes.json() : [];

    const itemMap = Object.fromEntries(items.map((i) => [i.id, i.name]));
    const workerMap = Object.fromEntries(workers.map((w) => [w.id, `${w.first_name} ${w.last_name}`]));

    if (tbody) {
      if (estimates.length > 0) {
        tbody.innerHTML = estimates.map((est) => {
          const itemName = itemMap[est.item] || `Item #${est.item}`;
          const workerName = workerMap[est.worker] || `Worker #${est.worker}`;
          return `
            <tr>
              <td>${itemName}</td>
              <td>${workerName}</td>
              <td>${est.reasoning || '-'}</td>
              <td>${est.date}</td>
              <td>$${est.cost}</td>
            </tr>
          `;
        }).join('');
      } else {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align:center">No estimates found</td></tr>';
      }
    }

    const estimateForm = document.getElementById('new-estimate-form');
    if (estimateForm) {
      estimateForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const fd = new FormData(ev.target);
        const newEst = {
          item: parseInt(fd.get('item'), 10),
          worker: parseInt(fd.get('worker'), 10),
          date: fd.get('date'),
          cost: parseFloat(fd.get('cost')),
          reasoning: fd.get('reasoning'),
        };

        const postRes = await window.fetch(`${BASE_URL}/estimates/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEst),
        });

        if (postRes.ok) {
          router.navigateTo('/estimates');
        }
      });
    }
  }
});
