fetch("http://localhost:3000/users")
    .then(response => response.json()) // Преобразуем ответ в JSON
    .then(data => {
        const usersList = document.getElementById("users-list");
        console.log(data); // Работаем с полученными данными

        // Создание списка пользователей
        data.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} (${user.email})`;
            usersList.appendChild(li);
        });
    })
    .catch(error => console.error("Ошибка при получении данных:", error));

const form = document.getElementById("add-user-form");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Отменяем стандартное поведение формы, отменяем отправку формы по умолчанию
    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;

    //Создать объект пользователя
    const newUser = {
        name: nameInput,
        email: emailInput
    };

    fetch("http://localhost:3000/users", {
            method: 'POST', // Указываем метод запроса
            headers: {
                "Content-Type": "application/json" // Указываем тип содержимого
            },
            body: JSON.stringify(newUser) // Преобразуем объект в JSON для отправки
        })

        .then(response => response.json())
        .then(data => {
            console.log("Пользователь добавлен", data);
        })
        .catch(error => console.error("Ошибка при отправке данных:", error));
});

fetch("http://localhost:3000/users/1", {
        method: "PUT", // Указываем метод PUT
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Alice Updated",
            body: "Alice.updated@gmail.com",
            userId: 1
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Данные обновлены:", data);
    })
    .catch(error => {
        console.error("Ошибка при обновлении данных:", error);
    });

fetch("http://localhost:3000/users/1", {
        method: 'DELETE' // Указываем метод DELETE
    })
    .then(() => {
        console.log('Данные удалены');
    })
    .catch(error => {
        console.error('Ошибка при удалении данных:', error);
    });

fetch("http://localhost:3000/users")
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });