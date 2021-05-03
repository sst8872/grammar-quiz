function makeModal(ans, exp) {

    const btn = document.querySelector('.modalBtn');
    const modalWrapper = document.querySelector('.modalWrapper');
    const body = document.querySelector('body');

    btn.addEventListener('click', function (e) {
        modalWrapper.classList.add('showModal');
        const closBtn = document.querySelector('.close');
        closBtn.addEventListener('click', function (e) {
            return modalWrapper.classList.remove('showModal');
        });

        // modalAns.innerHTML += `&nbsp;&nbsp;<span style="color: white">${ans}</span>`
        // modalExp.innerHTML = exp;

        modalWrapper.addEventListener('click', function (e) {
            return modalWrapper.classList.remove('showModal');
        });
        body.addEventListener('keydown', function (e) {
            if (e.keyCode === 27) {
                return modalWrapper.classList.remove('showModal');
            }
        })
    });
}

export default makeModal;
