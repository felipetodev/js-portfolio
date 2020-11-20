const d = document;
const $formContainer = d.getElementById("form-container");
const $formClose = d.getElementById("form-close");

function openForm() {
    $formContainer.addEventListener("click", e => {
        // console.log(e.target.value);

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