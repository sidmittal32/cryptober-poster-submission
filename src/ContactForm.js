import React, { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

function ContactForm() {
    const formRef = useRef(null)
    const [isRecaptchaCompleted, setIsRecaptchaCompleted] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [showRecaptchaError, setShowRecaptchaError] = useState(false);

    const sendFormData = async (event) => {
        // this will prevent your form to redirect to another page.
        event.preventDefault();

        if (!isRecaptchaCompleted) {
            console.log('reCAPTCHA not completed');
            setShowRecaptchaError(true);
            return;
        }

        setShowRecaptchaError(false);

        if (!formRef.current) {
            console.log('something wrong with form ref')
            return;
        }

        // get our form data
        const formData = new FormData(formRef.current)

        // add some additional data if you want
        // formData.append('language', window.navigator.language)

        fetch('https://formcarry.com/s/{YOUR FORM CODE}', {
            method: 'POST',
            enctype: 'multipart/form-data',
            body: formData,
            headers: {
                // you don't have to set Content-Type
                // otherwise it won't work due to boundary!
                Accept: 'application/json'
            }
        })
            // convert response to json
            .then(r => r.json())
            .then(res => {
                console.log(res);
            });

        setTimeout(() => {
            setIsFormSubmitted(true);
        }, 2000); // Adjust the time as needed
    }

    const handleRecaptchaChange = (value) => {
        // Called when reCAPTCHA is completed
        setIsRecaptchaCompleted(true);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                {!isFormSubmitted ? ( // Conditionally render the form or success message
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" ref={formRef} onSubmit={sendFormData}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamName">Team Name</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="teamName"
                                type="text"
                                name="teamName"
                                required
                                pattern="[\w]{3,35}"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamLeaderName">Team Leader's Name</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="teamLeaderName"
                                type="text"
                                name="teamLeaderName"
                                required
                                pattern="^[a-zA-z]+([\s][a-zA-Z]+)*$"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamLeaderEmail">Team Leader's Email</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="teamLeaderEmail"
                                type="email"
                                name="teamLeaderEmail"
                                required
                                pattern="[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teamLeaderPhone">Team Leader's Phone No. (Whatsapp)</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="teamLeaderPhone"
                                type="text"
                                name="teamLeaderPhone"
                                required
                                pattern="^\d{10}$"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="driveUrlInput">Google Drive URL</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="driveUrlInput" name="driveUrl" placeholder="Enter Google Drive URL" />
                        </div>
                        <div className="mb-4 flex justify-center items-center">
                            <ReCAPTCHA
                                sitekey="{YOUR SITE KEY}"
                                onChange={handleRecaptchaChange}
                            />
                        </div>
                        <div className="flex justify-center items-center"> {/* Add space between reCAPTCHA and submit button */}
                            {showRecaptchaError && (
                                <p className="text-red-500">Please complete the reCAPTCHA.</p>
                            )}
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <p className="text-black-500 text-xl font-semibold">Your Submission has been recorded</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function App() {
    return <ContactForm />;
}

export default App;