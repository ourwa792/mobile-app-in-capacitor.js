// Signup.js
import { register } from '../js/auth';

export const signUp = () => {

  const signupFormHTML = `
<div class=" container-sm border-black rounded-2 my-2 bg-light">
  <h6 id="title" class="border-2 rounded-2 border-bottom my-2">Sign up</h6>
  <form id="signupForm" class="form-control-sm" novalidate>
      <div class="mb-3">
          <label for="usnm" style="font-size: 16px" class="form-label"> user Name</label>
          <input type="text" class="form-control " id="usnm">
      </div>
      <div class="mb-3">
          <label for="email" style="font-size: 16px" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email">
      </div>
      <div class="mb-3">
          <label for="password" style="font-size: 16px" class="form-label">Password</label>
          <input type="password" class="form-control" id="password">
      </div>
      <button type="submit"
      class="btn btn-success">Sign-up</button>
  </form>
  <a class="icon-link icon-link-hover" href="/login" data-navigo>
    or login 
    <svg class="bi" aria-hidden="true"><use xlink:href="#arrow-right"></use></svg>
  </a>

</div>

`;

  document.getElementById('app').innerHTML = signupFormHTML;

  
  document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const userName = document.getElementById('usnm').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(userName)
    console.log(email)
    console.log(password)
    register(userName, email, password);  // استدعاء وظيفة التسجيل
  });
};