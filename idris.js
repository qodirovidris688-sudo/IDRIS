/* =====================================================
   USTOYOB
   IDRIS.JS — КОДИ ПУРРА
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       LOCAL STORAGE
    ================================================= */

    const WORKERS_KEY = "ustoyobWorkers";
    const ORDERS_KEY = "ustoyobOrders";
    const CART_KEY = "ustoyobCart";
    const CUSTOMER_KEY = "ustoyobCustomer";
    const ROLE_KEY = "ustoyobRole";
    const CURRENT_WORKER_KEY = "ustoyobCurrentWorker";


    /* =================================================
       ФУНКСИЯҲОИ ЁРИРАСОН
    ================================================= */

    function getData(key, fallback) {
        try {
            const data = localStorage.getItem(key);

            if (!data) {
                return fallback;
            }

            return JSON.parse(data);

        } catch (error) {
            console.error(error);
            return fallback;
        }
    }


    function saveData(key, data) {
        localStorage.setItem(
            key,
            JSON.stringify(data)
        );
    }


    function escapeHtml(value) {

        const div = document.createElement("div");

        div.textContent = value ?? "";

        return div.innerHTML;
    }


    /* =================================================
       САҲИФАҲО
    ================================================= */

    const welcomePage =
        document.getElementById("welcomePage");

    const professionPage =
        document.getElementById("professionPage");

    const workerFormPage =
        document.getElementById("workerFormPage");

    const customerPage =
        document.getElementById("customerPage");

    const workerPage =
        document.getElementById("workerPage");


    function hideAllPages() {

        if (welcomePage)
            welcomePage.classList.add("hidden");

        if (professionPage)
            professionPage.classList.add("hidden");

        if (workerFormPage)
            workerFormPage.classList.add("hidden");

        if (customerPage)
            customerPage.classList.add("hidden");

        if (workerPage)
            workerPage.classList.add("hidden");
    }


    /* =================================================
       САҲИФАИ АВВАЛ
    ================================================= */

    function showWelcome() {

        hideAllPages();

        welcomePage.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =================================================
       САҲИФАИ МИЗОҶ
    ================================================= */

    function showCustomer() {

        hideAllPages();

        customerPage.classList.remove("hidden");

        localStorage.setItem(
            ROLE_KEY,
            "customer"
        );

        loadWorkers();

        updateCartCount();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =================================================
       САҲИФАИ ИНТИХОБИ КАСБ
    ================================================= */

    function showProfessions() {

        hideAllPages();

        professionPage.classList.remove("hidden");

        localStorage.setItem(
            ROLE_KEY,
            "worker"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =================================================
       САҲИФАИ ПРОФИЛИ УСТО
    ================================================= */

    function showWorkerForm(
        profession,
        icon
    ) {

        hideAllPages();

        workerFormPage.classList.remove(
            "hidden"
        );

        document.getElementById(
            "chosenProfessionIcon"
        ).textContent = icon;

        document.getElementById(
            "chosenProfessionText"
        ).textContent = profession;

        localStorage.setItem(
            "selectedProfession",
            profession
        );

        localStorage.setItem(
            "selectedProfessionIcon",
            icon
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =================================================
       МИЗОҶ
    ================================================= */

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


    /* =================================================
       УСТО
    ================================================= */

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


    /* =================================================
       БАРГАШТАН АЗ КАСБ
    ================================================= */

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


    /* =================================================
       БАРГАШТАН АЗ ФОРМА
    ================================================= */

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


    /* =================================================
       ИНТИХОБИ КАСБ
    ================================================= */

    document
        .querySelectorAll(".profession-card")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const profession =
                        button.dataset.profession;

                    const icon =
                        button.dataset.icon;

                    showWorkerForm(
                        profession,
                        icon
                    );
                }
            );
        });


    /* =================================================
       СОХТАНИ ПРОФИЛИ УСТО
    ================================================= */

    const createWorker =
        document.getElementById(
            "createWorker"
        );


    if (createWorker) {

        createWorker.addEventListener(
            "click",
            function () {

                const name =
                    document
                        .getElementById(
                            "workerName"
                        )
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById(
                            "workerPhone"
                        )
                        .value
                        .trim();


                const location =
                    document
                        .getElementById(
                            "workerLocation"
                        )
                        .value
                        .trim();


                const experience =
                    document
                        .getElementById(
                            "workerExperience"
                        )
                        .value;


                const about =
                    document
                        .getElementById(
                            "workerAbout"
                        )
                        .value
                        .trim();


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

                    id: Date.now(),

                    name: name,

                    phone: phone,

                    location: location,

                    experience: experience,

                    about:
                        about ||
                        "Устои касбӣ барои иҷрои кори шумо омода аст.",

                    profession: profession,

                    icon:
                        icon || "🛠️",

                    rating: "5.0",

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


                workers.push(worker);


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


    /* =================================================
       DASHBOARD УСТО
    ================================================= */

    function showWorkerDashboard(
        worker
    ) {

        hideAllPages();

        workerPage.classList.remove(
            "hidden"
        );


        document.getElementById(
            "workerHeroIcon"
        ).textContent =
            worker.icon || "🛠️";


        document.getElementById(
            "workerHeroName"
        ).textContent =
            worker.name;


        document.getElementById(
            "workerHeroProfession"
        ).textContent =
            worker.profession;


        document.getElementById(
            "experienceStat"
        ).textContent =
            worker.experience;


        renderWorkerProfile(
            worker
        );


        renderWorkerOrders(
            worker.id
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* =================================================
       ПРОФИЛИ УСТО
    ================================================= */

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
                    ${escapeHtml(worker.name)}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    🛠️ Касб
                </span>

                <strong>
                    ${escapeHtml(worker.profession)}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    📞 Телефон
                </span>

                <strong>
                    ${escapeHtml(worker.phone)}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    📍 Ҷой
                </span>

                <strong>
                    ${escapeHtml(worker.location)}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    ⏱️ Таҷриба
                </span>

                <strong>
                    ${escapeHtml(worker.experience)}
                </strong>

            </div>


            <div class="profile-item">

                <span>
                    ⭐ Рейтинг
                </span>

                <strong>
                    ${escapeHtml(worker.rating)}
                </strong>

            </div>

        `;
    }


    /* =================================================
       БАРОМАДИ УСТО
    ================================================= */

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


    /* =================================================
       БАРОМАДИ МИЗОҶ
    ================================================= */

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


    /* =================================================
       ГИРИФТАНИ УСТОҲО
    ================================================= */

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


    /* =================================================
       НИШОН ДОДАНИ УСТОҲО
    ================================================= */

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


        list.innerHTML = "";


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


                        <div>

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


                        <button
                            class="online-dot delete-worker"
                            data-id="${worker.id}"
                            type="button"
                            title="Нест кардани усто"
                            aria-label="Нест кардани усто"
                        >
                            ×
                        </button>

                    </div>


                    <div class="rating">

                        ⭐
                        ${escapeHtml(
                            worker.rating || "5.0"
                        )}

                        <span style="color:#788694">
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


        /* =============================================
           ФАРМОИШ
        ============================================= */

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
                                            item.id === id
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


        /* =============================================
           КОРЗИНА
        ============================================= */

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
                                            item.id === id
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


        /* =============================================
           ❌ X — НЕСТ КАРДАНИ УСТО
        ============================================= */

        list
            .querySelectorAll(
                ".delete-worker"
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


                            const workersNow =
                                getData(
                                    WORKERS_KEY,
                                    []
                                );


                            const worker =
                                workersNow.find(
                                    function (item) {

                                        return (
                                            item.id === id
                                        );
                                    }
                                );


                            if (!worker) {
                                return;
                            }


                            const answer =
                                confirm(
                                    "❌ Устои «" +
                                    worker.name +
                                    "»-ро нест кардан мехоҳед?"
                                );


                            if (!answer) {
                                return;
                            }


                            const newWorkers =
                                workersNow.filter(
                                    function (item) {

                                        return (
                                            item.id !== id
                                        );
                                    }
                                );


                            saveData(
                                WORKERS_KEY,
                                newWorkers
                            );


                            /* Аз корзина ҳам нест мекунем */

                            cart =
                                cart.filter(
                                    function (item) {

                                        return (
                                            item.id !== id
                                        );
                                    }
                                );


                            saveData(
                                CART_KEY,
                                cart
                            );


                            updateCartCount();


                            renderWorkers(
                                newWorkers
                            );


                            alert(
                                "✅ Усто нест карда шуд."
                            );
                        }
                    );
                }
            );
    }


    /* =================================================
       ҶУСТУҶӮ
    ================================================= */

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

                        worker.name
                            .toLowerCase()
                            .includes(
                                query
                            )

                        ||

                        worker.profession
                            .toLowerCase()
                            .includes(
                                query
                            )

                        ||

                        worker.location
                            .toLowerCase()
                            .includes(
                                query
                            )

                        ||

                        worker.about
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
                    event.key === "Enter"
                ) {

                    searchWorkers();
                }
            }
        );
    }


    /* =================================================
       КАТЕГОРИЯҲО
    ================================================= */

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


                        const panel =
                            document.getElementById(
                                "searchPanel"
                            );


                        if (panel) {

                            panel.scrollIntoView({
                                behavior:
                                    "smooth"
                            });
                        }
                    }
                );
            }
        );


    /* =================================================
       УСТО ҶУСТУҶӮ
    ================================================= */

    const findWorkerButton =
        document.getElementById(
            "findWorkerButton"
        );


    if (findWorkerButton) {

        findWorkerButton.addEventListener(
            "click",
            function () {

                const panel =
                    document.getElementById(
                        "searchPanel"
                    );


                if (panel) {

                    panel.scrollIntoView({
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


    /* =================================================
       КОРЗИНА
    ================================================= */

    let cart =
        getData(
            CART_KEY,
            []
        );


    function updateCartCount() {

        const count =
            document.getElementById(
                "cartCount"
            );


        if (count) {

            count.textContent =
                cart.length;
        }
    }


    function addToCart(worker) {

        const exists =
            cart.some(
                function (item) {

                    return (
                        item.id === worker.id
                    );
                }
            );


        if (exists) {

            alert(
                "🛒 Ин усто аллакай дар корзина ҳаст."
            );

            return;
        }


        cart.push(worker);


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


        if (!items || !empty) {
            return;
        }


        items.innerHTML = "";


        if (cart.length === 0) {

            empty.style.display =
                "block";

            return;
        }


        empty.style.display =
            "none";


        cart.forEach(
            function (worker) {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "cart-item";


                item.innerHTML = `

                    <div class="cart-item-icon">

                        ${worker.icon || "🛠️"}

                    </div>


                    <div class="cart-item-info">

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
                                            item.id !== id
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


    /* =================================================
       РЕГИСТРАЦИЯ
    ================================================= */

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


    /* =================================================
       GOOGLE
    ================================================= */

    const googleButton =
        document.getElementById(
            "googleButton"
        );


    if (googleButton) {

        googleButton.addEventListener(
            "click",
            function () {

                alert(
                    "🔵 Google Login барои пайваст шудан Client ID талаб мекунад."
                );
            }
        );
    }


    /* =================================================
       РЕГИСТРАЦИЯ БО ТЕЛЕФОН
    ================================================= */

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
                        type: "phone",
                        value: phone
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


    /* =================================================
       РЕГИСТРАЦИЯ БО EMAIL
    ================================================= */

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
                        type: "email",
                        value: email
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


    /* =================================================
       ФАРМОИШ
    ================================================= */

    let selectedWorker = null;


    function openOrderModal(worker) {

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


                const name =
                    document
                        .getElementById(
                            "customerName"
                        )
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById(
                            "customerPhone"
                        )
                        .value
                        .trim();


                const address =
                    document
                        .getElementById(
                            "orderAddress"
                        )
                        .value
                        .trim();


                const description =
                    document
                        .getElementById(
                            "orderDescription"
                        )
                        .value
                        .trim();


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

                    id: Date.now(),

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


                document.getElementById(
                    "customerName"
                ).value = "";


                document.getElementById(
                    "customerPhone"
                ).value = "";


                document.getElementById(
                    "orderAddress"
                ).value = "";


                document.getElementById(
                    "orderDescription"
                ).value = "";


                alert(
                    "🎉 Фармоиш фиристода шуд!"
                );


                selectedWorker = null;
            }
        );
    }


    /* =================================================
       ФАРМОИШҲОИ УСТО
    ================================================= */

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
            myOrders.filter(
                function (order) {

                    return (
                        order.status ===
                        "pending"
                    );
                }
            ).length;


        const pending =
            document.getElementById(
                "pendingCount"
            );


        if (pending) {

            pending.textContent =
                pendingCount;
        }


        if (!list) {
            return;
        }


        list.innerHTML = "";


        if (myOrders.length === 0) {

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


                    <div class="order-details">

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


                    <div class="
                        status
                        ${statusClass}
                    ">

                        ${statusText}

                    </div>


                    ${
                        order.status === "pending"

                        ?

                        `
                        <div class="order-actions">

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


        /* =============================================
           ҚАБУЛ КАРДАН
        ============================================= */

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


        /* =============================================
           РАД КАРДАН
        ============================================= */

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


    /* =================================================
       UPDATE ORDER
    ================================================= */

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
                        item.id === id
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


    /* =================================================
       ФАРМОИШҲОИ МИЗОҶ
    ================================================= */

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


                if (orders.length === 0) {

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
                            (index + 1) +
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


    /* =================================================
       ПРОФИЛИ МИЗОҶ
    ================================================= */

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
                        customer.type === "phone"
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


    /* =================================================
       MODAL
    ================================================= */

    function openModal(id) {

        const modal =
            document.getElementById(id);


        if (!modal) {
            return;
        }


        modal.classList.add(
            "show"
        );
    }


    function closeModal(id) {

        const modal =
            document.getElementById(id);


        if (!modal) {
            return;
        }


        modal.classList.remove(
            "show"
        );
    }


    /* =================================================
       CLOSE REGISTRATION
    ================================================= */

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


    /* =================================================
       CLOSE ORDER
    ================================================= */

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


    /* =================================================
       CLOSE CART
    ================================================= */

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


    /* =================================================
       CLOSE PROFILE
    ================================================= */

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


    /* =================================================
       БАРОМАДАН АЗ MODAL
    ================================================= */

    document
        .querySelectorAll(".modal")
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


    /* =================================================
       START
    ================================================= */

    showWelcome();

    updateCartCount();

});