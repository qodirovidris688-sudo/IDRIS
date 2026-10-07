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


        if (
            workers.length ===
            0
        ) {

            if (empty) {

                empty.classList.remove(
                    "hidden"
                );
            }

            return;
        }


        if (empty) {

            empty.classList.add(
                "hidden"
            );
        }


        workers.forEach(
            function (worker) {

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "worker-card";


                card.innerHTML = `

                    <div class="worker-card-top">

                        <div class="worker-card-icon">
                            ${escapeHtml(
                                worker.icon ||
                                "🛠️"
                            )}
                        </div>

                        <div>

                            <div class="worker-card-name">
                                ${escapeHtml(
                                    worker.name
                                )}
                            </div>

                            <div class="worker-card-profession">
                                ${escapeHtml(
                                    worker.profession
                                )}
                            </div>

                        </div>

                    </div>


                    <div class="worker-info">

                        <div class="worker-info-row">
                            📍
                            ${escapeHtml(
                                worker.location
                            )}
                        </div>

                        <div class="worker-info-row">
                            ⭐
                            ${escapeHtml(
                                worker.rating ||
                                "5.0"
                            )}
                        </div>

                        <div class="worker-info-row">
                            ⏱️
                            ${escapeHtml(
                                worker.experience ||
                                "1 сол"
                            )}
                        </div>

                    </div>


                    <div class="worker-about">
                        ${escapeHtml(
                            worker.about ||
                            "Устои касбӣ"
                        )}
                    </div>


                    <div class="worker-card-actions">

                        <button
                            type="button"
                            class="call-worker"
                        >
                            📞 Занг
                        </button>

                        <button
                            type="button"
                            class="order-btn"
                        >
                            📦 Фармоиш
                        </button>

                    </div>

                `;


                const callButton =
                    card.querySelector(
                        ".call-worker"
                    );


                const orderButton =
                    card.querySelector(
                        ".order-btn"
                    );


                if (callButton) {

                    callButton.addEventListener(
                        "click",
                        function () {

                            window.location.href =
                                "tel:" +
                                worker.phone;

                        }
                    );
                }


                if (orderButton) {

                    orderButton.addEventListener(
                        "click",
                        function () {

                            openOrderModal(
                                worker
                            );

                        }
                    );
                }


                list.appendChild(
                    card
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

    const searchButton =
        document.getElementById(
            "searchButton"
        );


    function searchWorkers() {

        const value =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const workers =
            getData(
                WORKERS_KEY,
                []
            );


        if (!value) {

            renderWorkers(
                workers
            );

            return;
        }


        const filtered =
            workers.filter(
                function (worker) {

                    return (

                        String(
                            worker.name ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                value
                            )

                        ||

                        String(
                            worker.profession ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                value
                            )

                        ||

                        String(
                            worker.location ||
                            ""
                        )
                            .toLowerCase()
                            .includes(
                                value
                            )

                    );

                }
            );


        renderWorkers(
            filtered
        );
    }


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
       КАТЕГОРИЯ
    ===================================================== */

    document
        .querySelectorAll(
            "[data-category]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const category =
                            button.dataset.category;

                        const workers =
                            getData(
                                WORKERS_KEY,
                                []
                            );


                        const filtered =
                            workers.filter(
                                function (worker) {

                                    return (
                                        worker.profession ===
                                        category
                                    );

                                }
                            );


                        renderWorkers(
                            filtered
                        );

                    }
                );

            }
        );



    /* =====================================================
       ORDER MODAL
    ===================================================== */

    let selectedWorkerForOrder =
        null;


    function openOrderModal(
        worker
    ) {

        selectedWorkerForOrder =
            worker;


        const modal =
            document.getElementById(
                "orderModal"
            );


        const title =
            document.getElementById(
                "orderWorkerTitle"
            );


        if (title) {

            title.textContent =
                "Фармоиш ба усто: " +
                worker.name;
        }


        if (modal) {

            modal.classList.add(
                "show"
            );
        }

    }
