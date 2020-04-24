
var buttons = document.querySelector(".buttons")
buttons.innerHTML = '<button id="start">Start</button>';
document.querySelector('#start').addEventListener('click',cstart);
function cstart(){document.querySelector('#start').remove(); start();}
let n;

let score =0;
let playtime = 0;
let ice = false;
let ft=0;
assigntable();
function endgame(n)
{   
    document.querySelector('#reset').remove();
    document.querySelector('#td').innerHTML = '';
    score = Math.floor((Math.pow(n,3))*10000000/((score/n*n)));

    let cond=document.querySelector("#container")
    cond.innerHTML= ` <div id="endgame">Game Over <br> Score : ${score} <br> Play Time : ${playtime}s <br> <button id="replay">Play Again</button><br> <form id="infostore"><label>Name</label><input type="text" id="name" name="name" placeholder="Enter Name"> <br><br><button type="submit" id="submit">Submit</button></form></div> `;
    document.querySelector('#infostore').addEventListener('submit',save);
    document.querySelector('#replay').addEventListener('click',cxreset);
    function save(e)
    {   
        if (typeof(Storage) !== "undefined")
        {
        var k = document.querySelector('#name').value;
        if(k!=='')
        {
        e.preventDefault();
        document.querySelector('#replay').style.visibility = 'visible';
        let a = localStorage.getItem("name1");
        if(a==null)
        {
            localStorage.setItem("name1",k);
            localStorage.setItem("score1",score);
            localStorage.setItem("n",1);
            document.querySelector('#infostore').remove();
            
           
        }else if(localStorage.getItem("n")<5)
        {
            let sb = localStorage.getItem("n");
            sb++;
            localStorage.setItem("n",sb);
            for(let i=1;i<sb;i++)
            {
                if(score>localStorage.getItem(`score${i}`))
                {
                    for(let j=sb;j>i;j--)
                    {   let r= j-1;
                        let sp = localStorage.getItem(`score${r}`);
                        let np = localStorage.getItem(`name${r}`);
                        console.log(np,'swapped with',sp);
                        localStorage.setItem(`score${j}`,sp);
                        localStorage.setItem(`name${j}`,np);
                    }
                    localStorage.setItem(`score${i}`,score);
                    localStorage.setItem(`name${i}`,k);
                    break;
                }else{
                    localStorage.setItem(`score${sb}`,score);
                    localStorage.setItem(`name${sb}`,k);
                }
            }
            document.querySelector('#infostore').remove();

        }else
        {
            for(let i=1;i<6;i++)
            {
                if(score>localStorage.getItem(`score${i}`))
                {
                    for(let j=5;j>i;j--)
                    {   
                        let r= j-1;
                        let sp = localStorage.getItem(`score${r}`);
                        let np = localStorage.getItem(`name${r}`);
                        console.log(np,'swapped with',sp);
                        localStorage.setItem(`score${j}`,sp);
                        localStorage.setItem(`name${j}`,np);
                    }
                    localStorage.setItem(`score${i}`,score);
                    localStorage.setItem(`name${i}`,k);
                    document.querySelector('#infostore').remove();
                    break;
                }
            }
        }
    }else{alert('Score Not Saved')}  
}else{
    setTimeout(function(){ document.querySelector('#container').innerHTML = 'Score Cannot be Saved' },3000);
}
        for(let m=1;m<6;m++)
        {
            console.log(localStorage.getItem(`score${m}`),localStorage.getItem(`name${m}`));
        }
    }
}
var sound = new Audio()
sound.src="tick.mp3"
function pt()
    {   
        
        
        if(ice)
        {
            setTimeout(pt,1000);
            ft+=1;
            document.querySelector('#td').innerHTML = `${ft}s`
         }
         else{ 
             
             ft= 0;
            document.querySelector('#td').innerHTML = ''
        }
    }
function play(n)
{   
    let d = new Date();
    score = 0;
    let td=d.getTime();
    ice = true;
    pt();
    console.log('play reached');
    
 
    let sot=new Array(n*n);
    sot = document.querySelectorAll('.s');
    let tos = new Array(n*n);
    tos = document.querySelectorAll('.t');
    for(let w=0; w<n*n;w++)
    {   let v = [];
        v = sot[w].id.split("");
        let i = parseInt(`${v[1]}${v[2]}`);
        console.log(i);
        sot[w].addEventListener('click',func,disp,sound.play());
        function disp(){
            console.log(`${i}assigned`);
        }
        function func()
    {   let d = new Date();
        sound.play()
        let p = document.querySelector(`#t${i}`)
        if(i==1)
        {   
            let k= document.querySelector(`#s${i}`);
            console.log(`${1}clicked`);
            document.querySelector('#last').innerHTML = `<svg width="50" height="50" id="x"><rect x="0" y="0" width="50" height="50" style="fill:white;stroke:black;stroke-width:5;opacity:1"/><text id="x" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" color="white">${i}</text></svg>` ;
            p.textContent = '';
            score += d.getTime() -td;
            td= d.getTime();
            
        }
        else if(i==n*n)
        {   let u = document.querySelector(`#t${i-1}`).textContent;
        if(u==='') 
            {
                let k= document.querySelector(`#s${i}`);
            console.log(`${n*n}clicked`);
            document.querySelector('#last').innerHTML = '';
            p.textContent = '';
            playtime = ft;
            ice =false;
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
            document.querySelector('#last').innerHTML = `<svg width="50" height="50" id="x"><rect x="0" y="0" width="50" height="50" style="fill:white ;stroke:black;stroke-width:5;opacity:1"/><text id="x" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" color="white">${i}</text></svg>` ;
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
    for(let i=0; i<=10000;i++)
    {   
        let j= Math.floor(Math.random()*10)+1
        if(a[i]>j)
        {
            let c;
            c = b[a[i]];
            b[a[i]]=b[a[i]-j];
            b[a[i]-j]=c;
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
            let g=0;
            if(p==4)
            {
                 g = 70;
            }else if(p==5)
            {
                 g = 60;
            }else{ 
                 g=50;
            }
            pk.style.display = "inline";
            pk.style.border = " 0px black";
            pk.style.borderWidth = "2px";
            let co = 200 - parseInt(b[k], 10)*1.5 ;
            document.querySelector(`#gridline${j}`).appendChild(pk) ;
            document.querySelector(`#as${b[k]}`).innerHTML = `<svg width="${g}" height="${g}"class="s" class="s${q}" id="s${b[k]}"><rect x="0" y="0" width="${g}" height="${g}" style="fill:rgb(${co},${co},${co});stroke:black;stroke-width:5;opacity:1"/><text class ="t" id="t${b[k]}" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" color="white">${b[k]}</text></svg>` ;
        }
    }

    buttons.innerHTML = '<button id="reset">Reset</button>';
    document.querySelector('#reset').addEventListener('click',creset);
    play(p);
    
}
function creset()
    { 
        document.querySelector('#td').innerHTML = '';
    document.querySelector('#reset').remove();
    document.querySelector("#container").innerHTML='';
    start();
    document.querySelector('#last').innerHTML= '';
    ice=false;
    }
 
    function cxreset()
    { 
        document.querySelector('#td').innerHTML = '';
        ice=false;
    document.querySelector("#container").innerHTML='';
    document.querySelector('#last').innerHTML= '';
    start();
    }

function start()
{   
   
    document.querySelector('#container').style.visibility = 'hidden';
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
    
    document.querySelector('#difficulty').innerHTML = '<label>Difficulty</label> <select name="difficulty" id="select"><option value="4">Easy</option><option value="5">Medium</option><option value="6">Difficult</option></select> <button id="play">Play</button>';
    document.querySelector('#play').addEventListener('click',saydif);

}
let tva=false;
document.querySelector('#view').addEventListener('click',jip);
function assigntable()
{   document.querySelector('#table').innerHTML = '<table id="dichuu"><tr><th>Place</th><th>Name</th><th>Score</th></tr></table>'
    let n = localStorage.getItem('n');
    let tb = document.querySelector('#dichuu')
    for(let i=0;i<n;i++)
    {
        let p = tb.insertRow(i+1);
        let cell1 = p.insertCell(0);
        let cell2 = p.insertCell(1);
        let cell3 = p.insertCell(2);
        cell1.innerHTML = `${i+1}`;
        cell2.innerHTML = `${localStorage.getItem(`name${i+1}`)}`;
        cell3.innerHTML = `${localStorage.getItem(`score${i+1}`)}`;
    }
}
function jip()  
{
    if(tva==false)
    {
        document.querySelector('#table').style.visibility = 'visible';
        tva=true;
    }else
    {
        document.querySelector('#table').style.visibility = 'hidden';
        tva=false;
    }

}
document.querySelector('#ins').addEventListener('mouseover',funco);
function funco()
{
    document.querySelector('#inst').style.visibility = 'visible';
    setTimeout(function(){document.querySelector('#inst').style.visibility = 'hidden'},5000);
}
