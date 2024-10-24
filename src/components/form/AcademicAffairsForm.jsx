

import React, { useState } from 'react';
import { notification, Checkbox, Spin, Modal, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ReCAPTCHA from "react-google-recaptcha";
import naac from "../../assets/images/naac.png";
import cuimg from "../../assets/images/cuimg.png";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import './AcademicAffairsForm.css';


const { Dragger } = Upload;

const AcademicAffairsForm = () => {
    const [activeTab, setActiveTab] = useState('universityBody');
    const [formData, setFormData] = useState({
        universityBody: '',
        dateOfProposal: '',
        type: '',
        proposedBy: '',
        nameOfProposer: '',
        departmentOfProposer: '',
        natureOfEntity: '',
        studentName: '',
        studentId: '',
        studentMobileNumber: '',
        facultyEmail: '',
        facultyMobileNumber: '',
        employeeCode: ''
    });
    const [advisoryBoardData, setAdvisoryBoardData] = useState({
        student: {
            advisor1: { name: '', eid: '', phone: '' },
            advisor2: { name: '', eid: '', phone: '' },
        },
        faculty: {
            advisor1: { name: '', eid: '', phone: '' },
            advisor2: { name: '', eid: '', phone: '' },
            coAdvisor1: { name: '', eid: '', phone: '' },
            coAdvisor2: { name: '', eid: '', phone: '' }
        }
    });
    const [acknowledgement, setAcknowledgement] = useState({
        agreed: false,
        captchaValue: null,
        file: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeAdvisoryTab, setActiveAdvisoryTab] = useState('secretary');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAdvisoryBoardInputChange = (role, index, field, value) => {
        setAdvisoryBoardData(prevState => ({
            ...prevState,
            [role]: prevState[role].map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleAdvisoryTabClick = (tab) => {
        setActiveAdvisoryTab(tab);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!acknowledgement.agreed) {
            notification.error({
                message: 'Acknowledgement Required',
                description: 'Please acknowledge the form submission by checking the box.',
            });
            return;
        }
        if (!acknowledgement.captchaValue) {
            notification.error({
                message: 'CAPTCHA Required',
                description: 'Please complete the CAPTCHA verification.',
            });
            return;
        }
        if (!acknowledgement.file) {
            notification.error({
                message: 'File Required',
                description: 'Please upload a file.',
            });
            return;
        }
        setIsLoading(true);
        setIsModalVisible(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsModalVisible(false);
            notification.success({
                message: 'Form Submitted',
                description: 'Your form has been successfully submitted.',
            });
        }, 5000);
    };

    const handleAcknowledgementChange = (e) => {
        setAcknowledgement(prev => ({ ...prev, agreed: e.target.checked }));
    };

    const handleCaptchaChange = (value) => {
        setAcknowledgement(prev => ({ ...prev, captchaValue: value }));
    };

    const handleClear = () => {
        setFormData({
            universityBody: '',
            dateOfProposal: '',
            type: '',
            proposedBy: '',
            nameOfProposer: '',
            departmentOfProposer: '',
            natureOfEntity: '',
            studentName: '',
            studentId: '',
            studentMobileNumber: '',
            facultyEmail: '',
            facultyMobileNumber: '',
            employeeCode: ''
        });
        setAdvisoryBoardData({
            secretary: [{ name: '', uid: '', phone: '' }],
            jointSecretary: [{ name: '', uid: '', phone: '' }],
            facultyAdvisor: [{ name: '', uid: '', phone: '' }],
            facultyCoAdvisor: [{ name: '', uid: '', phone: '' }]
        });
    };

    const handleAddNominee = (role) => {
        setAdvisoryBoardData(prevState => ({
            ...prevState,
            [role]: [...prevState[role], { name: '', uid: '', phone: '' }]
        }));
    };

    const handleRemoveNominee = (role, index) => {
        setAdvisoryBoardData(prevState => ({
            ...prevState,
            [role]: prevState[role].filter((_, i) => i !== index)
        }));
    };

    

    const validateUniversityBodyForm = () => {
        const errors = [];
        if (!formData.type) errors.push('Please select a Type');
        if (!formData.natureOfEntity) errors.push('Please select a Nature of Entity');
        if (!formData.proposedBy) errors.push('Please select who proposed');
        if (!formData.universityBody) errors.push('Please enter the Name of university body');
        if (!formData.dateOfProposal) errors.push('Please enter the Date of proposal');
        if (!formData.nameOfProposer) errors.push('Please enter the Name of proposer');
        if (!formData.departmentOfProposer) errors.push('Please enter the Department of proposer');
        if (formData.proposedBy === 'STUDENT') {
            if (!formData.studentName) errors.push('Please enter the Student Name');
            if (!formData.studentId) errors.push('Please enter the Student ID');
            if (!formData.studentMobileNumber) errors.push('Please enter the Student Mobile Number');
        } else if (formData.proposedBy === 'FACULTY') {
            if (!formData.facultyEmail) errors.push('Please enter the Faculty Email');
            if (!formData.facultyMobileNumber) errors.push('Please enter the Faculty Mobile Number');
            if (!formData.employeeCode) errors.push('Please enter the Employee Code');
        }
        return errors;
    };

    const validateAdvisoryBoardForm = () => {
        const errors = [];
        const roles = ['secretary', 'jointSecretary', 'facultyAdvisor', 'facultyCoAdvisor'];
        roles.forEach(role => {
            advisoryBoardData[role].forEach((member, index) => {
                if (!member.name) errors.push(`Please enter the name for ${role} ${index + 1}`);
                if (!member.uid) errors.push(`Please enter the UID for ${role} ${index + 1}`);
                if (!member.phone) errors.push(`Please enter the phone number for ${role} ${index + 1}`);
            });
        });
        return errors;
    };

    const handleNext = () => {
        let errors = [];
        if (activeTab === 'universityBody') {
            errors = validateUniversityBodyForm();
        } else if (activeTab === 'advisoryBoard') {
            errors = validateAdvisoryBoardForm();
        }

        if (errors.length > 0) {
            notification.error({
                message: 'Validation Error',
                description: (
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                ),
                duration: 0,
            });
        } else {
            if (activeTab === 'universityBody') {
                setActiveTab('advisoryBoard');
            } else if (activeTab === 'advisoryBoard') {
                setActiveTab('acknowledgement');
            } else {
                handleSubmit({ preventDefault: () => { } });
            }
        }
    };

    const handleBack = () => {
        if (activeTab === 'advisoryBoard') {
            setActiveTab('universityBody');
        } else if (activeTab === 'acknowledgement') {
            setActiveTab('advisoryBoard');
        }
    };

    const props = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setAcknowledgement(prev => ({ ...prev, file: info.file }));
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const renderAdvisoryBoardForm = (type) => (
        <div className="form-content">
            <h3>{type === 'student' ? 'Student' : 'Faculty'} Advisory Board Details</h3>
            {['advisor1', 'advisor2'].map((role) => (
                <div key={role} className="form-group">
                    <h4>{type === 'student' ? 'Student' : 'Faculty'} {role === 'advisor1' ? 'Advisor' : 'Co-Advisor'}</h4>
                    <div className="form-row">
                        <input className='inputForm'
                            type="text"
                            placeholder="Name"
                            value={advisoryBoardData[type][role].name}
                            onChange={(e) => handleAdvisoryBoardInputChange(type, role, 'name', e.target.value)}
                        />
                        <input className='inputForm'
                            type="text"
                            placeholder="EID"
                            value={advisoryBoardData[type][role].eid}
                            onChange={(e) => handleAdvisoryBoardInputChange(type, role, 'eid', e.target.value)}
                        />
                        <input className='inputForm'
                            type="text"
                            placeholder="Phone No"
                            value={advisoryBoardData[type][role].phone}
                            onChange={(e) => handleAdvisoryBoardInputChange(type, role, 'phone', e.target.value)}
                        />
                    </div>
                </div>
            ))}
            {type === 'faculty' && (
                <>
                    {['coAdvisor1', 'coAdvisor2'].map((role) => (
                        <div key={role} className="form-group">
                            <h4>Faculty Co-Advisor</h4>
                            <div className="form-row">
                                <input className='inputForm'
                                    type="text"
                                    placeholder="Name"
                                    value={advisoryBoardData.faculty[role].name}
                                    onChange={(e) => handleAdvisoryBoardInputChange('faculty', role, 'name', e.target.value)}
                                />
                                <input className='inputForm'
                                    type="text"
                                    placeholder="UID"
                                    value={advisoryBoardData.faculty[role].eid}
                                    onChange={(e) => handleAdvisoryBoardInputChange('faculty', role, 'uid', e.target.value)}
                                /> 
                                <input className='inputForm'
                                    type="text"
                                    placeholder="Phone No"
                                    value={advisoryBoardData.faculty[role].phone}
                                    onChange={(e) => handleAdvisoryBoardInputChange('faculty', role, 'phone', e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );

    return (
        <div className="form-container-form">
            <div className="form-header">
                <img src={cuimg} alt="University Logo" className="university-logo" />
                <h3>DEPARTMENT OF ACADEMIC AFFAIRS</h3>
            </div>
            <div className="tab-container">
                <button
                    className={`tab ${activeTab === 'universityBody' ? 'active' : ''}`}
                    onClick={() => handleTabClick('universityBody')}
                >
                    University Body Details
                </button>
                <button
                    className={`tab ${activeTab === 'advisoryBoardStudent' ? 'active' : ''}`}
                    onClick={() => handleTabClick('advisoryBoardStudent')}
                >
                    Advisory Board (Student)
                </button>
                <button
                    className={`tab ${activeTab === 'advisoryBoardFaculty' ? 'active' : ''}`}
                    onClick={() => handleTabClick('advisoryBoardFaculty')}
                >
                    Advisory Board (Faculty)
                </button>
                <button
                    className={`tab ${activeTab === 'acknowledgement' ? 'active' : ''}`}
                    onClick={() => handleTabClick('acknowledgement')}
                >
                    Acknowledgement
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                {activeTab === 'universityBody' && (
                    <div className="form-content">
                        <div className="form-group">
                            <label className='labelName'>Type</label>
                            <div className="radio-group">
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3 ${formData.type === 'CLUB' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="type"
                                        value="CLUB"
                                        checked={formData.type === 'CLUB'}
                                        onChange={handleInputChange}
                                    />
                                    CLUB
                                </button>
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3 ${formData.type === 'DEPARTMENTAL SOCIETY' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="type"
                                        value="DEPARTMENTAL SOCIETY"
                                        checked={formData.type === 'DEPARTMENTAL SOCIETY'}
                                        onChange={handleInputChange}
                                    />
                                    DEPARTMENTAL SOCIETY
                                </button>
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3 ${formData.type === 'PROFESSIONAL SOCIETY' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="type"
                                        value="PROFESSIONAL SOCIETY"
                                        checked={formData.type === 'PROFESSIONAL SOCIETY'}
                                        onChange={handleInputChange}
                                    />
                                    PROFESSIONAL SOCIETY
                                </button>
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3 ${formData.type === 'COMMUNITIES' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="type"
                                        value="COMMUNITIES"
                                        checked={formData.type === 'COMMUNITIES'}
                                        onChange={handleInputChange}
                                    />
                                    COMMUNITIES
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className='labelName'>Nature of Entity</label>
                            <div className="radio-group">
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3 ${formData.natureOfEntity === 'Domain specific (field based)' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="natureOfEntity"
                                        value="Domain specific (field based)"
                                        checked={formData.natureOfEntity === 'Domain specific (field based)'}
                                        onChange={handleInputChange}
                                    />
                                    Domain specific (field based)
                                </button>
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3 ${formData.natureOfEntity === 'Hackathon & challenge' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="natureOfEntity"
                                        value="Hackathon & challenge"
                                        checked={formData.natureOfEntity === 'Hackathon & challenge'}
                                        onChange={handleInputChange}
                                    />
                                    Hackathon & challenge
                                </button>
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3 ${formData.natureOfEntity === 'Social value & outreach' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="natureOfEntity"
                                        value="Social value & outreach"
                                        checked={formData.natureOfEntity === 'Social value & outreach'}
                                        onChange={handleInputChange}
                                    />
                                    Social value & outreach
                                </button>
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3 ${formData.natureOfEntity === 'Innovation & incubation' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="natureOfEntity"
                                        value="Innovation & incubation"
                                        checked={formData.natureOfEntity === 'Innovation & incubation'}
                                        onChange={handleInputChange}
                                    />
                                    Innovation & incubation
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className='labelName'>Proposed by</label>
                            <div className="radio-group">
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3 ${formData.proposedBy === 'STUDENT' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="proposedBy"
                                        value="STUDENT"
                                        checked={formData.proposedBy === 'STUDENT'}
                                        onChange={handleInputChange}
                                    />
                                    STUDENT
                                </button>
                                <button type="button" className={`btn_choose_sent bg_btn_chose_3  ${formData.proposedBy === 'FACULTY' ? 'active' : ''}`}>
                                    <input className='inputForm'
                                        type="radio"
                                        name="proposedBy"
                                        value="FACULTY"
                                        checked={formData.proposedBy === 'FACULTY'}
                                        onChange={handleInputChange}
                                    />
                                    FACULTY
                                </button>
                            </div>
                            {formData.proposedBy === 'STUDENT' && (
                                <>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>


                                        <div className="form-group">
                                            <label className='labelName' htmlFor="studentName">Student Name</label>
                                            <input className='inputForm'
                                                type="text"
                                                id="studentName"
                                                name="studentName"
                                                value={formData.studentName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className='labelName' htmlFor="studentEmail">Student Email</label>
                                            <input className='inputForm'
                                                type="email"
                                                id="studentEmail"
                                                name="studentEmail"
                                                value={formData.studentEmail}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className='labelName' htmlFor="studentId">Student UID</label>
                                            <input className='inputForm'
                                                type="text"
                                                id="studentId"
                                                name="studentId"
                                                value={formData.studentId}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className='labelName' htmlFor="studentMobileNumber">Student Mobile Number</label>
                                            <input className='inputForm'
                                                type="tel"
                                                id="studentMobileNumber"
                                                name="studentMobileNumber"
                                                value={formData.studentMobileNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {formData.proposedBy === 'FACULTY' && (
                                <>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>

                                        <div className="form-group">
                                            <label className='labelName' htmlFor="facultyName">Faculty Name</label>
                                            <input className='inputForm'
                                                type="text"
                                                id="facultyName"
                                                name="facultyName"
                                                value={formData.facultyName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className='labelName' htmlFor="facultyEmail">Faculty Email</label>
                                            <input className='inputForm'
                                                type="email"
                                                id="facultyEmail"
                                                name="facultyEmail"
                                                value={formData.facultyEmail}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className='labelName' htmlFor="facultyMobileNumber">Faculty Mobile Number</label>
                                            <input className='inputForm'
                                                type="tel"
                                                id="facultyMobileNumber"
                                                name="facultyMobileNumber"
                                                value={formData.facultyMobileNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className='labelName' htmlFor="empCode">Employee Code</label>
                                            <input className='inputForm'
                                                type="text"
                                                id="empCode"
                                                name="empCode"
                                                value={formData.empCode}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className='labelName' htmlFor="proposedName">Proposed Name</label>
                                <input className='inputForm'
                                    type="text"
                                    id="proposedName"
                                    name="proposedName"
                                    value={formData.proposedName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className='labelName' htmlFor="proposedDate">Proposed Date</label>
                                <input className='inputForm'
                                    type="date"
                                    id="proposedDate"
                                    name="proposedDate"
                                    value={formData.proposedDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className='labelName' htmlFor="proposerName">Proposer Name</label>
                                <input className='inputForm'
                                    type="text"
                                    id="proposerName"
                                    name="proposerName"
                                    value={formData.proposerName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className='labelName' htmlFor="departmentOfProposer">Department of proposer</label>
                                <input className='inputForm'
                                    type="text"
                                    id="departmentOfProposer"
                                    name="departmentOfProposer"
                                    value={formData.departmentOfProposer}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                    </div>
                )}

                {activeTab === 'advisoryBoardStudent' && renderAdvisoryBoardForm('student')}
                {activeTab === 'advisoryBoardFaculty' && renderAdvisoryBoardForm('faculty')}

                {activeTab === 'acknowledgement' && (
                    <div className="form-content-form">
                        <h4>Acknowledgement</h4>
                        <p>
                            I acknowledge that the information provided in this form is accurate and complete to the best of my knowledge.
                            I understand that submitting false or misleading information may result in the rejection of this proposal or other appropriate actions.
                        </p>
                        <Checkbox checked={acknowledgement.agreed} onChange={handleAcknowledgementChange}>
                            I acknowledge and agree to the above statement
                        </Checkbox>
                        <div className="captcha-container">
                            <ReCAPTCHA
                                sitekey="6LeComoqAAAAAM7fMSrGeagGkmaDdtqdt12MzRjE"
                                onChange={handleCaptchaChange}
                            />
                        </div>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                sensitive files.
                            </p>
                        </Dragger>
                    </div>
                )}

                <div className="form-actions">
                    {activeTab !== 'universityBody' && (
                        <button type="button" className="back-button" onClick={handleBack}>
                            Back
                        </button>
                    )}
                    <button type="button" className="clear-button" onClick={handleClear}>
                        Clear all
                    </button>
                    <button type="button" className="next-button" onClick={handleNext}>
                        {activeTab === 'acknowledgement' ? 'Submit' : 'Next'}
                    </button>
                </div>
            </form>
            <Modal
                title="Verifying Form Submission"
                visible={isModalVisible}
                footer={null}
                closable={false}
            >
                <div className="modal-content">
                    <Spin spinning={isLoading} />
                    <p>Please wait while we verify your form submission...</p>
                </div>
            </Modal>
        </div>
    );
};

export default AcademicAffairsForm;