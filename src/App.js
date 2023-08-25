import React, { useEffect, useState } from 'react';
import './style.css'; // เพิ่ม import ไฟล์ CSS

const App = () => {
  const [pictureUrl, setPictureUrl] = useState('');
  const [userId, setUserId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function initLIFF() {
      const liff = window.liff;
      await liff.init({ liffId: '2000437027-4a62GGMl' });

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile();
        setPictureUrl(profile.pictureUrl);
        setUserId(profile.userId);
        setStatusMessage(profile.statusMessage);
        setDisplayName(profile.displayName);
        setEmail(liff.getDecodedIDToken().email);
      } else {
        liff.login();
      }
    }

    initLIFF();
  }, []);

  const logOut = () => {
    const liff = window.liff;
    liff.logout();
    window.location.reload();
  };

  // const sendData = () => {
  //   const data = {
  //     userId: userId,
  //     displayName: displayName,
  //   };

  //   const url = 'https://dc97-49-0-82-121.ngrok-free.app/webhook/';

  //   const xhr = new XMLHttpRequest();
  //   xhr.open('PUT', url, true);
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.send(JSON.stringify(data));
  // };

  return (
    <div className="app-container">
      <img id="pictureUrl" src={pictureUrl} alt="Profile" />
      <p>
        <b>User Id :</b> {userId}
      </p>
      <p>
        <b>Display Name :</b> {displayName}
      </p>
      <p>
        <b>Status Message :</b> {statusMessage}
      </p>
      <p>
        <b>Email :</b> {email}
      </p>
      <button id="btnLogout" onClick={logOut}>
        Logout
      </button>
      {/* <button id="btnSend" onClick={sendData}>
        Send to Webhook
      </button> */}
    </div>
  );
};

export default App;
