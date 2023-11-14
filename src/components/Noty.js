export function showErrorAlert(message) {
  new Noty({
    text: `<span class="noty-text">${message}</span>`,
    type: "error",
    layout: "topRight",
    timeout: 3000,
    progressBar: false,
    callbacks: {
      onShow: function () {
        this.barDom.classList.add("noty-container");
      },
    },
  }).show();
}

/* 

 An error occurred while processing your request. Please try again later

*/
