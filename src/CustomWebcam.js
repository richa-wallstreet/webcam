import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react"; // import useCallback
import axios from 'axios';

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [preview, setPreview] = useState([]);
  const fileobj= [];

  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
   
  }, [webcamRef]);

  const remove = () => {
    setImgSrc(null);
  }

  const submit = (event) => {

    event.preventDefault();

    const data = {
        imgSrc: imgSrc
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { imgSrc })
      .then(res => {
        console.log(res);
      })
}

const changedHandler = event => {
    let files = event.target.files;
    fileobj.push(files);
    let reader;

    for (var i = 0; i < fileobj[0].length; i++) {
        reader = new FileReader();
        reader.readAsDataURL(fileobj[0][i]);
        reader.onload = event => {
        preview.push(event.target.result);   // update the array instead of replacing the entire value of preview

        setPreview([...new Set(preview)]); // spread into a new array to trigger rerender
        } 
    } 
}



  return (
    <div className="container">
      {imgSrc ? (
        <><button onClick={remove}>Remove</button><img src={imgSrc} alt="webcam" /></>
      ) : <Webcam height={600} width={600} ref={webcamRef} />}
      
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>

      <div className="btn-container">
        <button onClick={(e) => submit(e)}>Submit</button>
      </div>

      <div className="btn-container">
      <input
                type="file"
                name="file"
                multiple
                onChange={changedHandler} />

            <div className="form-group multi-preview">
                {(preview || []).map((url, index) => (
                    <img src={url} alt="..." key={index} style={{ height: '200px', width: '200px' }} />
                ))}
            </div>
        
      </div>
    </div>
  );
};

export default CustomWebcam;