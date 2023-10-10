import React, { useCallback, useState, useRef } from 'react'
import './style.scss'
import { Editor } from "react-draft-wysiwyg";
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
import {
    EditorState,
    ContentState,
    convertToRaw,
    Modifier,
    convertFromHTML,
} from "draft-js";
import { redirect, useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Swal from 'sweetalert2';
const CreateRecipe = () => {
    const [recipe_name, setRecipe_name] = useState('')
    const [recipe_introduction, setRecipe_introduction] = useState('')
    console.log(recipe_introduction);
    console.log(recipe_name);

    const navigate = useNavigate();

    const [image, setImage] = useState('');
    const imageRef = useRef();
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const url = URL.createObjectURL(acceptedFiles[0]);
        setImage(url);
        imageRef.current = file;
    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const recipe_details = editorState.getCurrentContent().getPlainText();
    console.log(editorState.getCurrentContent().getPlainText());
    const handleChange = (data) => {
        setEditorState(data);
    };
    const onImageUpload = (file) => {
        return new Promise((resolve, reject) => {
            uploadCallback(file)
                .then((response) => {
                    // setUploadImage(true);
                    resolve({ data: { link: response.data.link } });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    const uploadCallback = (file) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "sttruyenxyz");
            // axios
            //     .post(
            //         "https://api.cloudinary.com/v1_1/sttruyen/image/upload",
            //         formData,
            //         {
            //             headers: { "X-Requested-With": "XMLHttpRequest" },
            //             onUploadProgress: (progressEvent) => {
            //                 const percentCompleted = Math.round(
            //                     (progressEvent.loaded * 100) / progressEvent.total
            //                 );
            //             },
            //         }
            //     )
            //     .then((response) => {
            //         resolve({ data: { link: response.data.secure_url } });
            //     })
            //     .catch((error) => {
            //         reject(error);
            //     });
        });
    };
    const handleBackPage = () => {
        navigate(-1);
    }
    const handleSubmitRecipe = async () => {
        try {
            let urlImage = '';
            if (imageRef.current) {
                const formData = new FormData();
                formData.append("file", imageRef.current);
                formData.append("upload_preset", "sttruyenxyz");
                try {
                    const res = await axios.post(
                        "https://api.cloudinary.com/v1_1/sttruyen/image/upload",
                        formData
                    );
                    urlImage = "https:" + res.data.url.split(":")[1];
                } catch (err) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: err?.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return;
                }
            }
            const token = localStorage.getItem('token');
            const data = await axios.post(`http://localhost:5000/recipe`,
                {
                    name: recipe_name, introduction: recipe_introduction,
                    recipes: recipe_details,
                    tags:[
                        {
                            k:"image",
                            v:urlImage
                        }
                    ]
                }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            navigate("/recipe/myrecipe")
        }
        catch (err) {

        }


    }


    const [colourOptions, setColourOptions] = useState([
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' }
    ])
    return (
        <div className='create_recipe_container'>
            <div class="wrapper">
                <div class="inner">
                    <div class="image-holder">
                        <div style={{
                            width: '400px',
                            height: "500px", border: "1px solid rgba(0,0,0,0.1)"
                        }} className='d-flex justify-content-center align-items-center' {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                !image ? <div>
                                    <div className='d-flex justify-content-center'>
                                        <i style={{ fontSize: "50px", color: "rgba(0,0,0,0.7)" }} className="fa-solid fa-image"></i>
                                    </div>
                                    <div>
                                        <i>
                                            Thêm ảnh tại đây
                                        </i>
                                    </div>
                                </div> :
                                    <img style={{ width: "400px", height: "500px", objectFit: "cover" }} src="https://res.cloudinary.com/sttruyen/image/upload/v1694748169/gwrobojgvpbfyejhb40j.jpg" alt="" />
                            }
                        </div>
                    </div>
                    <div style={{ width: "400px" }} className='create_form' action="">
                        <h3 style={{ marginBottom: "30px" }}>Tạo công thức</h3>
                        <div class="form-holder active w-100">
                            <textarea style={{ width: "100%", minHeight: "100px" }} type="text" placeholder="Tên món ăn" class="form-control" onChange={e => setRecipe_name(e.target.value)} />
                        </div>
                        <div class="form-holder active">
                            <textarea style={{ width: "100%", minHeight: "200px" }} type="text" placeholder="Giới thiệu món ăn" class="form-control" onChange={e => setRecipe_introduction(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='create_form-2'>
                    <div style={{ margin: "10px 0" }} class="form-holder active w-100">
                        <CreatableSelect isClearable placeholder="Chọn quốc gia" options={colourOptions} />
                    </div>
                </div>
                <div className='recipe_create'>
                    <h3 style={{ marginTop: "20px" }}>Công thức</h3>
                    <div className='recipe_create_edit'>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={handleChange}
                            wrapperClassName="editor-wrapper"
                            editorClassName="message-editor"
                            toolbarClassName="message-toolbar"
                            toolbar={{
                                options: [
                                    "inline",
                                    "blockType",
                                    "fontSize",
                                    "list",
                                    "textAlign",
                                    "image",
                                    "emoji",
                                    "link",
                                    "history",
                                ],

                                image: {
                                    uploadEnabled: true,
                                    uploadCallback: onImageUpload,
                                    previewImage: true,
                                    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                                    alt: { present: false, mandatory: false },
                                    defaultSize: {
                                        height: "200px",
                                        width: "200px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div style={{ marginTop: "30px", marginBottom: "20px" }} className='d-flex justify-content-center' onClick={handleSubmitRecipe}>
                        <button>Tạo mới</button>
                    </div>
                </div>
            </div>
            <div className='back_button'>
                <button onClick={handleBackPage}> <i style={{ marginRight: "10px" }} className="fa-solid fa-arrow-left"></i>Quay lại</button>
            </div>
        </div>
    )
}

export default CreateRecipe