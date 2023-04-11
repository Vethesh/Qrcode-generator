import React, { useState } from "react";

const Card = () => {
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qr, setQr] = useState();
  const [loading, setLoading] = useState(false);
  // const[finaldata,setFinaldata]=useState({qid:0,Name:""})
  let id = 100;
  const getQrcode = async e => {
    e.preventDefault();
    try {
      id++;
     console.log(id);
      setLoading(true);
      // setFinaldata({finaldata.qid:id ,finaldata.Name:data})
      const res = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${data}|${email}|${phone}`
        
      );
       console.log(id);
      setQr(res.url);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <form className="form" onSubmit={getQrcode}>
          <h1 className="title">Qr Code Generator</h1>
          <input
            type={"text"}
            value={data}
            onChange={e => {
              setData(e.target.value);
            }}
            placeholder={"Enter the Data "}
          />
          <input
            type={"text"}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            placeholder={"Enter the email"}
          />
          <input
            type={"text"}
            value={phone}
            onChange={e => {
              setPhone(e.target.value);
            }}
            placeholder={"Enter the phoneNo "}
          />
          {loading && (
            <div className="loading">
              <span></span>loading...
            </div>
          )}
          {!loading &&
            (qr ? (
              <img src={qr} alt="qrcode" className="qrcode" />
            ) : (
              <div className="loading">Generate Qrcode for Unique Id</div>
            ))}

          <input
            type={"submit"}
            value={"Generate Qr code"}
            className="submit"></input>
        </form>
      </div>
    </>
  );
};

export default Card;
