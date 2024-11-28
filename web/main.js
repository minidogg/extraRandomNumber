async function getMedia(constraints) {
    let stream = null;
  
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Success")
      /* use the stream */

        return stream
    } catch (err) {
        console.error(err)
      /* handle the error */
    }
  }


  let injectNum = 0; // Number that will be sourced into helping generate the random numbers
  function BetterMathRandom(){
    return Math.abs(Math.cos(injectNum+Math.random()))
  }
  function randInt(min, max) {
    return Math.floor(BetterMathRandom() * (max - min) ) + min;
  }
  

  async function main(){
    let stream = await getMedia({
        audio: false,
        video: true,
    })
    var video = document.createElement("video")
    video.controls = true
    video.srcObject = stream
    document.body.appendChild(video)
    window.addEventListener("click", ()=>{
        video.play()
    })

    var canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")

    var snap = async() => {


      ctx.drawImage(video, 0, 0, 640, 480);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const reduced = pixels.reduce((v,c)=>v=Math.sin((v+c)%1000000000000000))
      console.log(reduced)
      
      injectNum = reduced
    }
    
    setInterval(() => {
      snap()
    }, 10);
    snap()
  }

  main()

  document.getElementById("gen").addEventListener("click", ()=>{
    let min = parseInt(prompt("Min integer"))
    let max = parseInt(prompt("Max integer"))
    let out = randInt(min, max)

    alert(out)
  })