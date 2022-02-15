const d = document;

function ga() {
    window.dataLayer = window.dataLayer || [];
    
    function gtag() {
        dataLayer.push(arguments);
    }
    
    gtag("js", new Date());
    gtag("config", "G-F7N71GLLH9", {
        page_path: window.location.pathname,
    });
}
ga();


function gaEvent(event, category) {
    function gtag() {
        dataLayer.push(arguments);
    }

    return gtag("event", event, category)
}

const $navLink = d.querySelectorAll('.nav__link');

function navAnalytics() {
    $navLink.forEach(link => {
        link.addEventListener('click', e => {
            console.log('dispatched') // <----------------------
            gaEvent(`click_en_${e.target.innerText}`, { 
                Categoria: 'Links de redes sociales', 
                Tag: 'Redes sociales'
            });
        });
    })
}

navAnalytics()

const $formContainer = d.getElementById("form-container");
const $formClose = d.getElementById("form-close");

function openForm() {
    $formContainer.addEventListener("click", e => {
        if(e.target === $formContainer || e.target === $formClose) {
            $formContainer.classList.toggle("expand");
            $formContainer.childNodes[1].classList.toggle("expand");
            $formContainer.childNodes[3].classList.toggle("expand");
        }
    });
}

openForm();

//validación

const $resetForm = d.querySelector("form");
const $form = d.querySelectorAll("form [required]");
const $formHead = d.getElementById("form-head");

function formValidation() {
    $form.forEach(input => {
        const inputType = input.type;

        input.addEventListener("keyup", e => {
            let $input = e.target;
            let pattern = $input.pattern || $input.dataset.pattern;

            if(pattern && $input.value !== '') {
                let regex = new RegExp(pattern);
                return !regex.exec($input.value)
                    ? input.classList.add("form-error")
                    : input.classList.remove("form-error")
            }

            if(!pattern) {
                return $input.value === ''
                    ? input.classList.add("form-error")
                    : input.classList.remove("form-error")
            }
        });    
    });
        
    d.addEventListener("submit", e => {
        // e.preventDefault();
        d.body.classList.add("form-submitted");
        $formHead.classList.add("form-submitted");

        setTimeout(() => {
            $resetForm.reset();
            d.body.classList.remove("form-submitted");
            $formHead.classList.remove("form-submitted");
            $formContainer.classList.remove("expand");
            $formContainer.childNodes[1].classList.remove("expand");
            $formContainer.childNodes[3].classList.remove("expand");
        }, 3000);
    });
    
}

formValidation();