let form = document.querySelector("#faram");

let fname = form.fname;
let lname = form.lname;
let mail = form.mail;
let pass = form.pass;

let fnameErr = document.querySelector("#fnameErr");
let lnameErr = document.querySelector("#lnameErr");
let mailErr = document.querySelector("#mailErr");
let passErr = document.querySelector("#passErr");
let div = document.querySelector("#div");

let first = document.querySelector("#first");
let second = document.querySelector("#second");
let third = document.querySelector("#third");
let fourth = document.querySelector("#fourth");
let fifth = document.querySelector("#fifth");

let pattern = {
    first: /^([A-Z]{1})([a-z]{2,10})$/,
    last: /^([a-z]{3,10})(\s[a-z]{3,10})?$/,
    mail: /^([a-z0-9._]{2,20})@([a-z]{2,10})\.([a-z]{2,10})(\.[a-z]{2,10})?$/,
    pass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
}

let passPattern = {
    capital: /[A-Z]/,
    lower: /[a-z]/,
    digit: /[0-9]/,
    specialChar: /[#?!@$%^&*-]/
}

fname.addEventListener('input', checkfname);
lname.addEventListener('input', checklname);
mail.addEventListener('input', checkmail);
pass.addEventListener('input', checkpass);

pass.addEventListener('input', checkpasscapital);
pass.addEventListener('input', checkpasslower);
pass.addEventListener('input', checkpassdigit);
pass.addEventListener('input', checkpassspecialchar);
pass.addEventListener('input', checkpasslength);

pass.addEventListener('focus', show);

function show()
{
    div.className = "";
}

function checkpasscapital()
{
    if(pass.value.match(passPattern.capital))
    {
        first.className = "text-success";
        first.innerHTML = "<i class='fa-regular fa-circle-check'></i>&nbsp;&nbsp;Must contain 1 UpperCase letter(A-Z)";
    }
    else
    {
        first.className = "text-danger";
        first.innerHTML = "<i class='fa-regular fa-circle-xmark'></i>&nbsp;&nbsp;Must contain 1 UpperCase letter(A-Z)";
    }
}
function checkpasslower()
{
    if(pass.value.match(passPattern.lower))
    {
        second.className = "text-success";
        second.innerHTML = "<i class='fa-regular fa-circle-check'></i>&nbsp;&nbsp;Must contain 1 LowerCase letter(a-z)";
    }
    else
    {
        second.className = "text-danger";
        second.innerHTML = "<i class='fa-regular fa-circle-xmark'></i>&nbsp;&nbsp;Must contain 1 LowerCase letter(a-z)";
    }
}
function checkpassdigit()
{
    if(pass.value.match(passPattern.digit))
    {
        third.className = "text-success";
        third.innerHTML = "<i class='fa-regular fa-circle-check'></i>&nbsp;&nbsp;Must contain 1 Digit(0-9)";
    }
    else
    {
        third.className = "text-danger";
        third.innerHTML = "<i class='fa-regular fa-circle-xmark'></i>&nbsp;&nbsp;Must contain 1 Digit(0-9)";
    }
}
function checkpassspecialchar()
{
    if(pass.value.match(passPattern.specialChar))
    {
        fourth.className = "text-success";
        fourth.innerHTML = "<i class='fa-regular fa-circle-check'></i>&nbsp;&nbsp;Must contain 1 Special character";
    }
    else
    {
        fourth.className = "text-danger";
        fourth.innerHTML = "<i class='fa-regular fa-circle-xmark'></i>&nbsp;&nbsp;Must contain 1 Special character";
    }
}
function checkpasslength()
{
    if(pass.value.length>=8)
    {
        fifth.className = "text-success";
        fifth.innerHTML = "<i class='fa-regular fa-circle-check'></i>&nbsp;&nbsp;Minimum 8 characters";
    }
    else
    {
        fifth.className = "text-danger";
        fifth.innerHTML = "<i class='fa-regular fa-circle-xmark'></i>&nbsp;&nbsp;Minimum 8 characters";
    }
}

function checkfname()
{
    if(fname.value == "")
    {
        fname.classList.add("border-danger");
        fname.classList.add("border-2");
        fnameErr.textContent = "Empty Field";
    }
    else if(fname.value.length<3 || fname.value.length>=10)
    {
        fname.classList.add("border-danger");
        fname.classList.add("border-2");
        fnameErr.classList.add("text-danger");
        fnameErr.textContent = "Character length must be between 3-10.";
    }
    else if(!pattern.first.test(fname.value))
    {
        fname.classList.add("border-danger");
        fnameErr.classList.add("text-danger");
        fnameErr.textContent = "Only alphabets allowed with first being capital.";
    }
    else
    {
        fname.classList.add("border-success");
        fname.classList.remove("border-danger");
        fnameErr.textContent = "";
        fnameErr.classList.remove("text-danger");
    }
}

function checklname()
{
    if(lname.value == "")
    {
        lname.classList.add("border-danger");
        lname.classList.add("border-2");
        lnameErr.textContent = "Empty Field";
    }
    else if(lname.value.length<3 || lname.value.length>=20)
    {
        lname.classList.add("border-danger");
        lname.classList.add("border-2");
        lnameErr.classList.add("text-danger");
        lnameErr.textContent = "Character length must be between 3-10.";
    }
    else if(!pattern.last.test(lname.value))
    {
        lname.classList.add("border-danger");
        lnameErr.classList.add("text-danger");
        lnameErr.textContent = "Only lowercase alphabets are allowed.";
    }
    else
    {
        lname.classList.add("border-success");
        lname.classList.remove("border-danger");
        lnameErr.textContent = "";
        fnameErr.classList.remove("text-danger");
    }
}

function checkmail()
{
    if(mail.value == "")
    {
        mail.classList.add("border-danger");
        mail.classList.add("border-2");
        mailErr.textContent = "Empty Field";
    }
    else if(!pattern.mail.test(mail.value))
    {
        mail.classList.add("border-danger");
        mail.classList.add("border-2");
        mailErr.classList.add("text-danger");
        mailErr.textContent = "Invalid Email.";
    }
    else
    {
        mail.classList.add("border-success");
        mail.classList.remove("border-danger");
        mailErr.textContent = "";
        mailErr.classList.remove("text-danger");
    }
}

function checkpass()
{
    if(pass.value == "")
    {
        pass.classList.add("border-danger");
        pass.classList.add("border-2");
        passErr.textContent = "Empty Field";
    }
    else if(!pattern.pass.test(pass.value))
    {
        pass.classList.add("border-danger");
        pass.classList.add("border-2");
        passErr.classList.add("text-danger");
        passErr.textContent = "Invalid Password.";
    }
    else
    {
        pass.classList.add("border-success");
        pass.classList.remove("border-danger");
        passErr.textContent = "";
        fnameErr.classList.remove("text-danger");
    }
}