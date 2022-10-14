console.log("Welcome to MusicGeek");
//initialize the variables
let songindex=0;
let audioElement= new Audio('songs/1.mp3');
let masterplay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar');
let gif=document.getElementById('gif');
let mastersongname=document.getElementById('mastersongname');
let songitems=Array.from(document.getElementsByClassName('songitem'));
let songs=[
    {songName:"Thousand Years",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Ankhon se Batana",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"It's You",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Bellyache",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Like my Father",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Akhiyan",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Sage",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"Jipaal",filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    {songName:"Hall of Fame",filePath:"songs/9.mp3",coverPath:"covers/9.jpeg"},
    {songName:"All I Want",filePath:"songs/10.mp3",coverPath:"covers/10.jpg"},
]

songitems.forEach((element,i)=>{
  console.log(element,i);
  element.getElementsByTagName("img")[0].src=songs[i].coverPath;
  element.getElementsByClassName("songname")[0].innerText=songs[i].songName;
})

// audioElement.play();

//handle play pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currenttime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
    }
)
//listen to events
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
})
myprogressbar.addEventListener('click',()=>{
    audioElement.currentTime=myprogressbar.value * audioElement.duration/100;
})

const makeallplay=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
      makeallplay();
      songindex=parseInt(e.target.id);
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      audioElement.src=`songs/${songindex+1}.mp3`;
      mastersongname.innerText=songs[songindex].songName;
      audioElement.currentTime=0;
      audioElement.play();
      gif.style.opacity=1;
      masterplay.classList.remove('fa-play-circle');
      masterplay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=9){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    mastersongname.innerText=songs[songindex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    mastersongname.innerText=songs[songindex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})