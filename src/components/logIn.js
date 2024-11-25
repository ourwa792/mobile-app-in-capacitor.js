// Signup.js
import { login } from '../js/auth';

export const logIn = () => {

  const logInFormHTML = `

    <div class="container-sm border border-1 border-black rounded-2 bg-light">

        <form id="loginForm" class="form-control-sm mt-3" novalidate>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password">
            </div>
            <button type="submit"
            class="btn btn-success">Log-in</button>
        </form>
        <p id="message" class="mt-3"></p>
    </div>
  `;

  document.getElementById('app').innerHTML = logInFormHTML;

  
  document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);  // استدعاء وظيفة التسجيل
  });
};