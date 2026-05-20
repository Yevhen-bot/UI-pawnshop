export const index_template = `
<main class="login-page">
      <div class="login-container">
        <div class="login-card">
          <header class="login-header">
            <h1>Pawnshop Network</h1>
            <p>Sign in to your account</p>
          </header>

          <form class="login-form" action="/users" method="get">
            <div class="form-group">
              <label class="form-label" for="username">Username</label>
              <input class="form-input" type="text" id="username" name="username" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="password">Password</label>
              <input class="form-input" type="password" id="password" name="password" required />
            </div>

            <button class="btn btn-primary login-btn" type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </main>
`;
