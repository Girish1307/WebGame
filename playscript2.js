
var buttons = document.querySelector(".buttons")
buttons.innerHTML = '<button id="start">Start</button>';
document.querySelector('#start').addEventListener('click',cstart);
function cstart(){document.querySelector('#start').remove(); start();}
let n;
let d = new Date();
let score =0;
let playtime = 0;
function endgame(n)
{   playtime = Math.floor(score/100)/10;
    score = Math.floor((1+0.3*n)*10000000/((score/n*n)));

    let cond=document.querySelector("#container")
    cond.innerHTML= ` Game Over <br> Score : ${score} <br> Play Time : ${playtime}s <br> <form id="infostore"><label>Name</label><input type="text" name="name" placeholder="Enter Name"> <br><button type="submit" id="submit">Submit</button></form>`;
    
}
function play(n)
{   let td=d.getTime();
    console.log('play reached')
    function playtime()
    {

    }
 
    let sot=new Array(n*n);
    sot = document.querySelectorAll('.s');
    let tos = new Array(n*n);
    tos = document.querySelectorAll('.t');
    for(let w=0; w<n*n;w++)
    {   let v = [];
        v = sot[w].id.split("");
        let i = parseInt(`${v[1]}${v[2]}`);
        console.log(i);
        sot[w].addEventListener('click',func,disp);
        function disp(){
            console.log(`${i}assigned`);
        }
        function func()
    {   let d = new Date();
        let p = document.querySelector(`#t${i}`)
        if(i==1)
        {   
            let k= document.querySelector(`#s${i}`);
            console.log(`${1}clicked`);
            p.textContent = '';
            score = d.getTime() -td;
            td= d.getTime();
            
           score = score + time;
        }
        else if(i==n*n)
        {   let u = document.querySelector(`#t${i-1}`).textContent;
        if(u==='') 
            {let k= document.querySelector(`#s${i}`);
            console.log(`${n*n}clicked`);
            p.textContent = '';
            score += d.getTime() -td;
            td= d.getTime();
            
            
            endgame(n);
    }
        }
        else if(i<n*n)
        {   
         let k= document.querySelector(`#s${i}`);
          let u = document.querySelector(`#t${i-1}`).textContent;
          if(u==='')  
          {
            console.log(`${i}clicked`);
            p.textContent = '';
            
            score += d.getTime() -td;
            td= d.getTime();
            
          }
        }
    }
        
    }
    
    
    
    
    

}
function grid(p)
{   
    document.querySelector('#container').style.visibility = 'visible';
    score = 0;
    let a = new Array(p*p+1);
    a[0]=8;

    for(let i=1;i<=p*p;i++)
    {   
        let rand= Math.floor(Math.random() * p*p) + 1;
        a[i]=rand;
    }
    let b = new Array(p*p+1);
    for(let i=0;i<=p*p;i++){ b[i]=i;}
    for(let i=0; i<=100;i++)
    {   
        if(a[i]!=1)
        {
            let c;
            c = b[a[i]];
            b[a[i]]=b[a[i]-1];
            b[a[i]-1]=c;
        }
        else{continue;}
    }
    console.log(b);
    for(let j=0;j<p;j++)
    {   
        let q=j%2;
        let sk= document.createElement("div");
        sk.classList.add(`line${q}`);
        sk.id= `gridline${j}`;
        sk.style.display = "block";
        document.querySelector("#container").appendChild(sk);

        for(let i=0;i<p;i++)
        {   
            let k=  j*p+i+1;
            let pk= document.createElement("div");
            pk.id= `as${b[k]}`;
            pk.style.display = "inline";
            pk.style.border = " 0px black";
            pk.style.borderWidth = "2px";
            let co = 200 - parseInt(b[k], 10)*1.5 ;
            document.querySelector(`#gridline${j}`).appendChild(pk) ;
            document.querySelector(`#as${b[k]}`).innerHTML = `<svg width="70" height="70"class="s" class="s${q}" id="s${b[k]}"><rect x="0" y="0" width="70" height="70" style="fill:rgb(${co},${co},${co});stroke:black;stroke-width:5;opacity:1"/><text class ="t" id="t${b[k]}" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" color="white">${b[k]}</text></svg>` ;
        }
    }

    buttons.innerHTML = '<button id="reset">Reset</button>';
    document.querySelector('#reset').addEventListener('click',creset);
    play(p);
    function creset()
    { 
    document.querySelector('#reset').remove();
    document.querySelector("#container").innerHTML='';
    start();
    }
}
 
function start()
{   document.querySelector('#container').style.visibility = 'hidden';
    var c= document.createElement("form");
    c.id = "difficulty";
    buttons.insertBefore(c,buttons.childNodes[1]);
    
    function saydif(e)
    {   
        
        e.preventDefault();
        console.log(document.querySelector('#select').options[document.querySelector('#select').selectedIndex].value);
        document.querySelector('#select').options[document.querySelector('#select').selectedIndex].value;
        n= document.querySelector('#select').options[document.querySelector('#select').selectedIndex].value;
        document.querySelector('#difficulty').remove();
        grid(n);
    }
    
    document.querySelector('#difficulty').innerHTML = '<label>Difficulty</label> <select name="difficulty" id="select"><option value="5">Easy</option><option value="7">Medium</option><option value="8">Difficult</option></select> <button id="play">Play</button>';
    document.querySelector('#play').addEventListener('click',saydif);
}

