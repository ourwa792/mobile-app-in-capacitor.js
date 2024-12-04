// Signup.js
import { register } from '../js/auth';

export const signUp = () => {

  const signupFormHTML = `
<div class=" container-sm my-2 bg-light">
  <img class="img-thumbnail" src='/assets/android/icon.png'>

  <h6 class=' text-center my-2'>SignUp</h6>

  <form id="signupForm" class="form-control-sm" novalidate>
      <div class="mb-3">
          <label for="usnm" class="form-label"> user Name</label>
          <input type="text" class="form-control " id="usnm">
      </div>
      <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email">
      </div>
      <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password">
      </div>
      <button type="submit"
      class="btn btn-success">Sign-up</button>
  </form>
  <a class="icon-link icon-link-hover" style="text-decoration: none;" href="/login" data-navigo>
    or login 
    <i class="bi bi-box-arrow-in-right"></i>
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