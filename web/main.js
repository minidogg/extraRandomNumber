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


  async function main(){
    let stream = await getMedia({
        audio: false,
        video: true,
    })
    var video = document.createElement("video")
    video.controls = true
    video.srcObject = stream
    document.body.appendChild(video)

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
    }
    
    setInterval(() => {
      snap()
    }, 100);
    snap()
  }

  main()