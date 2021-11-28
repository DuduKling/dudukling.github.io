/* jshint esversion: 6 */
export default function startEmail() {
    /* Send email with mailto (Cause PHP doesn't work on Github). */
    let emailSubmit = document.getElementById("js-emailSubmit");

    emailSubmit.addEventListener("click", function () {
        let name = document.getElementById("js-inputName");
        let subject = document.getElementById("js-inputSubject");
        let message = document.getElementById("js-inputMessage");

        let nameV = name.value;
        let subjectV = subject.value;
        let messageV = message.value;

        let subjectWithName = subjectV + " - " + nameV;
        let res1 = subjectWithName.replace(/ /g, "%20");
        let res2 = messageV.replace(/ /g, "%20").replace(/\n/g, "%0D%0A");

        let hyperReference = "mailto:eduardokmesiano@gmail.com?subject=" + res1 + "&body=" + res2;

        emailSubmit.setAttribute("href", hyperReference);

        name.value = "";
        subject.value = "";
        message.value = "";
    });
}