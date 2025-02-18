const command = document.querySelector(".code-block");
const copied_alert = document.querySelector(".copied_alert");

copied_alert.style.opacity = 0
function copyText() {
    navigator.clipboard.writeText(command.innerHTML).then(async () => {
        copied_alert.style.opacity = 1
        setTimeout(() => {
            copied_alert.style.opacity = 0;
        }, 1500)
    })
}
