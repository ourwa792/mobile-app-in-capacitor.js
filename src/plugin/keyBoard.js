import { Keyboard } from "@capacitor/keyboard";

export const BottomBar =  ()=> {

  const btmBar =`
   <style>            
          .bottom-bar {
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              display: flex;
              justify-content: space-around;
              background-color:rgb(101, 255, 98);
              border-top: 1px solid #ddd;
              height: 50px;
              box-shadow: 0px -2px 5px rgba(0,0,0,0.1);
          }
  
          .tab-item {
              flex: 1;
              text-align: center;
              text-decoration: none;
              color: #333;
              padding: 8px 0;
          }
          .tab-item .active{
              background-color:white;
          }
  
          .tab-item .icon {
              display: block;
              font-size: 16px;
          }
  
          .tab-item .label {
              font-size: 10px;
          }
          @media (min-height: 600px) {
              .bottom-bar {
               position: fixed;
              }
          }
      </style>
        
  
  <div class="bottom-bar">
                  <a href="/lesson" data-navigo class="tab-item">
                    <span class="icon">📘</span>
                    <span class="label">Lessons</span>
                  </a>
                  <a href="/quizzes" data-navigo class="tab-item">
                    <span class="icon">📋</span>
                    <span class="label">Quizzes</span>
                  </a>
                  <a href="/ask-question" data-navigo class="tab-item">
                    <span class="icon">❓</span>
                    <span class="label">Ask</span>
                  </a>
                  <a href="/profile" data-navigo class="tab-item">
                    <span class="icon">👤</span>
                    <span class="label">Profile</span>
                  </a>
    </div>
  ` 

    document.getElementById("bottomBar").innerHTML = btmBar;
  
  
  Keyboard.addListener("keyboardWillShow", ()=> {
      document.querySelector('.bottom-bar').style.display = 'none';
  
  });
  
  Keyboard.addListener("keyboardWillHide", ()=> {
      document.querySelector('.bottom-bar').style.display = 'flex';
  
  })
  
  document.addEventListener('DOMContentLoaded', ()=> {
      const tabs = document.querySelectorAll('.tab-item');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', (event)=> {
          event.preventDefault();
          // Remove 'active' class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
    
          // Add 'active' class to the clicked tab
          tab.classList.add('active');
    
          // Handle navigation to different sections
          const targetSection = tab.getAttribute('href').substring(1);
          console.log(`Navigating to ${targetSection}`);
          // Here you can load different sections of your app based on the targetSection
        });
      });
  });
    

}