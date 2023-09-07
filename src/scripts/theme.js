const html = document.querySelector("html")
const darkModeButton = document.querySelector(".darkMode__button")
const imageDarkModeButton = document.querySelector(".darkMode__button > img")
let darkMode = false

function changeTheme(){
    darkMode = !darkMode
    html.classList.toggle("dark-mode")
    localStorage.setItem("theme", JSON.stringify(darkMode))
}

function checkTheme(){
    darkMode = JSON.parse(localStorage.getItem("theme"));
	if (darkMode) {
    html.classList.add("dark-mode");
    imageDarkModeButton.src = "./src/assets/img/sun.svg"
  }
}

darkModeButton.addEventListener("click", ()=>{
    changeTheme()
    if(html.classList.contains("dark-mode")){
        imageDarkModeButton.src = "./src/assets/img/sun.svg"
    }else{
        imageDarkModeButton.src = "./src/assets/img/moon.svg"
    }
})

checkTheme()