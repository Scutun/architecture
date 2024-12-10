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
        INSERT INTO projects (name, descrip tion) 
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

    IF NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Особняк Лесная Сказка') THEN
        INSERT INTO projects (name, description) 
        VALUES ('Особняк Лесная Сказка', 'Уютный двухэтажный особняк в стиле шале, окруженный хвойным лесом. Имеет просторную гостиную с камином, гараж и сауну.');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM projects WHERE name = 'Современный Городской Дом') THEN
        INSERT INTO projects (name, description) 
        VALUES (
            'Современный Городской Дом', 
            'Этот стильный и элегантный городской дом отличается продуманной архитектурой и современными инженерными решениями. Сочетание кирпичной и стеклянной отделки придает дому неповторимый облик, идеально вписываясь в городской ландшафт. Просторные помещения, открытые балконы и продуманные зоны для отдыха создают комфортную атмосферу для проживания. Большие окна обеспечивают отличное естественное освещение, а инновационные технологии в сочетании с классическими элементами делают дом не только современным, но и энергоэффективным. Внешний вид дома с лаконичным фасадом, декоративными элементами и современными материалами создает впечатление гармонии и сдержанного респектабельного стиля. Этот дом идеально подходит для комфортного проживания в динамичном городском окружении, предлагая уют и функциональность.'
        );
    END IF;
END $$;


CREATE TABLE IF NOT EXISTS projectPhotos (
    id SERIAL PRIMARY KEY,
    photoPath VARCHAR(150) NOT NULL,
    projects_id INTEGER REFERENCES projects(id)
);


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
    IF NOT EXISTS (SELECT 1 FROM architects WHERE email = 'ivan.petrov@archcompany.ru') THEN
        INSERT INTO architects (email, phone, name, surname, experience, information, photo, projects_id)
        VALUES ('ivan.petrov@archcompany.ru', '+79161234567', 'Степан', 'Голубев', 12, 
                'Опытный архитектор, специализирующийся на проектировании жилых комплексов.', 
                'photos/ivan_petrov.jpg', 2);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM architects WHERE email = 'anna.ivanova@archcompany.ru') THEN
        INSERT INTO architects (email, phone, name, surname, experience, information, photo, projects_id)
        VALUES ('anna.arhip@archcompany.ru', '+79261234567', 'Анна', 'Архипова', 8, 
                'Архитектор с опытом работы в области экологически чистых и энергоэффективных зданий.', 
                'photos/anna_ivanova.jpg', 4);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM architects WHERE email = 'sergey.smirnov@archcompany.ru') THEN
        INSERT INTO architects (email, phone, name, surname, experience, information, photo, projects_id)
        VALUES ('sergey.smirnov@archcompany.ru', '+79361234567', 'Сергей', 'Лебедев', 5, 
                'Молодой архитектор, занимающийся проектами в области урбанистики и развития инфраструктуры.', 
                'photos/sergey_smirnov.jpg', 1);
    END IF;
END $$;


CREATE TABLE IF NOT EXISTS status(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Created') THEN
    INSERT INTO status (name) VALUES ('Created');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Comfirmed') THEN
    INSERT INTO status (name) VALUES ('Comfirmed');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'In progress') THEN
    INSERT INTO status (name) VALUES ('In progress');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Done') THEN
    INSERT INTO status (name) VALUES ('Done');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM status WHERE name = 'Canceled') THEN
    INSERT INTO status (name) VALUES ('Canceled');
  END IF;
END $$;


create table if not exists orders(
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    projectType INTEGER REFERENCES projects(id),
    status_id INTEGER default 1 REFERENCES status(id),
    users_id INTEGER REFERENCES users(id)
);
