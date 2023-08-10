let btn = document.querySelector(".btn");
btn.addEventListener("click", createUpdate);

let idcol = document.querySelector("#id");
function createUpdate(e){
    e.preventDefault();
    if(idcol.value == "")
    {
        create();
    }
    else
    {
        update();
    }
}

let data = document.querySelector("#data");
function retrieve()
{
    data.innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/recieve.php", true)

    // Converting json string into js object
    xhr.responseType = "json";
    xhr.onload = ()=>{
        if(xhr.status === 200)
        {
            x = xhr.response;
            for(let i=0; i<x.length; i++)
            {
                data.innerHTML += "<tr class='border-bottom'><td>" + x[i].id +"</td><td>" + x[i].fname + " " + x[i].lname + "</td><td>" + x[i].mail + "</td><td>" + "<button class='btn btn-warning btn-sm mb-1' data-sid=" + x[i].id + ">Edit</button>" + "</td><td>" + "<button class='btn btn-danger btn-sm mb-1' data-sid=" + x[i].id + ">Delete</button></td></tr>";
            }
        }
        else
        {
            console.log("Something Error with status while recieving.");
        }
        edit();
        dileet();
    }
    xhr.send();
}
retrieve();

function create()
{

    let id = document.querySelector("#id").value;
    let fn = document.querySelector("#fname").value;
    let ln = document.querySelector("#lname").value;
    let em = document.querySelector("#inputEmail4").value;
    let ps = document.querySelector("#inputPassword4").value;

    if(fn == "" || ln == "" || em == "" || ps == "")
    {
        alert('Please fill out the empty fields.')
    }
    else if(fnameErr.textContent.length>0 || lnameErr.textContent.length>0 || mailErr.textContent.length>0 || passErr.textContent.length>0)
    {
        alert('Please clear all error before submission.');
    }
    else
    {
        let xhr = new XMLHttpRequest();

        xhr.open("POST", 'php/send.php', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if(xhr.status===200)
            {
                let form = document.querySelector("#faram");
                let div = document.querySelector("#div");
                fname.classList.remove("border-success");
                fname.classList.remove("border-2");
                lname.classList.remove("border-success");
                lname.classList.remove("border-2");
                mail.classList.remove("border-success");
                mail.classList.remove("border-2");
                pass.classList.remove("border-success");
                pass.classList.remove("border-2");
                div.className = "d-none";
                form.reset();
                fname.focus();
                let sdiv = document.querySelector(".msg");
                sdiv.classList.remove("d-none");
                sdiv.innerHTML = "<div class='container bg-light rounded text-center text-success border border-success p-3 w-50'>" + xhr.response +"</div>";
                setTimeout(hide, 3000);
                function hide()
                {
                    sdiv.classList.add("d-none");
                }
                retrieve();
            }
            else
            {
                console.log("Error Status");
            }
        }
        let myData = { fname: fn, lname: ln, mail: em, password: ps};
        let data = JSON.stringify(myData);

        xhr.send(data);
    }
}

function dileet()
{
    var del_btn = document.getElementsByClassName("btn-danger");

    for(let i=0;i<del_btn.length; i++)
    {
        del_btn[i].addEventListener('click', function(){

            var id = del_btn[i].getAttribute("data-sid");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "php/delete.php", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = ()=>{
                if(xhr.status === 200)
                {
                    let sdiv = document.querySelector(".msg");
                    sdiv.classList.remove("d-none");
                    sdiv.innerHTML = "<div class='container bg-light rounded text-center text-danger border border-danger p-3 w-50'>" + xhr.response +"</div>";
                    setTimeout(hide, 3000);
                    function hide()
                    {
                        sdiv.classList.add("d-none");
                    }
                    retrieve();
                }
                else
                {
                    console.log("Error deleting data.");
                }
            }
            var myData = { sid:id };
            var data = JSON.stringify(myData);
            xhr.send(data);
        });
    }


    // btn = Array.from(del_btn);
    // btn.forEach(btns =>{
    //     // console.log(btns);
    //     btns.addEventListener('click', ()=>{
    //         let id = btns.getAttribute("data-sid");

    //         let xhr = new XMLHttpRequest();
    //         xhr.open("POST", "php/delete.php", true);
    //         xhr.setRequestHeader("Content-Type", "application/json");
    //         xhr.onload = () => {
    //             if(xhr.status === 200)
    //             {
    //                 let sdiv = document.querySelector(".msg");
    //                 sdiv.innerHTML = "<div class='container bg-light rounded text-center text-danger border border-danger p-3 w-50'>" + xhr.response +"</div>";
    //                 setTimeout(hide, 3000);
    //                 function hide()
    //                 {
    //                     sdiv.classList.add("d-none");
    //                 }
    //             }
    //             else
    //             {
    //                 console.log("Something wrong while deleting data.");
    //             }
    //         }
    //         let myData = { sid:id };
    //         data = JSON.stringify(myData);
            
    //         xhr.send(data);
    //     });
    // });
}
dileet();

function edit()
{
    let editBtn = document.getElementsByClassName("btn-warning");

    let bt = Array.from(editBtn);

    bt.forEach(edbt =>{
        edbt.addEventListener('click', function()
        {
            let sid = document.querySelector("#id");
            let fn = document.querySelector("#fname");
            let ln = document.querySelector("#lname");
            let em = document.querySelector("#inputEmail4");
            let ps = document.querySelector("#inputPassword4");
            let id = edbt.getAttribute("data-sid");
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "php/edit.php", true);
            xhr.responseType = "json";
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = () => {
                if(xhr.status === 200)
                {
                    let a = xhr.response;
                    sid.value = a.id;
                    fn.value = a.fname;
                    ln.value = a.lname;
                    em.value = a.mail;
                    ps.value = a.password;
                }
                else
                {
                    console.log("Something wrong with status.");
                }
            }
            let data = { sid:id };
            let myData = JSON.stringify(data);
            xhr.send(myData);
        });
    });
}
edit();

function update()
{

    let id = document.querySelector("#id").value;
    let fn = document.querySelector("#fname").value;
    let ln = document.querySelector("#lname").value;
    let em = document.querySelector("#inputEmail4").value;
    let ps = document.querySelector("#inputPassword4").value;

    if(fn == "" || ln == "" || em == "" || ps == "")
    {
        alert('Please fill out the empty fields.')
    }
    else if(fnameErr.textContent.length>0 || lnameErr.textContent.length>0 || mailErr.textContent.length>0 || passErr.textContent.length>0)
    {
        alert('Please clear all error before submission.');
    }
    else
    {
        let xhr = new XMLHttpRequest();

        xhr.open("POST", 'php/update.php', true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if(xhr.status===200)
            {
                let form = document.querySelector("#faram");
                let div = document.querySelector("#div");
                fname.classList.remove("border-success");
                fname.classList.remove("border-2");
                lname.classList.remove("border-success");
                lname.classList.remove("border-2");
                mail.classList.remove("border-success");
                mail.classList.remove("border-2");
                pass.classList.remove("border-success");
                pass.classList.remove("border-2");
                div.className = "d-none";
                form.reset();
                fname.focus();
                let sdiv = document.querySelector(".msg");
                sdiv.classList.remove("d-none");
                sdiv.innerHTML = "<div class='container bg-light rounded text-center text-success border border-success p-3 w-50'>" + xhr.response +"</div>";
                setTimeout(hide, 3000);
                function hide()
                {
                    sdiv.classList.add("d-none");
                }
                retrieve();
            }
            else
            {
                console.log("Error Status");
            }
        }
        let myData = { sid: id, fname: fn, lname: ln, mail: em, password: ps};
        let data = JSON.stringify(myData);

        xhr.send(data);
    }
}