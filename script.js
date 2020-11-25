const space = document.getElementsByClassName('space')

space[0].addEventListener('click', doTheThing)
space[1].addEventListener('click', doTheThing)
space[2].addEventListener('click', doTheThing)

space[3].addEventListener('click', doTheThing)
space[4].addEventListener('click', doTheThing)
space[5].addEventListener('click', doTheThing)

space[6].addEventListener('click', doTheThing)
space[7].addEventListener('click', doTheThing)
space[8].addEventListener('click', doTheThing)

let array=[0,0,0, 0,0,0, 0,0,0]

let lines=[[0,1,2], [3,4,5], [6,7,8], 
[0,3,6], [1,4,7], [2,5,8], 
[0,4,8], [2,4,6]]



function doTheThing(index){
  if(!array[index]){
    array[index]='o'
    space[index].innerHTML='o'

    let ao
    let ax
    let done=false
    for(let i=0; i<8; i++){
      let a=[]
      for(let j=0; j<=2; j++){
        a.push(array[lines[i][j]])
      }
      ao=0
      ax=0
      for(let j=0; j<=2; j++){
        if(a[j]==='o'){
          ao++
        }
        if(a[j]==='x'){
          ax++
        }
      }
      
      if(ao===2&&ax===0){
        for(let j=0; j<=2; j++){
          if(!a[j]){
            a[j]='x'
            array[lines[i][j]]='x'
            space[lines[i][j]].innerHTML='x'
          }
        }
        done=true
      }
      for(let j=0; j<=2; j++){
        array[lines[i][j]]=a[j]
      }
      if(ao===2&&ax===0){
        i=9
      }
    }
    console.log(done);

    if(!done){
      if(array[4]!==0){
        let allChoices=[]
        for(let i=0; i<8; i++){
          for(let j=0; j<=2; j++){
            if(lines[i].includes(index, j)){
              for(let y=0; y<=2; y++){
                allChoices.push(lines[i][y])
              }
            }
          }
        }
        console.log('allChoices');
  
        console.log(allChoices);
        console.log('choices');
  
        
        var choices = allChoices.reduce(function(a,b){
          if (a.indexOf(b) < 0 ) a.push(b);
          return a;
        },[]);
        
  
        for(let i=0; i<choices.length-1; i++){
          if(choices[i]===index*1){
            choices.splice(i, 1);
          }
        }

        let filteredC=[]

        for(let i=0; i<choices.length; i++){
          if(array[choices[i]]===0){
            filteredC.push(choices[i])
          }
        }
        
        console.log(filteredC);
  
        let whichOne=Math.floor(Math.random() * filteredC.length)
  
        array[filteredC[whichOne]]='x'
        space[filteredC[whichOne]].innerHTML='x'
        console.log('----------');
        console.log(filteredC[whichOne]);
        console.log('----------');


      }
      else{
        array[4]='x'
        space[4].innerHTML='x'
      }
    }
  }
  if(win()){
    alert("YOU WIN (reload page)");
  }
  if(loss()){
    alert("YOU LOSE (reload page)");
  }
  if(tie()){
    alert("TIE (reload page)");
  }
}

function win(){
  let counter
  let trigger=false
  for(let i=0; i<8; i++){
    counter=0
    for(let j=0; j<2; j++){
      if(array[lines[i][j]]==='o'){
        if(array[lines[i][j]]===array[lines[i][j+1]]){
          counter++
        }
      }
    }
    if(counter===2&&!trigger){
      trigger=true
    }
  }
  if(trigger){
    return true
  }
}


function loss(){
  let counter
  let trigger=false
  for(let i=0; i<8; i++){
    counter=0
    for(let j=0; j<2; j++){
      if(array[lines[i][j]]==='x'){
        if(array[lines[i][j]]===array[lines[i][j+1]]){
          counter++
        }
      }
    }
    if(counter===2&&!trigger){
      trigger=true
    }
  }
  if(trigger){
    return true
  }
}

function tie(){
  let counter=0
  for(let i=0; i<8; i++){
    if(array[i]){
      counter++
    }
  }
  if(counter>=8){
    return true
  }
}