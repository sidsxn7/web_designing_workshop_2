function result(){
    let n=parseInt(document.getElementById("subj").value);
    let total =0;
    for (let i=1; i<=n; i++){
        let marks=parseFloat(prompt("Enter marks of subject "+i));
        total+=marks;
    }
    let avg=total/n;
    let grade;
    let result;
    if(avg>=90){
        grade="A+";
        result="Pass";}
    else if(avg>=80){
        grade="A";
        result="Pass";}
    else if(avg>=70){
        grade="B";
        result="Pass";}
    else if(avg>=50){
        grade="C";
        result="Pass";}
    else if(avg>=33){
        grade="D";
        result="Pass";}
    else{
        grade="F";
        result="Fail";}
    document.getElementById("result").innerHTML="Total Marks :"+total+"<br>"+
    "Average Marks:"+avg.toFixed(2)+
    "<br>"+"Grade: "+grade+"<br>"+"Result: "+result;
}