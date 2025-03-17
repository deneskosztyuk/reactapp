const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    attachments.forEach((file) => formData.append("attachments", file));

    try {
        const response = await fetch("http://localhost:8080/api/contact/send", {
            method: "POST",
            body: formData,
        });

        const result = await response.text();
        alert(result);
    } catch (error) {
        alert("Error sending email");
    }
};
