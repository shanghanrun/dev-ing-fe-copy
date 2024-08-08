import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import '../style/forgetPassword.style.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import userStore from '../store/userStore';
import uiStore from './../store/uiStore';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const { findUser,forgetPassword,setNewPassword } = userStore();
    const {showToastMessage} = uiStore();
    const [ nickName, setNickName ] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ activeTab, setActiveTab ] = useState('name');
    const [ isShowPassword, setIsShowPassword ] = useState(false);
    const [ isShowConfirmPassword, setIsShowConfirmPassword ] = useState(false);
    
    const findPassword = () => {
        console.log('findPassword 시작')
        if(activeTab === 'name') {
            if(nickName === '') {
                showToastMessage('닉네임을 입력하세요', 'error')
            } else if(name === '') {
                showToastMessage('이름을 입력하세요', 'error')
            } else {
                forgetPassword(nickName, name, email)
            }
        } else {
            if(email === '') {
                showToastMessage('이메일을 입력하세요', 'error')
            } else {
                forgetPassword(nickName, name, email)
            }
        }
    }

    const setNewPassword2 = () => {
        if(password === '') {
            showToastMessage('변경할 비밀번호를 입력하세요', 'error')
            return;
        } 
        if(confirmPassword === '') {
            showToastMessage('비밀번호를 한번 더 입력해주세요', 'error')
            return;
        } 
        if(password !== confirmPassword) {
            showToastMessage('비밀번호가 일치하지 않습니다', 'error')
            return;
        }
        setNewPassword(findUser._id, password, navigate)
    }

    useEffect(()=>{
        if(activeTab === 'name') {
            setEmail('')
        } else {
            setName('')
            setNickName('')
        }
    },[activeTab])
    
    return (
        <div className='forget-password-outline'>
            <div className='forget-password-form'>
                <div className='title'>비밀번호 찾기</div>
                {findUser ? 
                <>
                    <div className='form-control mb-1'>
                        <input type={`${isShowPassword ? 'text' : 'password'}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='변경할 비밀번호를 입력하세요'/>
                        <FontAwesomeIcon className={`${isShowPassword ? 'eye-open' : 'eye-closed'}`} icon={isShowPassword ? faEye : faEyeSlash} onClick={() => setIsShowPassword(prev => !prev)}/>
                    </div>
                    <div className='form-control mb-1'>
                        <input type={`${isShowConfirmPassword ? 'text' : 'password'}`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='비밀번호를 다시 입력해주세요'/>
                        <FontAwesomeIcon className={`${isShowConfirmPassword ? 'eye-open' : 'eye-closed'}`} icon={isShowConfirmPassword ? faEye : faEyeSlash} onClick={() => setIsShowConfirmPassword(prev => !prev)}/>
                    </div>
                    <div className='send-btn' onClick={() => setNewPassword2()}>비밀번호 변경하기</div>
                </>
                :
                <>
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="mb-1"
                        activeKey={activeTab}
                        onSelect={(key) => setActiveTab(key)}
                        fill
                    >
                        <Tab eventKey="name" title="닉네임/이름으로 찾기">
                            <div className='form-control mb-1' ><input type='text' value={nickName} onChange={(e) => setNickName(e.target.value)} placeholder='닉네임을 입력하세요'/></div>
                            <div className='form-control' ><input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='이름을 입력하세요'/></div>
                        </Tab>
                        <Tab eventKey="email" title="이메일로 찾기">
                            <div className='form-control' ><input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='이메일을 입력하세요'/></div>
                        </Tab>
                    </Tabs>
                    <div className='send-btn' onClick={() => findPassword()}>찾기</div>
                </>
                }
            </div>
        </div>
        
    )
}

export default ForgetPassword