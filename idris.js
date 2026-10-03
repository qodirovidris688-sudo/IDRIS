/* =========================================================
   USTOYOB
   IDRIS.JS — КОДИ ПУРРА
   ADMIN ПИНҲОНӢ
   Ctrl + Shift + A
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    const WORKERS_KEY = "ustoyobWorkers";
    const ORDERS_KEY = "ustoyobOrders";
    const CART_KEY = "ustoyobCart";
    const CUSTOMER_KEY = "ustoyobCustomer";
    const ROLE_KEY = "ustoyobRole";
    const CURRENT_WORKER_KEY = "ustoyobCurrentWorker";



    /* =====================================================
       👑 ADMIN — ПИНҲОНӢ
       
       Дар сайт ҳеҷ тугмаи ADMIN нест.

       Барои кушодан:
       CTRL + SHIFT + A

       Парол:
       12345
    ===================================================== */

    const ADMIN_PASSWORD = "12345";

    let adminMode = false;



    /* =====================================================
       ЁРИРАСОН
    ===================================================== */

    function getData(key, fallback) {

        try {

            const data = localStorage.getItem(key);

            if (!data) {
                return fallback;
            }

            return JSON.parse(data);

        } catch (error) {

            console.error(
                "Хатои LocalStorage:",
                error
            );

            return fallback;
        }
    }



    function saveData(key, data) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

        } catch (error) {

            console.error(
                "Хатои нигоҳдорӣ:",
                error
            );
        }
    }



    function escapeHtml(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value ?? "";

        return div.innerHTML;
    }



    /* =====================================================
       САҲИФАҲО
    ===================================================== */

    const welcomePage =
        document.getElementById(
            "welcomePage"
        );

    const professionPage =
        document.getElementById(
            "professionPage"
        );

    const workerFormPage =
        document.getElementById(
            "workerFormPage"
        );

    const customerPage =
        document.getElementById(
            "customerPage"
        );

    const workerPage =
        document.getElementById(
            "workerPage"
        );



    function hideAllPages() {

        if (welcomePage) {
            welcomePage.classList.add(
                "hidden"
            );
        }

        if (professionPage) {
            professionPage.classList.add(
                "hidden"
            );
        }

        if (workerFormPage) {
            workerFormPage.classList.add(
                "hidden"
            );
        }

        if (customerPage) {
            customerPage.classList.add(
                "hidden"
            );
        }

        if (workerPage) {
            workerPage.classList.add(
                "hidden"
            );
        }

    }



    /* =====================================================
       САҲИФАИ АВВАЛ
    ===================================================== */

    function showWelcome() {

        hideAllPages();

        if (welcomePage) {

            welcomePage.classList.remove(
                "hidden"
            );
        }

        window.scrollTo(
            0,
            0
        );
    }



    /* =====================================================
       САҲИФАИ МИЗОҶ
    ===================================================== */

    function showCustomer() {

        hideAllPages();

        if (customerPage) {

            customerPage.classList.remove(
                "hidden"
            );
        }

        localStorage.setItem(
            ROLE_KEY,
            "customer"
        );

        loadWorkers();

        updateCartCount();

        window.scrollTo(
            0,
            0
        );
    }



    /* =====================================================
       САҲИФАИ КАСБҲО
    ===================================================== */

    function showProfessions() {

        hideAllPages();

        if (professionPage) {

            professionPage.classList.remove(
                "hidden"
            );
        }

        localStorage.setItem(
            ROLE_KEY,
            "worker"
        );

        window.scrollTo(
            0,
            0
        );
    }



    /* =====================================================
       ФОРМАИ УСТО
    ===================================================== */

    function showWorkerForm(
        profession,
        icon
    ) {

        hideAllPages();

        if (workerFormPage) {

            workerFormPage.classList.remove(
                "hidden"
            );
        }


        const iconElement =
            document.getElementById(
                "chosenProfessionIcon"
            );

        const textElement =
            document.getElementById(
                "chosenProfessionText"
            );


        if (iconElement) {

            iconElement.textContent =
                icon;
        }


        if (textElement) {

            textElement.textContent =
                profession;
        }


        localStorage.setItem(
            "selectedProfession",
            profession
        );


        localStorage.setItem(
            "selectedProfessionIcon",
            icon
        );


        window.scrollTo(
            0,
            0
        );
    }



    /* =====================================================
       👤 МИЗОҶ
    ===================================================== */

    const customerButton =
        document.getElementById(
            "customerButton"
        );


    if (customerButton) {

        customerButton.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    ROLE_KEY,
                    "customer"
                );

                localStorage.removeItem(
                    CURRENT_WORKER_KEY
                );

                showCustomer();

            }
        );
    }



    /* =====================================================
       🛠️ УСТО
    ===================================================== */

    const workerButton =
        document.getElementById(
            "workerButton"
        );


    if (workerButton) {

        workerButton.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    ROLE_KEY,
                    "worker"
                );

                showProfessions();

            }
        );
    }



    /* =====================================================
       БАРГАШТАН АЗ КАСБ
    ===================================================== */

    const professionBack =
        document.getElementById(
            "professionBack"
        );


    if (professionBack) {

        professionBack.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    ROLE_KEY
                );

                showWelcome();

            }
        );
    }



    /* =====================================================
       БАРГАШТАН АЗ ФОРМА
    ===================================================== */

    const workerFormBack =
        document.getElementById(
            "workerFormBack"
        );


    if (workerFormBack) {

        workerFormBack.addEventListener(
            "click",
            function () {

                showProfessions();

            }
        );
    }



    /* =====================================================
       ИНТИХОБИ КАСБ
    ===================================================== */

    document
        .querySelectorAll(
            ".profession-card"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const profession =
                            button.dataset.profession;

                        const icon =
                            button.dataset.icon ||
                            "🛠️";


                        showWorkerForm(
                            profession,
                            icon
                        );

                    }
                );

            }
        );



    /* =====================================================
       СОХТАНИ ПРОФИЛИ УСТО
    ===================================================== */

    const createWorker =
        document.getElementById(
            "createWorker"
        );


    if (createWorker) {

        createWorker.addEventListener(
            "click",
            function () {

                const nameElement =
                    document.getElementById(
                        "workerName"
                    );

                const phoneElement =
                    document.getElementById(
                        "workerPhone"
                    );

                const locationElement =
                    document.getElementById(
                        "workerLocation"
                    );

                const experienceElement =
                    document.getElementById(
                        "workerExperience"
                    );

                const aboutElement =
                    document.getElementById(
                        "workerAbout"
                    );


                const name =
                    nameElement
                        ? nameElement.value.trim()
                        : "";


                const phone =
                    phoneElement
                        ? phoneElement.value.trim()
                        : "";


                const location =
                    locationElement
                        ? locationElement.value.trim()
                        : "";


                const experience =
                    experienceElement
                        ? experienceElement.value
                        : "";


                const about =
                    aboutElement
                        ? aboutElement.value.trim()
                        : "";


                const profession =
                    localStorage.getItem(
                        "selectedProfession"
                    );


                const icon =
                    localStorage.getItem(
                        "selectedProfessionIcon"
                    );


                if (!profession) {

                    alert(
                        "⚠️ Аввал касби худро интихоб кунед."
                    );

                    showProfessions();

                    return;
                }


                if (!name) {

                    alert(
                        "⚠️ Номи худро нависед."
                    );

                    return;
                }


                if (!phone) {

                    alert(
                        "⚠️ Рақами телефонро нависед."
                    );

                    return;
                }


                if (!location) {

                    alert(
                        "⚠️ Шаҳр ё ноҳияро нависед."
                    );

                    return;
                }


                const worker = {

                    id:
                        Date.now(),

                    name:
                        name,

                    phone:
                        phone,

                    location:
                        location,

                    experience:
                        experience ||
                        "1 сол",

                    about:
                        about ||
                        "Устои касбӣ барои иҷрои кори шумо омода аст.",

                    profession:
                        profession,

                    icon:
                        icon ||
                        "🛠️",

                    rating:
                        "5.0",

                    createdAt:
                        new Date()
                            .toLocaleDateString(
                                "tg-TJ"
                            )
                };


                const workers =
                    getData(
                        WORKERS_KEY,
                        []
                    );


                workers.push(
                    worker
                );


                saveData(
                    WORKERS_KEY,
                    workers
                );


                saveData(
                    CURRENT_WORKER_KEY,
                    worker
                );


                localStorage.setItem(
                    ROLE_KEY,
                    "worker"
                );


                alert(
                    "🎉 Профили усто сохта шуд!"
                );


                showWorkerDashboard(
                    worker
                );

            }
        );
    }



    /* =====================================================
       DASHBOARD УСТО
    ===================================================== */

    function showWorkerDashboard(
        worker
    ) {

        hideAllPages();


        if (workerPage) {

            workerPage.classList.remove(
                "hidden"
            );
        }


        const icon =
            document.getElementById(
                "workerHeroIcon"
            );

        const name =
            document.getElementById(
                "workerHeroName"
            );

        const profession =
            document.getElementById(
                "workerHeroProfession"
            );

        const experience =
            document.getElementById(
                "experienceStat"
            );


        if (icon) {

            icon.textContent =
                worker.icon ||
                "🛠️";
        }


        if (name) {

            name.textContent =
                worker.name;
        }


        if (profession) {

            profession.textContent =
                worker.profession;
        }


        if (experience) {

            experience.textContent =
                worker.experience;
        }


        renderWorkerProfile(
            worker
        );


        renderWorkerOrders(
            worker.id
        );


        window.scrollTo(
            0,
            0
        );
    }



    /* =====================================================
       ПРОФИЛИ УСТО
    ===================================================== */

    function renderWorkerProfile(
        worker
    ) {

        const box =
            document.getElementById(
                "workerProfileInfo"
            );


        if (!box) {
            return;
        }


        box.innerHTML = `

            <div class="profile-item">

                <span>
                    👤 Ном
                </span>

                <strong>
                    ${escapeHtml(
                        worker.name
                    )}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    🛠️ Касб
                </span>

                <strong>
                    ${escapeHtml(
                        worker.profession
                    )}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    📞 Телефон
                </span>

                <strong>
                    ${escapeHtml(
                        worker.phone
                    )}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    📍 Ҷой
                </span>

                <strong>
                    ${escapeHtml(
                        worker.location
                    )}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    ⏱️ Таҷриба
                </span>

                <strong>
                    ${escapeHtml(
                        worker.experience
                    )}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    ⭐ Рейтинг
                </span>

                <strong>
                    ${escapeHtml(
                        worker.rating ||
                        "5.0"
                    )}
                </strong>

            </div>

        `;
    }



    /* =====================================================
       БАРОМАДИ УСТО
    ===================================================== */

    const workerLogout =
        document.getElementById(
            "workerLogout"
        );


    if (workerLogout) {

        workerLogout.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    ROLE_KEY
                );

                localStorage.removeItem(
                    CURRENT_WORKER_KEY
                );

                showWelcome();

            }
        );
    }



    /* =====================================================
       БАРОМАДИ МИЗОҶ
    ===================================================== */

    const customerLogout =
        document.getElementById(
            "customerLogout"
        );


    if (customerLogout) {

        customerLogout.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    ROLE_KEY
                );

                showWelcome();

            }
        );
    }



    /* =====================================================
       ГИРИФТАНИ УСТОҲО
    ===================================================== */

    function loadWorkers() {

        const workers =
            getData(
                WORKERS_KEY,
                []
            );


        renderWorkers(
            workers
        );
    }



    /* =====================================================
       НИШОН ДОДАНИ УСТОҲО
    ===================================================== */

    function renderWorkers(
        workers
    ) {

        const list =
            document.getElementById(
                "workersList"
            );

        const empty =
            document.getElementById(
                "emptyWorkers"
            );

        const count =
            document.getElementById(
                "workerCount"
            );


        if (!list) {
            return;
        }


        list.innerHTML =
            "";


        if (count) {

            count.textContent =
                workers.length +
                " усто";
        }


        if (workers.length === 0) {

            if (empty) {

                empty.style.display =
                    "block";
            }

            return;
        }


        if (empty) {

            empty.style.display =
                "none";
        }


        workers.forEach(
            function (worker) {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "worker-card";


                card.innerHTML = `

                    <div class="worker-top">

                        <div class="worker-avatar">

                            ${worker.icon || "🛠️"}

                        </div>


                        <div class="worker-title">

                            <div class="worker-name">

                                ${escapeHtml(
                                    worker.name
                                )}

                            </div>


                            <div class="worker-profession">

                                ${escapeHtml(
                                    worker.profession
                                )}

                            </div>

                        </div>

                    </div>


                    <div class="rating">

                        ⭐
                        ${escapeHtml(
                            worker.rating ||
                            "5.0"
                        )}

                        <span
                            style="
                                color:#788694
                            "
                        >
                            • рейтинг
                        </span>

                    </div>


                    <div class="worker-info">

                        <div>

                            📍
                            ${escapeHtml(
                                worker.location
                            )}

                        </div>


                        <div>

                            📞
                            ${escapeHtml(
                                worker.phone
                            )}

                        </div>


                        <div>

                            ⏱️ Таҷриба:
                            ${escapeHtml(
                                worker.experience
                            )}

                        </div>

                    </div>


                    <div class="worker-about">

                        ${escapeHtml(
                            worker.about
                        )}

                    </div>


                    <div class="worker-buttons">

                        <a
                            href="tel:${escapeHtml(
                                worker.phone
                            )}"
                            class="phone-button"
                        >
                            📞 Телефон
                        </a>


                        <button
                            class="order-button"
                            data-id="${worker.id}"
                            type="button"
                        >
                            📦 Фармоиш
                        </button>

                    </div>


                    <button
                        class="cart-worker-button"
                        data-id="${worker.id}"
                        type="button"
                    >
                        🛒 Ба корзина
                    </button>

                `;


                list.appendChild(
                    card
                );

            }
        );



        /* =================================================
           ФАРМОИШ
        ================================================= */

        list
            .querySelectorAll(
                ".order-button"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                Number(
                                    button.dataset.id
                                );


                            const worker =
                                workers.find(
                                    function (item) {

                                        return (
                                            item.id ===
                                            id
                                        );
                                    }
                                );


                            if (worker) {

                                openOrderModal(
                                    worker
                                );
                            }

                        }
                    );

                }
            );



        /* =================================================
           КОРЗИНА
        ================================================= */

        list
            .querySelectorAll(
                ".cart-worker-button"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                Number(
                                    button.dataset.id
                                );


                            const worker =
                                workers.find(
                                    function (item) {

                                        return (
                                            item.id ===
                                            id
                                        );
                                    }
                                );


                            if (worker) {

                                addToCart(
                                    worker
                                );
                            }

                        }
                    );

                }
            );

    }



    /* =====================================================
       ҶУСТУҶӮ
    ===================================================== */

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    function searchWorkers() {

        if (!searchInput) {
            return;
        }


        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        const workers =
            getData(
                WORKERS_KEY,
                []
            );


        if (!query) {

            renderWorkers(
                workers
            );

            return;
        }


        const result =
            workers.filter(
                function (worker) {

                    return (

                        String(
                            worker.name ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                query
                            )

                        ||

                        String(
                            worker.profession ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                query
                            )

                        ||

                        String(
                            worker.location ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                query
                            )

                        ||

                        String(
                            worker.about ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                query
                            )

                    );

                }
            );


        renderWorkers(
            result
        );
    }



    const searchButton =
        document.getElementById(
            "searchButton"
        );


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            searchWorkers
        );
    }



    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    searchWorkers();
                }

            }
        );
    }



    /* =====================================================
       КАТЕГОРИЯҲО
    ===================================================== */

    document
        .querySelectorAll(
            ".category-grid button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const category =
                            button.dataset.category;


                        if (searchInput) {

                            searchInput.value =
                                category;
                        }


                        searchWorkers();


                        const searchPanel =
                            document.getElementById(
                                "searchPanel"
                            );


                        if (searchPanel) {

                            searchPanel.scrollIntoView({
                                behavior:
                                    "smooth"
                            });
                        }

                    }
                );

            }
        );



    /* =====================================================
       FIND WORKER
    ===================================================== */

    const findWorkerButton =
        document.getElementById(
            "findWorkerButton"
        );


    if (findWorkerButton) {

        findWorkerButton.addEventListener(
            "click",
            function () {

                const searchPanel =
                    document.getElementById(
                        "searchPanel"
                    );


                if (searchPanel) {

                    searchPanel.scrollIntoView({
                        behavior:
                            "smooth"
                    });
                }


                setTimeout(
                    function () {

                        if (searchInput) {

                            searchInput.focus();
                        }

                    },
                    400
                );

            }
        );
    }



    /* =====================================================
       КОРЗИНА
    ===================================================== */

    let cart =
        getData(
            CART_KEY,
            []
        );


    function updateCartCount() {

        const cartCount =
            document.getElementById(
                "cartCount"
            );


        if (cartCount) {

            cartCount.textContent =
                cart.length;
        }
    }



    function addToCart(
        worker
    ) {

        const exists =
            cart.some(
                function (item) {

                    return (
                        item.id ===
                        worker.id
                    );

                }
            );


        if (exists) {

            alert(
                "🛒 Ин усто аллакай дар корзина ҳаст."
            );

            return;
        }


        cart.push(
            worker
        );


        saveData(
            CART_KEY,
            cart
        );


        updateCartCount();


        alert(
            "🛒 " +
            worker.name +
            " ба корзина илова шуд!"
        );
    }



    function renderCart() {

        const items =
            document.getElementById(
                "cartItems"
            );

        const empty =
            document.getElementById(
                "cartEmpty"
            );


        if (!items) {
            return;
        }


        items.innerHTML =
            "";


        if (
            cart.length ===
            0
        ) {

            if (empty) {

                empty.style.display =
                    "block";
            }

            return;
        }


        if (empty) {

            empty.style.display =
                "none";
        }


        cart.forEach(
            function (worker) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "cart-item";


                item.innerHTML = `

                    <div
                        class="cart-item-icon"
                    >

                        ${worker.icon || "🛠️"}

                    </div>


                    <div
                        class="cart-item-info"
                    >

                        <strong>

                            ${escapeHtml(
                                worker.name
                            )}

                        </strong>


                        <span>

                            ${escapeHtml(
                                worker.profession
                            )}

                        </span>

                    </div>


                    <button
                        class="remove-cart"
                        data-id="${worker.id}"
                        type="button"
                    >
                        🗑️
                    </button>

                `;


                items.appendChild(
                    item
                );
            }
        );



        items
            .querySelectorAll(
                ".remove-cart"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const id =
                                Number(
                                    button.dataset.id
                                );


                            cart =
                                cart.filter(
                                    function (item) {

                                        return (
                                            item.id !==
                                            id
                                        );

                                    }
                                );


                            saveData(
                                CART_KEY,
                                cart
                            );


                            updateCartCount();


                            renderCart();

                        }
                    );

                }
            );
    }



    const cartButton =
        document.getElementById(
            "cartButton"
        );


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            function () {

                renderCart();

                openModal(
                    "cartModal"
                );

            }
        );
    }



    /* =====================================================
       REGISTRATION
    ===================================================== */

    const registerButton =
        document.getElementById(
            "registerButton"
        );


    if (registerButton) {

        registerButton.addEventListener(
            "click",
            function () {

                openModal(
                    "registrationModal"
                );

            }
        );
    }



    /* =====================================================
       GOOGLE
    ===================================================== */

    const googleButton =
        document.getElementById(
            "googleButton"
        );


    if (googleButton) {

        googleButton.addEventListener(
            "click",
            function () {

                alert(
                    "🔵 Барои Google Login аввал Google Client ID пайваст кардан лозим аст."
                );

            }
        );
    }



    /* =====================================================
       РЕГИСТРАТСИЯ БО ТЕЛЕФОН
    ===================================================== */

    const phoneButton =
        document.getElementById(
            "phoneButton"
        );


    if (phoneButton) {

        phoneButton.addEventListener(
            "click",
            function () {

                const phone =
                    prompt(
                        "📞 Рақами телефони худро навис:"
                    );


                if (!phone) {
                    return;
                }


                saveData(
                    CUSTOMER_KEY,
                    {
                        type:
                            "phone",

                        value:
                            phone
                    }
                );


                closeModal(
                    "registrationModal"
                );


                alert(
                    "✅ Регистрация анҷом шуд!"
                );

            }
        );
    }



    /* =====================================================
       РЕГИСТРАТСИЯ БО EMAIL
    ===================================================== */

    const emailButton =
        document.getElementById(
            "emailButton"
        );


    if (emailButton) {

        emailButton.addEventListener(
            "click",
            function () {

                const email =
                    prompt(
                        "📧 Email-и худро навис:"
                    );


                if (!email) {
                    return;
                }


                saveData(
                    CUSTOMER_KEY,
                    {
                        type:
                            "email",

                        value:
                            email
                    }
                );


                closeModal(
                    "registrationModal"
                );


                alert(
                    "✅ Регистрация анҷом шуд!"
                );

            }
        );
    }



    /* =====================================================
       ФАРМОИШ
    ===================================================== */

    let selectedWorker =
        null;



    function openOrderModal(
        worker
    ) {

        selectedWorker =
            worker;


        const title =
            document.getElementById(
                "orderWorkerTitle"
            );


        if (title) {

            title.textContent =
                "📦 Фармоиш ба " +
                worker.name;
        }


        openModal(
            "orderModal"
        );
    }



    const sendOrder =
        document.getElementById(
            "sendOrder"
        );


    if (sendOrder) {

        sendOrder.addEventListener(
            "click",
            function () {

                if (!selectedWorker) {
                    return;
                }


                const customerName =
                    document.getElementById(
                        "customerName"
                    );


                const customerPhone =
                    document.getElementById(
                        "customerPhone"
                    );


                const orderAddress =
                    document.getElementById(
                        "orderAddress"
                    );


                const orderDescription =
                    document.getElementById(
                        "orderDescription"
                    );


                const name =
                    customerName
                        ? customerName.value.trim()
                        : "";


                const phone =
                    customerPhone
                        ? customerPhone.value.trim()
                        : "";


                const address =
                    orderAddress
                        ? orderAddress.value.trim()
                        : "";


                const description =
                    orderDescription
                        ? orderDescription.value.trim()
                        : "";


                if (!name) {

                    alert(
                        "⚠️ Номи худро нависед."
                    );

                    return;
                }


                if (!phone) {

                    alert(
                        "⚠️ Телефони худро нависед."
                    );

                    return;
                }


                if (!address) {

                    alert(
                        "⚠️ Суроғаро нависед."
                    );

                    return;
                }


                if (!description) {

                    alert(
                        "⚠️ Кори лозимаро нависед."
                    );

                    return;
                }


                const orders =
                    getData(
                        ORDERS_KEY,
                        []
                    );


                const newOrder = {

                    id:
                        Date.now(),

                    workerId:
                        selectedWorker.id,

                    workerName:
                        selectedWorker.name,

                    workerPhone:
                        selectedWorker.phone,

                    customerName:
                        name,

                    customerPhone:
                        phone,

                    address:
                        address,

                    description:
                        description,

                    status:
                        "pending",

                    createdAt:
                        new Date()
                            .toLocaleString(
                                "tg-TJ"
                            )
                };


                orders.push(
                    newOrder
                );


                saveData(
                    ORDERS_KEY,
                    orders
                );


                closeModal(
                    "orderModal"
                );


                if (customerName) {
                    customerName.value =
                        "";
                }


                if (customerPhone) {
                    customerPhone.value =
                        "";
                }


                if (orderAddress) {
                    orderAddress.value =
                        "";
                }


                if (orderDescription) {
                    orderDescription.value =
                        "";
                }


                alert(
                    "🎉 Фармоиш фиристода шуд!"
                );


                selectedWorker =
                    null;

            }
        );
    }



    /* =====================================================
       ФАРМОИШҲОИ УСТО
    ===================================================== */

    function renderWorkerOrders(
        workerId
    ) {

        const orders =
            getData(
                ORDERS_KEY,
                []
            );


        const myOrders =
            orders.filter(
                function (order) {

                    return (
                        order.workerId ===
                        workerId
                    );

                }
            );


        const list =
            document.getElementById(
                "workerOrders"
            );


        const empty =
            document.getElementById(
                "emptyOrders"
            );


        const pendingCount =
            document.getElementById(
                "pendingCount"
            );


        if (!list) {
            return;
        }


        const pending =
            myOrders.filter(
                function (order) {

                    return (
                        order.status ===
                        "pending"
                    );

                }
            ).length;


        if (pendingCount) {

            pendingCount.textContent =
                pending;
        }


        list.innerHTML =
            "";


        if (
            myOrders.length ===
            0
        ) {

            if (empty) {

                empty.style.display =
                    "block";
            }

            return;
        }


        if (empty) {

            empty.style.display =
                "none";
        }


        myOrders.forEach(
            function (order) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "order-card";


                let statusText =
                    "⏳ Интизор";


                let statusClass =
                    "pending";


                if (
                    order.status ===
                    "accepted"
                ) {

                    statusText =
                        "✅ Қабул шуд";

                    statusClass =
                        "accepted";
                }


                if (
                    order.status ===
                    "rejected"
                ) {

                    statusText =
                        "❌ Рад шуд";

                    statusClass =
                        "rejected";
                }


                card.innerHTML = `

                    <h3>

                        📦 Фармоиш аз

                        ${escapeHtml(
                            order.customerName
                        )}

                    </h3>


                    <div
                        class="order-details"
                    >

                        <div>

                            📞
                            ${escapeHtml(
                                order.customerPhone
                            )}

                        </div>


                        <div>

                            📍
                            ${escapeHtml(
                                order.address
                            )}

                        </div>


                        <div>

                            📝
                            ${escapeHtml(
                                order.description
                            )}

                        </div>


                        <div>

                            🕐
                            ${escapeHtml(
                                order.createdAt
                            )}

                        </div>

                    </div>


                    <div
                        class="status ${statusClass}"
                    >

                        ${statusText}

                    </div>


                    ${
                        order.status ===
                        "pending"

                        ?

                        `

                        <div
                            class="order-actions"
                        >

                            <button
                                class="accept"
                                data-id="${order.id}"
                                type="button"
                            >
                                ✅ Қабул кардан
                            </button>


                            <button
                                class="reject"
                                data-id="${order.id}"
                                type="button"
                            >
                                ❌ Рад кардан
                            </button>

                        </div>

                        `

                        :

                        ""
                    }

                `;


                list.appendChild(
                    card
                );

            }
        );



        /* ҚАБУЛ */

        list
            .querySelectorAll(
                ".accept"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            updateOrder(
                                Number(
                                    button.dataset.id
                                ),
                                "accepted"
                            );

                        }
                    );

                }
            );



        /* РАД */

        list
            .querySelectorAll(
                ".reject"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            updateOrder(
                                Number(
                                    button.dataset.id
                                ),
                                "rejected"
                            );

                        }
                    );

                }
            );

    }



    /* =====================================================
       НАВ КАРДАНИ ҲОЛАТИ ФАРМОИШ
    ===================================================== */

    function updateOrder(
        id,
        status
    ) {

        const orders =
            getData(
                ORDERS_KEY,
                []
            );


        const order =
            orders.find(
                function (item) {

                    return (
                        item.id ===
                        id
                    );

                }
            );


        if (!order) {
            return;
        }


        order.status =
            status;


        saveData(
            ORDERS_KEY,
            orders
        );


        const worker =
            getData(
                CURRENT_WORKER_KEY,
                null
            );


        if (worker) {

            showWorkerDashboard(
                worker
            );
        }

    }



    /* =====================================================
       ФАРМОИШҲОИ МИЗОҶ
    ===================================================== */

    const ordersButton =
        document.getElementById(
            "ordersButton"
        );


    if (ordersButton) {

        ordersButton.addEventListener(
            "click",
            function () {

                const orders =
                    getData(
                        ORDERS_KEY,
                        []
                    );


                if (
                    orders.length ===
                    0
                ) {

                    alert(
                        "📦 Ҳоло шумо фармоиш надоред."
                    );

                    return;
                }


                let message =
                    "📦 ФАРМОИШҲОИ ШУМО\n\n";


                orders.forEach(
                    function (
                        order,
                        index
                    ) {

                        let status =
                            "⏳ Интизор";


                        if (
                            order.status ===
                            "accepted"
                        ) {

                            status =
                                "✅ Қабул шуд";
                        }


                        if (
                            order.status ===
                            "rejected"
                        ) {

                            status =
                                "❌ Рад шуд";
                        }


                        message +=
                            (
                                index +
                                1
                            ) +
                            ". 👨‍🔧 " +
                            order.workerName +
                            "\n";


                        message +=
                            "📍 " +
                            order.address +
                            "\n";


                        message +=
                            status +
                            "\n\n";

                    }
                );


                alert(
                    message
                );

            }
        );
    }



    /* =====================================================
       ПРОФИЛИ МИЗОҶ
    ===================================================== */

    const profileButton =
        document.getElementById(
            "profileButton"
        );


    if (profileButton) {

        profileButton.addEventListener(
            "click",
            function () {

                renderCustomerProfile();

                openModal(
                    "profileModal"
                );

            }
        );
    }



    function renderCustomerProfile() {

        const box =
            document.getElementById(
                "customerProfile"
            );


        if (!box) {
            return;
        }


        const customer =
            getData(
                CUSTOMER_KEY,
                null
            );


        if (!customer) {

            box.innerHTML = `

                <div
                    class="profile-line"
                    style="text-align:center"
                >

                    <span>
                        Ҳолат
                    </span>


                    <strong>
                        👤 Ҳоло регистрация нашудааст
                    </strong>

                </div>

            `;

            return;
        }


        box.innerHTML = `

            <div class="profile-line">

                <span>
                    Навъи регистрация
                </span>


                <strong>

                    ${
                        customer.type ===
                        "phone"

                        ? "📞 Телефон"

                        : "📧 Email"
                    }

                </strong>

            </div>


            <div class="profile-line">

                <span>
                    Маълумот
                </span>


                <strong>

                    ${escapeHtml(
                        customer.value
                    )}

                </strong>

            </div>


            <div class="profile-line">

                <span>
                    Ҳолат
                </span>


                <strong
                    style="color:#35df99"
                >

                    ✅ Регистрация шудааст

                </strong>

            </div>

        `;
    }



    /* =====================================================
       MODAL
    ===================================================== */

    function openModal(
        id
    ) {

        const modal =
            document.getElementById(
                id
            );


        if (!modal) {
            return;
        }


        modal.classList.add(
            "show"
        );
    }



    function closeModal(
        id
    ) {

        const modal =
            document.getElementById(
                id
            );


        if (!modal) {
            return;
        }


        modal.classList.remove(
            "show"
        );
    }



    /* =====================================================
       БАСТАНИ REGISTRATION
    ===================================================== */

    const closeRegistration =
        document.getElementById(
            "closeRegistration"
        );


    if (closeRegistration) {

        closeRegistration.addEventListener(
            "click",
            function () {

                closeModal(
                    "registrationModal"
                );

            }
        );
    }



    /* =====================================================
       БАСТАНИ ORDER
    ===================================================== */

    const closeOrder =
        document.getElementById(
            "closeOrder"
        );


    if (closeOrder) {

        closeOrder.addEventListener(
            "click",
            function () {

                closeModal(
                    "orderModal"
                );

            }
        );
    }



    /* =====================================================
       БАСТАНИ CART
    ===================================================== */

    const closeCart =
        document.getElementById(
            "closeCart"
        );


    if (closeCart) {

        closeCart.addEventListener(
            "click",
            function () {

                closeModal(
                    "cartModal"
                );

            }
        );
    }



    /* =====================================================
       БАСТАНИ PROFILE
    ===================================================== */

    const closeProfile =
        document.getElementById(
            "closeProfile"
        );


    if (closeProfile) {

        closeProfile.addEventListener(
            "click",
            function () {

                closeModal(
                    "profileModal"
                );

            }
        );
    }



    /* =====================================================
       БОЗГАШТАН АЗ БЕРУНИ MODAL
    ===================================================== */

    document
        .querySelectorAll(
            ".modal"
        )
        .forEach(
            function (modal) {

                modal.addEventListener(
                    "click",
                    function (event) {

                        if (
                            event.target ===
                            modal
                        ) {

                            modal.classList.remove(
                                "show"
                            );

                        }

                    }
                );

            }
        );



    /* =====================================================
       👑 ADMIN — ПИНҲОНӢ
       
       ЯГОН ТУГМАИ ADMIN ДАР САЙТ НЕСТ.

       CTRL + SHIFT + A
    ===================================================== */

    function openHiddenAdmin() {

        const password =
            prompt(
                "👑 USTOYOB ADMIN\n\n" +
                "Пароли админро ворид кунед:"
            );


        if (
            password ===
            null
        ) {

            return;
        }


        if (
            password !==
            ADMIN_PASSWORD
        ) {

            alert(
                "❌ Парол нодуруст аст!"
            );

            return;
        }


        adminMode =
            true;


        alert(
            "✅ Хуш омадед, Админ!"
        );


        openAdminPanel();
    }



    /* =====================================================
       ADMIN PANEL
    ===================================================== */

    function openAdminPanel() {

        if (!adminMode) {
            return;
        }


        let panel =
            document.getElementById(
                "hiddenAdminPanel"
            );


        if (!panel) {

            panel =
                document.createElement(
                    "div"
                );


            panel.id =
                "hiddenAdminPanel";


            panel.style.cssText = `

                position:fixed;

                inset:0;

                z-index:999999;

                background:
                    linear-gradient(
                        135deg,
                        #020617,
                        #0f172a,
                        #111827
                    );

                color:white;

                overflow:auto;

                padding:25px;

                font-family:
                    Arial,
                    sans-serif;

            `;


            document.body.appendChild(
                panel
            );
        }


        const workers =
            getData(
                WORKERS_KEY,
                []
            );


        const orders =
            getData(
                ORDERS_KEY,
                []
            );


        const pending =
            orders.filter(
                function (order) {

                    return (
                        order.status ===
                        "pending"
                    );

                }
            ).length;


        const accepted =
            orders.filter(
                function (order) {

                    return (
                        order.status ===
                        "accepted"
                    );

                }
            ).length;


        const rejected =
            orders.filter(
                function (order) {

                    return (
                        order.status ===
                        "rejected"
                    );

                }
            ).length;



        panel.innerHTML = `

            <div
                style="
                    max-width:1100px;
                    margin:0 auto;
                "
            >

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        gap:15px;
                        margin-bottom:25px;
                        flex-wrap:wrap;
                    "
                >

                    <div>

                        <div
                            style="
                                color:#38bdf8;
                                font-size:14px;
                                margin-bottom:6px;
                            "
                        >
                            🔒 PRIVATE AREA
                        </div>


                        <h1
                            style="
                                margin:0;
                                font-size:30px;
                            "
                        >
                            👑 USTOYOB ADMIN
                        </h1>


                        <p
                            style="
                                color:#94a3b8;
                                margin-top:8px;
                            "
                        >
                            Панели идоракунии махфӣ
                        </p>

                    </div>


                    <button
                        id="closeHiddenAdmin"
                        type="button"
                        style="
                            border:none;
                            background:#ef4444;
                            color:white;
                            padding:12px 20px;
                            border-radius:12px;
                            cursor:pointer;
                            font-size:15px;
                            font-weight:bold;
                        "
                    >
                        ✕ Баромадан
                    </button>

                </div>



                <div
                    style="
                        display:grid;
                        grid-template-columns:
                            repeat(
                                auto-fit,
                                minmax(
                                    180px,
                                    1fr
                                )
                            );
                        gap:15px;
                        margin-bottom:30px;
                    "
                >

                    <div
                        style="
                            background:#0f2740;
                            border:1px solid #155e75;
                            border-radius:18px;
                            padding:20px;
                        "
                    >

                        <div
                            style="
                                font-size:28px;
                            "
                        >
                            👷
                        </div>

                        <div
                            style="
                                color:#94a3b8;
                                margin-top:8px;
                            "
                        >
                            Ҳамаи устоҳо
                        </div>

                        <strong
                            style="
                                font-size:28px;
                            "
                        >
                            ${workers.length}
                        </strong>

                    </div>


                    <div
                        style="
                            background:#30230b;
                            border:1px solid #854d0e;
                            border-radius:18px;
                            padding:20px;
                        "
                    >

                        <div
                            style="
                                font-size:28px;
                            "
                        >
                            ⏳
                        </div>

                        <div
                            style="
                                color:#94a3b8;
                                margin-top:8px;
                            "
                        >
                            Интизор
                        </div>

                        <strong
                            style="
                                font-size:28px;
                            "
                        >
                            ${pending}
                        </strong>

                    </div>


                    <div
                        style="
                            background:#052e1b;
                            border:1px solid #047857;
                            border-radius:18px;
                            padding:20px;
                        "
                    >

                        <div
                            style="
                                font-size:28px;
                            "
                        >
                            ✅
                        </div>

                        <div
                            style="
                                color:#94a3b8;
                                margin-top:8px;
                            "
                        >
                            Қабулшуда
                        </div>

                        <strong
                            style="
                                font-size:28px;
                            "
                        >
                            ${accepted}
                        </strong>

                    </div>


                    <div
                        style="
                            background:#3f1111;
                            border:1px solid #991b1b;
                            border-radius:18px;
                            padding:20px;
                        "
                    >

                        <div
                            style="
                                font-size:28px;
                            "
                        >
                            ❌
                        </div>

                        <div
                            style="
                                color:#94a3b8;
                                margin-top:8px;
                            "
                        >
                            Радшуда
                        </div>

                        <strong
                            style="
                                font-size:28px;
                            "
                        >
                            ${rejected}
                        </strong>

                    </div>

                </div>



                <div
                    style="
                        display:flex;
                        gap:10px;
                        flex-wrap:wrap;
                        margin-bottom:25px;
                    "
                >

                    <button
                        id="adminRefresh"
                        type="button"
                        style="
                            border:none;
                            background:#2563eb;
                            color:white;
                            padding:12px 18px;
                            border-radius:12px;
                            cursor:pointer;
                            font-weight:bold;
                        "
                    >
                        🔄 Навсозӣ
                    </button>


                    <button
                        id="adminLogout"
                        type="button"
                        style="
                            border:none;
                            background:#475569;
                            color:white;
                            padding:12px 18px;
                            border-radius:12px;
                            cursor:pointer;
                            font-weight:bold;
                        "
                    >
                        🔐 Қулф кардан
                    </button>

                </div>



                <div
                    style="
                        background:#0b1220;
                        border:1px solid #1e293b;
                        border-radius:20px;
                        padding:20px;
                        margin-bottom:25px;
                    "
                >

                    <h2
                        style="
                            margin-top:0;
                        "
                    >
                        👷 Рӯйхати устоҳо
                    </h2>


                    <div
                        id="adminWorkersList"
                    >
                    </div>

                </div>



                <div
                    style="
                        background:#0b1220;
                        border:1px solid #1e293b;
                        border-radius:20px;
                        padding:20px;
                    "
                >

                    <h2
                        style="
                            margin-top:0;
                        "
                    >
                        📦 Ҳамаи фармоишҳо
                    </h2>


                    <div
                        id="adminOrdersList"
                    >
                    </div>

                </div>

            </div>

        `;



        /* =================================================
           НИШОН ДОДАНИ УСТОҲО
        ================================================= */

        const adminWorkersList =
            document.getElementById(
                "adminWorkersList"
            );


        if (
            adminWorkersList
        ) {

            if (
                workers.length ===
                0
            ) {

                adminWorkersList.innerHTML = `

                    <div
                        style="
                            text-align:center;
                            color:#94a3b8;
                            padding:30px;
                        "
                    >
                        👷 Ҳоло усто нест.
                    </div>

                `;

            } else {

                adminWorkersList.innerHTML =
                    workers.map(
                        function (worker) {

                            return `

                                <div
                                    style="
                                        display:flex;
                                        align-items:center;
                                        gap:15px;
                                        padding:15px;
                                        margin-bottom:10px;
                                        background:#111827;
                                        border:1px solid #1e293b;
                                        border-radius:15px;
                                        flex-wrap:wrap;
                                    "
                                >

                                    <div
                                        style="
                                            width:50px;
                                            height:50px;
                                            display:flex;
                                            align-items:center;
                                            justify-content:center;
                                            background:#172554;
                                            border-radius:14px;
                                            font-size:25px;
                                        "
                                    >
                                        ${worker.icon || "🛠️"}
                                    </div>


                                    <div
                                        style="
                                            flex:1;
                                            min-width:180px;
                                        "
                                    >

                                        <strong>
                                            ${escapeHtml(
                                                worker.name
                                            )}
                                        </strong>


                                        <div
                                            style="
                                                color:#38bdf8;
                                                margin-top:4px;
                                            "
                                        >
                                            ${escapeHtml(
                                                worker.profession
                                            )}
                                        </div>


                                        <div
                                            style="
                                                color:#94a3b8;
                                                margin-top:4px;
                                                font-size:13px;
                                            "
                                        >
                                            📍
                                            ${escapeHtml(
                                                worker.location
                                            )}
                                            <br>

                                            📞
                                            ${escapeHtml(
                                                worker.phone
                                            )}
                                        </div>

                                    </div>


                                    <button
                                        class="admin-delete-worker"
                                        data-id="${worker.id}"
                                        type="button"
                                        style="
                                            border:none;
                                            background:#dc2626;
                                            color:white;
                                            padding:10px 15px;
                                            border-radius:10px;
                                            cursor:pointer;
                                            font-weight:bold;
                                        "
                                    >
                                        🗑️ Нест кардан
                                    </button>

                                </div>

                            `;

                        }
                    ).join("");
            }
        }



        /* =================================================
           НИШОН ДОДАНИ ФАРМОИШҲО
        ================================================= */

        const adminOrdersList =
            document.getElementById(
                "adminOrdersList"
            );


        if (
            adminOrdersList
        ) {

            if (
                orders.length ===
                0
            ) {

                adminOrdersList.innerHTML = `

                    <div
                        style="
                            text-align:center;
                            color:#94a3b8;
                            padding:30px;
                        "
                    >
                        📦 Ҳоло фармоиш нест.
                    </div>

                `;

            } else {

                adminOrdersList.innerHTML =
                    orders
                        .slice()
                        .reverse()
                        .map(
                            function (order) {

                                let status =
                                    "⏳ Интизор";

                                let statusColor =
                                    "#f59e0b";


                                if (
                                    order.status ===
                                    "accepted"
                                ) {

                                    status =
                                        "✅ Қабул шуд";

                                    statusColor =
                                        "#22c55e";
                                }


                                if (
                                    order.status ===
                                    "rejected"
                                ) {

                                    status =
                                        "❌ Рад шуд";

                                    statusColor =
                                        "#ef4444";
                                }


                                return `

                                    <div
                                        style="
                                            background:#111827;
                                            border:1px solid #1e293b;
                                            border-radius:15px;
                                            padding:16px;
                                            margin-bottom:12px;
                                        "
                                    >

                                        <div
                                            style="
                                                display:flex;
                                                justify-content:space-between;
                                                gap:10px;
                                                flex-wrap:wrap;
                                            "
                                        >

                                            <strong>
                                                📦
                                                ${escapeHtml(
                                                    order.customerName
                                                )}
                                            </strong>


                                            <span
                                                style="
                                                    color:${statusColor};
                                                    font-weight:bold;
                                                "
                                            >
                                                ${status}
                                            </span>

                                        </div>


                                        <div
                                            style="
                                                color:#94a3b8;
                                                margin-top:10px;
                                                line-height:1.8;
                                            "
                                        >

                                            👷 Усто:
                                            ${escapeHtml(
                                                order.workerName
                                            )}
                                            <br>

                                            📞 Мизоҷ:
                                            ${escapeHtml(
                                                order.customerPhone
                                            )}
                                            <br>

                                            📍 Суроға:
                                            ${escapeHtml(
                                                order.address
                                            )}
                                            <br>

                                            📝 Кор:
                                            ${escapeHtml(
                                                order.description
                                            )}
                                            <br>

                                            🕐
                                            ${escapeHtml(
                                                order.createdAt
                                            )}

                                        </div>

                                    </div>

                                `;

                            }
                        )
                        .join("");
            }
        }



        /* =================================================
           БАСТАНИ ADMIN
        ================================================= */

        const closeHiddenAdmin =
            document.getElementById(
                "closeHiddenAdmin"
            );


        if (
            closeHiddenAdmin
        ) {

            closeHiddenAdmin.addEventListener(
                "click",
                function () {

                    panel.remove();

                }
            );
        }



        /* =================================================
           REFRESH
        ================================================= */

        const adminRefresh =
            document.getElementById(
                "adminRefresh"
            );


        if (
            adminRefresh
        ) {

            adminRefresh.addEventListener(
                "click",
                function () {

                    openAdminPanel();

                }
            );
        }



        /* =================================================
           ҚУЛФ КАРДАН
        ================================================= */

        const adminLogout =
            document.getElementById(
                "adminLogout"
            );


        if (
            adminLogout
        ) {

            adminLogout.addEventListener(
                "click",
                function () {

                    adminMode =
                        false;

                    panel.remove();

                }
            );
        }



        /* =================================================
           НЕСТ КАРДАНИ УСТО
        ================================================= */

        panel
            .querySelectorAll(
                ".admin-delete-worker"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            if (
                                !adminMode
                            ) {
                                return;
                            }


                            const id =
                                Number(
                                    button.dataset.id
                                );


                            const currentWorkers =
                                getData(
                                    WORKERS_KEY,
                                    []
                                );


                            const worker =
                                currentWorkers.find(
                                    function (
                                        item
                                    ) {

                                        return (
                                            item.id ===
                                            id
                                        );

                                    }
                                );


                            if (!worker) {
                                return;
                            }


                            const confirmed =
                                confirm(
                                    "❌ Устои " +
                                    worker.name +
                                    " нест карда шавад?"
                                );


                            if (
                                !confirmed
                            ) {
                                return;
                            }


                            const newWorkers =
                                currentWorkers.filter(
                                    function (
                                        item
                                    ) {

                                        return (
                                            item.id !==
                                            id
                                        );

                                    }
                                );


                            saveData(
                                WORKERS_KEY,
                                newWorkers
                            );


                            const currentWorker =
                                getData(
                                    CURRENT_WORKER_KEY,
                                    null
                                );


                            if (
                                currentWorker &&
                                currentWorker.id ===
                                id
                            ) {

                                localStorage.removeItem(
                                    CURRENT_WORKER_KEY
                                );
                            }


                            alert(
                                "✅ Усто нест карда шуд."
                            );


                            openAdminPanel();

                        }
                    );

                }
            );

    }



    /* =====================================================
       🔐 КЛАВИАТУРАИ ПИНҲОНӢ

       CTRL + SHIFT + A
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (

                event.ctrlKey &&

                event.shiftKey &&

                event.key.toLowerCase() ===
                "a"

            ) {

                event.preventDefault();


                if (
                    adminMode
                ) {

                    openAdminPanel();

                } else {

                    openHiddenAdmin();

                }

            }

        }
    );



    /* =====================================================
       START
    ===================================================== */

    showWelcome();

    updateCartCount();

});