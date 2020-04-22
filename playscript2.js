
var buttons = document.querySelector(".buttons")
buttons.innerHTML = '<button id="start">Start</button>';
document.querySelector('#start').addEventListener('click',cstart);
function cstart(){document.querySelector('#start').remove(); start();}
let n;
var d = new Date();
let score =0;
function endgame()
{
    let cond=document.querySelector("#container")
    cond.innerHTML= ` Game Over <br> Score : ${score} <br> <form id="infostore"><label>Name</label><input type="text" name="name" placeholder="Enter Name"> <button type="submit" id="submit">Submit</button></form>`;
    
}
function play(n)
{   console.log('play reached')
    class svg
    {
         constructor(x,y,z)
    {   
        this.id = x;
        this.a = y;
        this.b = z;
    }
    }
    let as = new Array(n*n+1);
    as[0] = new svg(0,true,0);

    for(let i=1; i<=n*n;i++)
    {   
        as[i]= new svg(i,false,1);
        if(i<n*n){
        document.querySelector(`#s${i}`).addEventListener('click',func(as[i-1],as[i]));
        }
        if(i==n*n){document.querySelector(`#s${i}`).addEventListener('click',funce(as[i-1],as[i]));}
    }
    let g = new svg(0,true,0);
    let h = new svg(1,true,1);
    function func(g,h)
    {
        if(g.a=true)
        {   
            let k = document.querySelector(`#s${h.id}`);
            let l = document.querySelector(`#t${h.id}`);
            l.textContent = '';
            k.id= `p${h.id}`;
            g.a=false;
            h.a= true;
            h.b = d.getTime();
            let time = h.b - g.b;
            if(n==5)
            {score+= Math.floor(250000/time);}
            else if(n==7)
            {score+= Math.floor(490000/time);}
            else{ score+= Math.floor(640000/time);}
        }
    }
    function funce(g,h)
    {
        if(g.a=true)
        {   
            console.log(`${h.id}clicked`);
            let k = document.querySelector(`#s${h.id}`);
            k.id= `p${h.id}`;
            g.a=false;
            h.a= false;
            h.b = d.getTime();
            let time = h.b - g.b;
            if(n==5)
            {score+= Math.floor(250000/time);}
            else if(n==7)
            {score+= Math.floor(490000/time);}
            else{ score+= Math.floor(640000);}
            endgame();
            }
        }

}
function grid(p)
{   
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
            document.querySelector(`#as${b[k]}`).innerHTML = `<svg width="70" height="70" class="s${q}" id="s${b[k]}"><rect x="0" y="0" width="70" height="70" style="fill:rgb(${co},${co},${co});stroke:black;stroke-width:5;opacity:1"/><text id="t${b[k]}" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" color="white">${b[k]}</text></svg>` ;
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
{
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

