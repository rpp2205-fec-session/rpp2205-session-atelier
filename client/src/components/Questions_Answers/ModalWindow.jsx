import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import withClickData from '../hoc_click_data.jsx';
import config from './config.js';

const ModalWindow = (props) => {
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [hasError, setHasError] = useState(true);
  const [uploadedImagesUrl, setUploadedImagesUrl] = useState([]);
  const [uploadCounts, setUploadCounts] = useState(0);

  const handleUploadPhotos = (files) => {
    let formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', config.CLOUD_PRESET);

    axios.post(`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/image/upload`, formData)
    .then(response => {
      let url = response.data.secure_url;
      setUploadedImagesUrl(uploadedImagesUrl.concat(url));
      setUploadCounts(uploadCounts + 1);
    })
    .catch(err => {
      console.log('failed to upload the image');
    })
  }

  const handleAnswerChange = (value) => {
    setAnswer(value);
  }
  const handleQuestionChange = (value) => {
    setQuestion(value);
  }
  const handleNickNameChange = (value) => {
    setNickname(value);
  }
  const handleEmailChange = (value) => {
    setEmail(value);
  }
  const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  const validateUserInput = () => {
    let isAnswerValid = answer.length !== 0;
    let isQuestionValid = question.length !== 0;
    let isNicknameValid = nickname.length !== 0;
    let isEmailValid = email.length !== 0 && validateEmail(email) !== null;
    let totalValid = (isAnswerValid || isQuestionValid) && isNicknameValid && isEmailValid;

    return totalValid
  }

  const submitForm = (e) => {
    props.interaction(e.target);
    if (validateUserInput()) {
      if (answer.length !== 0) {
        axios.post(`/qa/questions/${props.questionId}/answers`, {
          body: answer,
          name: nickname,
          email: email,
          photos: uploadedImagesUrl
        })
        .then(data => {
          console.log('The form is sent to API successfully')
        })
        .catch(err => {
          console.log('Failed to send the form')
        })
      } else {
        axios.post(`qa/questions`, {
          body: question,
          name: nickname,
          email: email,
          product_id: props.productId
        })
        .then(data => {
          console.log('The form is sent to API successfully');
        })
        .catch(err => {
          console.log('Failed to send the form')
        })
      }
    }
  }

  const getInvalidFields = () => {
    let fields;

    if (props.questionBody !== undefined) {
      fields = [['answer', answer.length !== 0], ['nickname', nickname.length !== 0], ['email', isEmailValidated]];
    } else {
      fields = [['question', question.length !== 0], ['nickname', nickname.length !== 0], ['email', isEmailValidated]];
    }

    return fields.filter(field => {
      if (field[1] === false) {
        return field[0];
      }
    });
  }

  return (
    <div className="modal_container">
      <div className="modal_content">
        <span className="modal_close" onClick={props.closeForm}>&times;</span>
        {props.questionBody !== undefined ? <h2>Submit your Answer</h2> : <h2>Ask Your Question</h2>}
        {props.questionBody !== undefined ? <h4>{props.productName}: {props.questionBody}</h4> : <h4>About the {props.productName}</h4>}
        {props.questionBody !== undefined ?
          <div className="answer_body">
            <label className="label_answer" htmlFor="answer">Your Answer</label>
            <input className="text_answer" maxLength="1000" onChange={(e) => handleAnswerChange(e.target.value)} name="answer" />
          </div> :
          <div>
            <label className="label_question" htmlFor="question">Your Question</label>
            <input className="text_question" maxLength="1000" onChange={(e) => handleQuestionChange(e.target.value)} name="question" />
          </div>
        }
        <label className="label_nickname" htmlFor="nickname">What is your nickname?</label>
        <input
          className="nickname"
          placeholder={props.questionBody !== undefined ? "Example: jack543!" : "jackson11!"}
          name="nickname"
          maxLength="60"
          onChange={(e) => handleNickNameChange(e.target.value)} />
        <p className="sub_text">For privacy reasons, do not use your full name or email address</p>
        <label htmlFor="email" className="label_email">Your Email</label>
        <input
          className="email"
          onChange={(e) => handleEmailChange(e.target.value)}
          name="email"
          placeholder="Example: jack@email.com"/>
        <p className="sub_text">For authentication reasons, you will not be emailed</p>
        {props.questionBody !== undefined && uploadCounts < 5 &&
          <div className="upload_button">
            <label className="upload_text">
            <input type="file" onChange={(e) => handleUploadPhotos(e.target.files)} multiple/>Upload your photos
            </label>
          </div>
        }
        {uploadedImagesUrl.map(url => (
          <img key={url} src={url} className="upload_image"/>
        ))}
        <button
          className="submit_button"
          onClick={submitForm}>
          {props.questionBody !== undefined ? 'Submit answer' : 'Submit question'}
        </button>
        {hasError ? <div className="sub_text">You must enter the following: {getInvalidFields().map(f => <li key={f}>{f}</li>)}</div> : <></>}
      </div>
    </div>
  )
}

export default withClickData(ModalWindow, 'questions_answers');
