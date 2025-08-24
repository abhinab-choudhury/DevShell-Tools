window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-btn").forEach((element) => {
    element.addEventListener("click", () => {
      console.log("Copy Btn Clicked!!");
      const text = element.getAttribute("data-copy");
      navigator.clipboard.writeText(text).then(() => {
        element.innerHTML = '<i class="fa fa-check text-black"></i>';
        setTimeout(() => {
          element.innerHTML = '<i class="fa fa-sm fa-clone text-black"></i>';
        }, 1500);
      });
    });
  });
});
