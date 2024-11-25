/* class MyCustomComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // هنا يمكن كتابة محتوى HTML للمكون
      this.shadowRoot.innerHTML = `

      <style>
         .mobile-navbar {
            background-color: rgb(101, 255, 98);
            border: 1px solid rgb(148, 139, 211);
            padding: 10px 15px;
            height: 60px; 
            }

            .navbar-brand {
            font-size: 18px;
            color: #000;
            text-decoration: none;
            }

            .navbar-brand img {
            border-radius: 40%; 
            }

            .app-title {
            font-weight: bold;
            color: #000;
            }

            @media (max-width: 768px) {
            .mobile-navbar {
                height: 45px;
            }
            .app-title {
                font-size: 16px; 
            }
            .navbar-brand img {
                width: 30px;
                height: 30px; 
            }
            }
        </style>

         <div class="bottom-bar">
            <a href="#lessons" class="tab-item">
            <span class="icon">📘</span>
            <span class="label">Lessons</span>
            </a>
            <a href="#quizzes" class="tab-item">
            <span class="icon">📋</span>
            <span class="label">Quizzes</span>
            </a>
            <a href="#ask-question" class="tab-item">
            <span class="icon">❓</span>
            <span class="label">Ask</span>
            </a>
            <a href="#profile" class="tab-item">
            <span class="icon">👤</span>
            <span class="label">Profile</span>
            </a>
        </div>
      `;
    }

    connectedCallback() {
        // تحميل CSS ديناميكيًا عند إدراج العنصر في الصفحة
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/css/bootstrap.min.css';
        this.shadowRoot.appendChild(link);
    }

} */
import { Keyboard } from "@capacitor/keyboard";
import { router } from "./routes";
import { Capacitor } from "@capacitor/core";


class MyCustomComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // هنا يمكن كتابة محتوى HTML للمكون
    this.shadowRoot.innerHTML = `
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
          `;
  }

  connectedCallback() {
    /*   const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/css/bootstrap.min.css";
    this.shadowRoot.appendChild(link); */

    const bottomBar = this.shadowRoot.querySelector(".bottom-bar");

    Keyboard.addListener("keyboardWillShow", () => {
      bottomBar.style.display = "none";
    });

    Keyboard.addListener("keyboardWillHide", () => {
      bottomBar.style.display = "flex";
    });

    // إضافة تفاعل التبويبات
    const tabs = this.shadowRoot.querySelectorAll(".tab-item");
    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        tabs.forEach((t) => t.classList.add("active"));
        tab.classList.add("active");
        const targetSection = tab.getAttribute("href").substring(1);
        console.log(`Navigating to ${targetSection}`);
      });
    });
  }
}

customElements.define("my-custom-component", MyCustomComponent);

export { MyCustomComponent };
