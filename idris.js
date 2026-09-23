/* =====================================================
   USTOYOB
   FULL JAVASCRIPT
===================================================== */

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
   HELPERS
===================================================== */

function getData(key, fallback) {

    try {

        const data =
            localStorage.getItem(key);

        if (!data) {
            return fallback;
        }

        return JSON.parse(data);

    } catch (error) {

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

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


/* =====================================================
   PAGES
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

    welcomePage.classList.add("hidden");

    professionPage.classList.add("hidden");

    workerFormPage.classList.add("hidden");

    customerPage.classList.add("hidden");

    workerPage.classList.add("hidden");

}


/* =====================================================
   НАВИГАЦИЯ
===================================================== */

function showWelcome() {

    hideAllPages();

    welcomePage.classList.remove("hidden");

    window.scrollTo(0, 0);

}


function showCustomer() {

    hideAllPages();

    customerPage.classList.remove("hidden");

    localStorage.setItem(
        ROLE_KEY,
        "customer"
    );

    loadWorkers();

    updateCartCount();

    window.scrollTo(0, 0);

}


function showProfessions() {

    hideAllPages();

    professionPage.classList.remove("hidden");

    localStorage.setItem(
        ROLE_KEY,
        "worker"
    );

    window.scrollTo(0, 0);

}


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
    ).textContent =
        profession;


    localStorage.setItem(
        "selectedProfession",
        profession
    );


    localStorage.setItem(
        "selectedProfessionIcon",
        icon
    );


    window.scrollTo(0, 0);

}


/* =====================================================
   1. МИЗОҶ
===================================================== */

document
    .getElementById("customerButton")
    .addEventListener(
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


/* =====================================================
   2. УСТО
===================================================== */

document
    .getElementById("workerButton")
    .addEventListener(
        "click",
        function () {

            /*
               ХАТОИ АСОСӢ ДИГАР НЕСТ.

               УСТО ҲЕҶ ГОҲ БА МИЗОҶ НАМЕРАВАД.

               УСТО:
               welcome
                  ↓
               profession
                  ↓
               worker form
                  ↓
               worker dashboard
            */

            localStorage.setItem(
                ROLE_KEY,
                "worker"
            );

            showProfessions();

        }
    );


/* =====================================================
   БАРГАШТАН
===================================================== */

document
    .getElementById("professionBack")
    .addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                ROLE_KEY
            );

            showWelcome();

        }
    );


document
    .getElementById("workerFormBack")
    .addEventListener(
        "click",
        function () {

            showProfessions();

        }
    );


/* =====================================================
   ИНТИХОБИ КАСБ
===================================================== */

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


/* =====================================================
   СОХТАНИ ПРОФИЛИ УСТО
===================================================== */

document
    .getElementById("createWorker")
    .addEventListener(
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


/* =====================================================
   WORKER DASHBOARD
===================================================== */

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


    window.scrollTo(0, 0);

}


/* =====================================================
   WORKER PROFILE
===================================================== */

function renderWorkerProfile(
    worker
) {

    const box =
        document.getElementById(
            "workerProfileInfo"
        );


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


/* =====================================================
   WORKER LOGOUT
===================================================== */

document
    .getElementById("workerLogout")
    .addEventListener(
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


/* =====================================================
   CUSTOMER LOGOUT
===================================================== */

document
    .getElementById("customerLogout")
    .addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                ROLE_KEY
            );

            showWelcome();

        }
    );


/* =====================================================
   LOAD WORKERS
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
   RENDER WORKERS
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


    list.innerHTML = "";


    count.textContent =
        workers.length +
        " усто";


    if (workers.length === 0) {

        empty.style.display =
            "block";

        return;

    }


    empty.style.display =
        "none";


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


                    <div class="online-dot"></div>

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


    /* ORDER BUTTON */

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


    /* CART BUTTON */

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

}


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );


function searchWorkers() {

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


document
    .getElementById("searchButton")
    .addEventListener(
        "click",
        searchWorkers
    );


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


/* =====================================================
   CATEGORIES
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


                    searchInput.value =
                        category;


                    searchWorkers();


                    document
                        .getElementById(
                            "searchPanel"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });

                }
            );

        }
    );


/* =====================================================
   FIND WORKER
===================================================== */

document
    .getElementById(
        "findWorkerButton"
    )
    .addEventListener(
        "click",
        function () {

            document
                .getElementById(
                    "searchPanel"
                )
                .scrollIntoView({
                    behavior:
                        "smooth"
                });


            setTimeout(
                function () {

                    searchInput.focus();

                },
                400
            );

        }
    );


/* =====================================================
   CART
===================================================== */

let cart =
    getData(
        CART_KEY,
        []
    );


function updateCartCount() {

    document.getElementById(
        "cartCount"
    ).textContent =
        cart.length;

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


document
    .getElementById(
        "cartButton"
    )
    .addEventListener(
        "click",
        function () {

            renderCart();

            openModal(
                "cartModal"
            );

        }
    );


/* =====================================================
   REGISTRATION
===================================================== */

document
    .getElementById(
        "registerButton"
    )
    .addEventListener(
        "click",
        function () {

            openModal(
                "registrationModal"
            );

        }
    );


/* GOOGLE */

document
    .getElementById(
        "googleButton"
    )
    .addEventListener(
        "click",
        function () {

            alert(
                "🔵 Google Login ҳоло ба Client ID ниёз дорад. Интерфейс тайёр аст."
            );

        }
    );


/* PHONE */

document
    .getElementById(
        "phoneButton"
    )
    .addEventListener(
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


/* EMAIL */

document
    .getElementById(
        "emailButton"
    )
    .addEventListener(
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


/* =====================================================
   ORDER
===================================================== */

let selectedWorker = null;


function openOrderModal(
    worker
) {

    selectedWorker =
        worker;


    document.getElementById(
        "orderWorkerTitle"
    ).textContent =
        "📦 Фармоиш ба " +
        worker.name;


    openModal(
        "orderModal"
    );

}


document
    .getElementById(
        "sendOrder"
    )
    .addEventListener(
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


            orders.push({

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

            });


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


            selectedWorker =
                null;

        }
    );


/* =====================================================
   WORKER ORDERS
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


    const pending =
        myOrders.filter(
            function (order) {

                return (
                    order.status ===
                    "pending"
                );

            }
        ).length;


    document.getElementById(
        "pendingCount"
    ).textContent =
        pending;


    list.innerHTML = "";


    if (myOrders.length === 0) {

        empty.style.display =
            "block";

        return;

    }


    empty.style.display =
        "none";


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
   UPDATE ORDER
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


/* =====================================================
   CUSTOMER ORDERS
===================================================== */

document
    .getElementById(
        "ordersButton"
    )
    .addEventListener(
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
                function (order, index) {

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


/* =====================================================
   CUSTOMER PROFILE
===================================================== */

document
    .getElementById(
        "profileButton"
    )
    .addEventListener(
        "click",
        function () {

            renderCustomerProfile();

            openModal(
                "profileModal"
            );

        }
    );


function renderCustomerProfile() {

    const box =
        document.getElementById(
            "customerProfile"
        );


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


/* =====================================================
   MODAL
===================================================== */

function openModal(id) {

    document
        .getElementById(id)
        .classList.add("show");

}


function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");

}


/* =====================================================
   CLOSE MODALS
===================================================== */

document
    .getElementById(
        "closeRegistration"
    )
    .addEventListener(
        "click",
        function () {

            closeModal(
                "registrationModal"
            );

        }
    );


document
    .getElementById(
        "closeOrder"
    )
    .addEventListener(
        "click",
        function () {

            closeModal(
                "orderModal"
            );

        }
    );


document
    .getElementById(
        "closeCart"
    )
    .addEventListener(
        "click",
        function () {

            closeModal(
                "cartModal"
            );

        }
    );


document
    .getElementById(
        "closeProfile"
    )
    .addEventListener(
        "click",
        function () {

            closeModal(
                "profileModal"
            );

        }
    );


/* =====================================================
   CLOSE BY OUTSIDE CLICK
===================================================== */

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


/* =====================================================
   START
===================================================== */

showWelcome();

updateCartCount();


});