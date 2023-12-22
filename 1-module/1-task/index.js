function factorial(n) {
let reslut = 1;
if(n===0||n===1){
return reslut;
}
for (let i=1; i<=n; i++){
  reslut = reslut * i;
}
return reslut;
}
