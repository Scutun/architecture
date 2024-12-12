CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    firstName VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    users_id INTEGER REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Особняк Лесная Тишина') THEN
        INSERT INTO projects (name, description) 
        VALUES (
            'Особняк Лесная Тишина', 
            'Современный двухэтажный дом с элементами эко-дизайна, идеально вписывающийся в окружение хвойного леса. Использованы натуральные материалы: кирпич, дерево, металл. Большие окна обеспечивают максимальное естественное освещение и вид на природу. Просторная терраса с навесом подходит для семейных ужинов на свежем воздухе. Дом оборудован крытой парковкой, что идеально для загородной жизни.'
        );  
    END IF;

    IF NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Резиденция') THEN
        INSERT INTO projects (name, description) 
        VALUES (
            'Резиденция', 
            'Этот двухэтажный дом выполнен в современном стиле с элементами эко-дизайна. Просторная планировка включает в себя несколько зон для отдыха, большую гостиную с панорамными окнами и уютную террасу, идеально подходящую для приема гостей. Использование натуральных материалов, таких как кирпич и дерево, подчеркивает гармонию с природой. Дом расположен в окружении леса, что обеспечивает уединение и комфорт, удаляясь от городской суеты. Просторная крытая парковка для нескольких автомобилей и продуманные архитектурные решения делают этот дом идеальным выбором для загородной жизни.'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Особняк Шале') THEN
        INSERT INTO projects (name, description) 
        VALUES ('Особняк Шале', 'Уютный двухэтажный особняк в стиле шале, окруженный хвойным лесом. Имеет просторную гостиную с камином и сауну.');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Городской Дом') THEN
        INSERT INTO projects (name, description) 
        VALUES (
            'Городской Дом', 
            'Этот стильный и элегантный городской дом отличается продуманной архитектурой и современными инженерными решениями. Сочетание кирпичной и стеклянной отделки придает дому неповторимый облик, идеально вписываясь в городской ландшафт. Просторные помещения, открытые балконы и продуманные зоны для отдыха создают комфортную атмосферу для проживания. Большие окна обеспечивают отличное естественное освещение, а инновационные технологии в сочетании с классическими элементами делают дом не только современным, но и энергоэффективным. Внешний вид дома с лаконичным фасадом, декоративными элементами и современными материалами создает впечатление гармонии и сдержанного респектабельного стиля. Этот дом идеально подходит для комфортного проживания в динамичном городском окружении, предлагая уют и функциональность.'
        );
    END IF;
END $$;


CREATE TABLE IF NOT EXISTS projectPhotos (
    id SERIAL PRIMARY KEY,
    photoPath VARCHAR(150) NOT NULL,
    projects_id INTEGER REFERENCES projects(id)
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM projectPhotos WHERE photoPath = 'lesnaya-tishina-front.jpg' OR photoPath ='lesnaya-tishina-side.jpg') THEN
    INSERT INTO projectPhotos (photoPath, projects_id) VALUES ('lesnaya-tishina-front.jpg', '1'),('lesnaya-tishina-side.jpg', '1');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM projectPhotos WHERE photoPath = 'rezidenciya-front.jpg' OR photoPath ='rezidenciya-side.jpg') THEN
    INSERT INTO projectPhotos (photoPath, projects_id) VALUES ('rezidenciya-front.jpg', '2'),('rezidenciya-side.jpg', '2');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM projectPhotos WHERE photoPath = 'shale-front.jpg' OR photoPath ='shale-side.jpg') THEN
    INSERT INTO projectPhotos (photoPath, projects_id) VALUES ('shale-front.jpg', '3'),('shale-side.jpg', '3');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM projectPhotos WHERE photoPath = 'gorodskoj-dom-front.jpg' OR photoPath ='gorodskoj-dom-side.jpg') THEN
    INSERT INTO projectPhotos (photoPath, projects_id) VALUES ('gorodskoj-dom-front.jpg', '4'),('gorodskoj-dom-side.jpg', '4');
  END IF;
END $$;


CREATE TABLE IF NOT EXISTS architects(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    experience INTEGER NOT NULL,
    information TEXT NOT NULL,
    photo VARCHAR(150) NOT NULL,
    projects_id INTEGER REFERENCES projects(id)
);


DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM architects WHERE email = 'stepan.golub@mail.ru') THEN
        INSERT INTO architects (email, phone, name, surname, experience, information, photo, projects_id)
        VALUES ('stepan.golub@mail.ru', '+79161234567', 'Степан', 'Голубев', 12, 
                'Опытный архитектор, специализирующийся на проектировании городских жилых домов.', 
                'golubev-architect.jpg', 4);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM architects WHERE email = 'anna.arhip@mail.ru') THEN
        INSERT INTO architects (email, phone, name, surname, experience, information, photo, projects_id)
        VALUES ('anna.arhip@mail.ru', '+79261234567', 'Анна', 'Архипова', 8, 
                'Архитектор с опытом работы в области экологически чистых и энергоэффективных зданий.', 
                'arhipova-architect.jpg', 3);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM architects WHERE email = 'sergey.lebed@mail.ru') THEN
        INSERT INTO architects (email, phone, name, surname, experience, information, photo, projects_id)
        VALUES ('sergey.lebed@mail.ru', '+79361234567', 'Сергей', 'Лебедев', 5, 
                'Молодой архитектор, занимающийся проектами в области урбанистики и развития инфраструктуры.', 
                'lebedev-architect.jpg', 1);
    END IF;
END $$;


CREATE TABLE IF NOT EXISTS status(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Создан') THEN
    INSERT INTO status (name) VALUES ('Создан');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Подтвержден') THEN
    INSERT INTO status (name) VALUES ('Подтвержден');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'В работе') THEN
    INSERT INTO status (name) VALUES ('В работе');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Выполнен') THEN
    INSERT INTO status (name) VALUES ('Выполнен');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Отменен') THEN
    INSERT INTO status (name) VALUES ('Отменен');
  END IF;
END $$;


create table if not exists orders(
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    projectType INTEGER REFERENCES projects(id),
    status_id INTEGER default 1 REFERENCES status(id),
    users_id INTEGER REFERENCES users(id)
);
