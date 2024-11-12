const textElement = document.querySelector('.text');
const texts = ['Front-End Developer', 'Web Developer', 'React Developer', 'Freelancer'];
let currentIndex = 0;

function typeWriter() {
    const currentText = texts[currentIndex];
    let letterIndex = 0;

    function type() {
        if (letterIndex < currentText.length) {
            textElement.textContent += currentText.charAt(letterIndex);
            letterIndex++;
            setTimeout(type, 100); 
        } else {
            setTimeout(erase, 1000); 
        }
    }

    function erase() {
        if (textElement.textContent.length > 0) {
            textElement.textContent = textElement.textContent.slice(0, -1);
            setTimeout(erase, 50); 
        } else {
            currentIndex = (currentIndex + 1) % texts.length;
            setTimeout(typeWriter, 500); 
        }
    }

    type();
}

typeWriter(); 

function changeLanguage(lang) {
    fetch(`/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.projects h1').textContent = data.projects;
            document.querySelector('.content h1').innerHTML = data.hello;
            document.querySelector('.aboutMe').innerHTML = data.aboutMe;
            document.querySelectorAll('.contactBtn').forEach(element => {
                element.textContent = data.contact;
            });
            document.querySelectorAll('.viewProject').forEach(element => {
                element.textContent = data.projectLink;
            });
            document.querySelectorAll('.viewCode').forEach(element => {
                element.textContent = data.codeLink;
            });
            document.querySelector('.contactText h1').innerHTML = data.contactTitle;
            document.querySelector('.contactText p').innerHTML = data.contactDesc;
            document.querySelector('.skillsSection h1').innerHTML = data.skills;
            document.querySelector('.cv').innerHTML = data.cv;
        });
}

// Dil seçimini izle

let cvLink = document.getElementById('download-cv');
let languageSelect = document.getElementById('language-select');

let language = "tr";
changeLanguage(language);
cvLink.href = "./assets/doc/Emirhan-Gozukucuk-CV-(Tr).pdf";

languageSelect.addEventListener('change', function() {
    language = this.value;
    changeLanguage(language)

    if (language === "tr") {
        cvLink.href = "./assets/doc/Emirhan-Gozukucuk-CV-(Tr).pdf";
    } else if (language === "en" || language === "de") {
        cvLink.href = "./assets/doc/Emirhan-Gozukucuk-CV-(En).pdf";
    }
});