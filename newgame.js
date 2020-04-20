
for(let j=0;j<5;j++)
{
    for(let i=0;i<8;i++)
    {   
        let k=  j*8+i+1;
        document.querySelector(`.as${k}`).innerHTML = `<svg width="75" height="75" id="s${k}">
        <rect x="0" y="0" width="75" height="75"
        style= "stroke="black" stroke-width="4" fill="white" "/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${k}</text>
      </svg>`;
    }
}
var d = new Date();
let presscount = 0;
let score=0;
function endgame(){
    console.log('endgame started');
    document.querySelector('#border').style.visibility = "hidden";
    document.querySelector('#replay').style.visibility ="visible";
    document.querySelector('.msg').innerHTML= 'Game Over';
    document.querySelector('#score').innerHTML = `Score = ${score}`;
    console.log('end game executed');
}
class As{
    contructor(g,t){
    
    this.g=g;
    this.t=t;
    console.log('class created');
    
}
}
var as = new Array(41);
for(let v=1 ; v<=40 ;v++){
    as[v]= new As(false,1);
    console.log('array created with default values');
}
let p = new As(true,0);
console.log(p);
as[0]= new As(true,0);
console.log(as[0]);
let r= new As(true,1);
console.log(r);
for(let s=0;s<40;s++)
{   
    console.log('initiated what to do for click');
    let m= s+1;
    document.querySelector(`#s${m}`).addEventListener("click",myfunc(as[m],as[s]));
}
document.querySelector(`#s40`).addEventListener("click",myfunce(as[40],as[39]));
function myfunc(r,p)
{
    presscount++;
    if(p.g && presscount==1)
        {
           console.log('my func exercuted');
            r.g=true;
            p.g=false;
            presscount--;
            r.t = d.getTime();
        
            let time = r.t -p.t;
            score= score + 100000/(time);
        }
    else
        {
            endgame();
        }
 }
function myfunce(r,p)
{
    presscount++;
    if(p.g && presscount==1)
        {
            console.log('lastfunc');
            p.g=false;
            presscount--;
            r.t = d.getTime();
        
            let time = r.t -p.t;
            score= score + 100000/(time);
            endgame();
        }
    else
        {   
            endgame();
        }
}

function start()
{   
    console.log('start started');
    document.querySelector('#border').style.visibility = "visible";
    document.querySelector('#replay').style.visibility ="hidden";
    document.querySelector('.as0').style.visibility = "hidden";
    as[0].t= d.getTime();
    console.log(as[0].t);
    
    score=0;
}

document.querySelector('.as0').addEventListener("click",start);
document.querySelector('#replay').addEventListener("click",start);


