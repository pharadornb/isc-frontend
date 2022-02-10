import React, {useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const thai = require('thai-data')

export default function ThaiAddressCompany(props) {

    const [zipCode, setZipCode] = useState('')
    const [subDistrict, setSubDistrict] = useState(Array)
    const [subDistrictSelect, setSubDistrictSelect] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [isDisabledSubDistrictSelect, setIsDisabledSubDistrictSelect] = useState(true)
    const [user_address, setUserAddress] = useState('')
    const [user_subdistrict, setUserSubdistrict] = useState('')
    const [user_postcode, setUserPostcode] = useState('')

    const onSetZipCode = (e) => {
        setSubDistrictSelect('')
        setDistrict('')
        setProvince('')
        if (/^\d{0,5}$/.test(e)) {
            setZipCode(e)
            if (thai.autoSuggestion(e).subDistrict) {
                setSubDistrict(thai.autoSuggestion(e).subDistrict)
                setIsDisabledSubDistrictSelect(false)
            } else {
                setIsDisabledSubDistrictSelect(true)
            }
        }
    }

    const autoSuggestion = (zipCode, subDistrict) => {
        setDistrict(thai.autoSuggestion(zipCode, subDistrict).districtName)
        setProvince(thai.autoSuggestion(zipCode, subDistrict).provinceName)
    }

    const onSetDistrict = (subDistrict) => {
        setSubDistrictSelect(subDistrict)
        autoSuggestion(zipCode, subDistrict)
    }

    const handleClick = () => {

        const user_email = props.user_email
        const user_password = props.user_password
        const user_role = props.user_role
        const user_profile = props.user_profile
        const uc_name = props.companyName
        const uc_register = props.companyRegister
        const user_dob = props.dobCompany
        const uc_type = props.companyType
        const uc_detail = props.companyDetail
        const user_tel = props.companyTel
        const uc_fax = props.companyFax
        const uc_website = props.companyWeb
        const user_district = district
        const user_province = province
        const user_slogan = props.companyVision

        const params = JSON.stringify({
            user_email,
            user_password,
            user_role,
            user_profile,
            user_tel,
            user_dob,
            uc_name,
            uc_register,
            uc_type,
            uc_detail,
            uc_fax,
            uc_website,
            user_address,
            user_subdistrict,
            user_district,
            user_province,
            user_postcode,
            user_slogan,
            uc_bank: null,
            uc_branch_bank: null,
            uc_bank_no: null,
            uc_bank_name: null,
        });

        const params_email = JSON.stringify({
            service_id: 'service_ib76tes',
            template_id: 'template_0ly1q45',
            user_id: 'user_7FNeD7QT9PKSHkzE7SsF4',
            template_params: {
                to_name: user_email,
            }
        });

        axios.post('auth/register', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                axios.post('https://api.emailjs.com/api/v1.0/email/send', params_email, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(res => {
                    if (res.status === 200) {
                        Swal.fire(
                            'ลงทะเบียนสำเร็จ',
                            'ยืนยันตัวตนที่อีเมล์ของคุณ',
                            'success'
                        ).then(function () {
                            window.location = '/'
                        });
                    }
                }).catch(err =>
                    console.log(err)
                )
            } else if (res.status === 400) {
                Swal.fire(
                    'ลงทะเบียนผู้ใช้ไม่สำเร็จ',
                    'โปรดลงทะเบียนใหม่อีกรอบ',
                    'error'
                ).then(function () {
                    window.location = '/register'
                });
            } else if (res.status === 404) {
                Swal.fire(
                    'ลงทะเบียนผู้ใช้ไม่สำเร็จ',
                    'อีเมล์นี้มีในระบบแล้ว',
                    'error'
                ).then(function () {
                    window.location = '/register'
                });
            }
        }).catch(err =>
            console.log(err)
        )
    }

    return (
        <div className="row">
            <div className="col-md-12 mt-4">
                <input type="text" className="form-control" placeholder="ที่อยู่ปัจจุบัน"
                       onChange={e => setUserAddress(e.target.value)}/>
            </div>
            <div className="col-md-6 mt-4">
                <input value={zipCode} onChange={e => {
                    onSetZipCode(e.target.value);
                    setUserPostcode(e.target.value)
                }} className="form-control"
                       id="zipCode" type="text" placeholder="กรอกรหัสไปรษณีย์ที่อยู่"/>
            </div>
            <div className="col-md-6 mt-4">
                <select onChange={e => {
                    onSetDistrict(e.target.value);
                    setUserSubdistrict(e.target.value)
                }} value={subDistrictSelect}
                        disabled={zipCode.length === 5 ? false : true}
                        className={`form-select ${!isDisabledSubDistrictSelect ? 'text-gray-700' : 'bg-gray-200 text-gray-500'}`}
                        id="subDistrict" placeholder="">
                    <option value="" disabled={!isDisabledSubDistrictSelect ? true : false}>เลือกตำบล/แขวง</option>
                    {!isDisabledSubDistrictSelect &&
                        subDistrict.map((item, index) => <option key={index}>{item}</option>)
                    }
                </select>
                {!isDisabledSubDistrictSelect &&
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    </div>
                }
            </div>
            <div className="col-md-6 mt-4">
                <input value={district} id="district" type="text" placeholder="อำเภอ/เขต" className="form-control"
                       disabled/>
            </div>
            <div className="col-md-6 mt-4">
                <input value={province} id="district" type="text" placeholder="จังหวัด" className="form-control"
                       disabled/>
            </div>
            <div className="col-md-12 mt-4">
                <button type="button" className="btn btn-success" onClick={() => handleClick()}><i
                    className="fas fa-save"/> ลงทะเบียน
                </button>
            </div>
        </div>
    );
}