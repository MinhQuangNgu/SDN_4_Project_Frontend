import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import moment from 'moment'
const AccountCard = ({user,index}) => {
    const [edit, setEdit] = useState(false);
    const [selectedOption, SetSelectedOption] = useState( { value: 'user', label: 'User' });

    const handleChange = (e) => {
        SetSelectedOption(e);
    }
    const colourOptions = [
        { value: 'admin', label: 'Admin' },
        { value: 'chief', label: 'Đầu bếp' },
        { value: 'user', label: 'User' },
    ];
    return (
        <tr className="alert" role="alert">
            <td className="border-bottom-0-custom">
                {index + 1}
            </td>
            <td className="d-flex align-items-center border-bottom-0-custom">
                <div className="img" style={{ backgroundImage: "url('https://res.cloudinary.com/sttruyen/image/upload/v1694421667/sfcf5rwxxbjronvxlaef.jpg')", marginRight: "10px" }}></div>
                <div className="pl-3 email">
                    <span>
                        <Link to={`/${user?._id}/profile`}>
                            {user?.email}
                        </Link>
                    </span>
                    <span>{moment(user?.createdAt).fromNow()}</span>
                </div>
            </td>
            <td className="border-bottom-0-custom">
                {edit ? <div className='col-12'>
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={colourOptions}
                        defaultValue={selectedOption}
                        placeholder="Role"
                    />
                </div> : selectedOption.value}
            </td>
            <td className="border-bottom-0-custom">{user?.ownerRecipes?.length}</td>
            <td className="border-bottom-0-custom">{user?.followers?.length}</td>
            <td className="status border-bottom-0-custom"><span className="active">Active</span></td>
            <td className="border-bottom-0-custom">
                {!edit ? <>
                    <button onClick={() => {
                        setEdit(true)
                    }} style={{ height: "30px", fontSize: "12px" }} type="button" className="btn btn-primary">
                        Sửa
                    </button>
                    <button style={{ marginLeft: "5px", height: "30px", fontSize: "12px" }} type="button" className="btn btn-danger">
                        Khóa
                    </button></> : <>
                    <button onClick={() => {
                        setEdit(false)
                    }} style={{ height: "30px", fontSize: "12px" }} type="button" className="btn btn-danger">
                        Đồng ý
                    </button>
                    <button onClick={() => {
                        setEdit(false)
                    }} style={{ marginLeft: "5px", height: "30px", fontSize: "12px" }} type="button" className="btn btn-secondary">
                        Hủy
                    </button></>}
            </td>
        </tr>
    )
}

export default AccountCard