import React, {useEffect} from "react";
import Swal from "sweetalert2";

export default function ResumeDialog() {

    useEffect(() => {
        Swal.fire({
            title: 'Serial key for resume checking :',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            }, showCancelButton: true,
            confirmButtonText: 'Check',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                console.log(login);
            //     return fetch(`//api.github.com/users/${login}`)
            //         .then(response => {
            //             if (!response.ok) {
            //                 throw new Error(response.statusText)
            //             }
            //             return response.json()
            //         })
            //         .catch(error => {
            //             Swal.showValidationMessage(`Request failed: ${error}`)
            //         })
            }, allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                // Swal.fire({
                //     title: `${result.value.login}'s avatar`, imageUrl: result.value.avatar_url
                // })
                // console.log(result.value);
                window.location = `/resume_user/${result.value}`
            }else if (!result.isConfirmed) {
                window.location = '/dashboard'
            }
        })
    }, []);

    return (
        <>
            {/*<p>5555123156156165</p>*/}
        </>
    )
}