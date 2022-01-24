import React, {useState} from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const thai = require('thai-data')

export default function ThaiAddress(props) {

    const [zipCode, setZipCode] = useState('')
    const [subDistrict, setSubDistrict] = useState(Array)
    const [subDistrictSelect, setSubDistrictSelect] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [isDisabledSubDistrictSelect, setIsDisabledSubDistrictSelect] = useState(true)
    const [zipCodeOriginal, setZipCodeOriginal] = useState('')
    const [subDistrictOriginal, setSubDistrictOriginal] = useState(Array)
    const [subDistrictSelectOriginal, setSubDistrictSelectOriginal] = useState('')
    const [districtOriginal, setDistrictOriginal] = useState('')
    const [provinceOriginal, setProvinceOriginal] = useState('')
    const [isDisabledSubDistrictSelectOriginal, setIsDisabledSubDistrictSelectOriginal] = useState(true)
    const [user_address, setUserAddress] = useState('')
    const [user_subdistrict, setUserSubdistrict] = useState('')
    const [user_postcode, setUserPostcode] = useState('')
    const [us_com_address, setUsComAddress] = useState('')
    const [us_com_subdistrict, setUsComSubdistrict] = useState('')
    const [us_com_postcode, setUsComPostcode] = useState('')


    //Current address
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

    //Original address
    const onSetZipCodeOriginal = (e) => {
        setSubDistrictSelectOriginal('')
        setDistrictOriginal('')
        setProvinceOriginal('')
        if (/^\d{0,5}$/.test(e)) {
            setZipCodeOriginal(e)
            if (thai.autoSuggestion(e).subDistrict) {
                setSubDistrictOriginal(thai.autoSuggestion(e).subDistrict)
                setIsDisabledSubDistrictSelectOriginal(false)
            } else {
                setIsDisabledSubDistrictSelectOriginal(true)
            }
        }
    }

    const autoSuggestionOriginal = (zipCodeOriginal, subDistrictOriginal) => {
        setDistrictOriginal(thai.autoSuggestion(zipCodeOriginal, subDistrictOriginal).districtName)
        setProvinceOriginal(thai.autoSuggestion(zipCodeOriginal, subDistrictOriginal).provinceName)
    }

    const onSetDistrictOriginal = (subDistrictOriginal) => {
        setSubDistrictSelectOriginal(subDistrictOriginal)
        autoSuggestionOriginal(zipCodeOriginal, subDistrictOriginal)
    }

    const handleClick = () => {

        const user_email = props.user_email
        const user_password = props.user_password
        const user_role = props.user_role
        const user_profile = props.user_profile
        const user_tel = props.user_tel
        const user_dob = props.user_dob
        const user_slogan = props.user_slogan
        const us_com_github=props.us_com_github
        const us_com_linkedin = props.us_com_linkedin
        const us_com_facebook = props.us_com_facebook
        const us_com_youtube = props.us_com_youtube
        const user_district = district
        const user_province = province
        const us_com_district = districtOriginal
        const us_com_province = provinceOriginal

        const params = JSON.stringify({
            user_email,
            user_password,
            user_role,
            user_profile,
            user_tel,
            user_dob,
            user_slogan,
            us_com_github,
            us_com_linkedin,
            us_com_facebook,
            us_com_youtube,
            user_address,
            user_subdistrict,
            user_district,
            user_province,
            user_postcode,
            us_com_address,
            us_com_subdistrict,
            us_com_district,
            us_com_province,
            us_com_postcode
        });

        axios.post('auth/register', params, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status === 200) {
                Swal.fire(
                    'ลงทะเบียนผู้ใช้สำเร็จ',
                    'ยืนยันตัวตนที่อีเมล์ของคุณ',
                    'success'
                ).then(function () {
                    window.location = '/'
                });
            }else if (res.status === 400) {
                Swal.fire(
                    'ลงทะเบียนผู้ใช้ไม่สำเร็จ',
                    'โปรดลงทะเบียนใหม่อีกรอบ',
                    'error'
                ).then(function () {
                    window.location = '/register'
                });
            }else if (res.status === 404) {
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
                       disabled />
            </div>
            <div className="col-md-6 mt-4">
                <input value={province} id="district" type="text" placeholder="จังหวัด" className="form-control"
                       disabled />
            </div>

            <div className="col-md-12 mt-4">
                <input type="text" className="form-control" placeholder="ภูมิลำเนา"
                       onChange={e => setUsComAddress(e.target.value)}/>
            </div>
            <div className="col-md-6 mt-4">
                <input value={zipCodeOriginal} onChange={e => {
                    onSetZipCodeOriginal(e.target.value);
                    setUsComPostcode(e.target.value)
                }}
                       className="form-control"
                       id="zipCode" type="text" placeholder="กรอกรหัสไปรษณีย์ภูมิลำเนา"/>
            </div>
            <div className="col-md-6 mt-4">
                <select onChange={e => {onSetDistrictOriginal(e.target.value); setUsComSubdistrict(e.target.value)}} value={subDistrictSelectOriginal}
                        disabled={zipCodeOriginal.length === 5 ? false : true}
                        className={`form-select ${!isDisabledSubDistrictSelect ? 'text-gray-700' : 'bg-gray-200 text-gray-500'}`}
                        id="subDistrict" placeholder="">
                    <option value="" disabled={!isDisabledSubDistrictSelectOriginal ? true : false}>เลือกตำบล/แขวง
                    </option>
                    {!isDisabledSubDistrictSelectOriginal &&
                        subDistrictOriginal.map((item, index) => <option key={index}>{item}</option>)
                    }
                </select>
                {!isDisabledSubDistrictSelectOriginal &&
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    </div>
                }
            </div>
            <div className="col-md-6 mt-4">
                <input value={districtOriginal} id="district" type="text" placeholder="อำเภอ/เขต"
                       className="form-control"
                       disabled/>
            </div>
            <div className="col-md-6 mt-4">
                <input value={provinceOriginal} id="district" type="text" placeholder="จังหวัด" className="form-control"
                       disabled/>
            </div>
            <div className="col-md-12 mt-4">
                <button type="button" className="btn btn-success" onClick={() => handleClick()}><i className="fas fa-save"/> ลงทะเบียน</button>
            </div>
        </div>
    );
}