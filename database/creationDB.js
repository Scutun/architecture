const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')


const defaultConfig = {
  user: 'postgres', 
  host: 'localhost', 
  password: 'BD1234', 
  port: 5432, 
}


const sqlFilePath = path.join(__dirname, 'database.sql')
const sqlScript = fs.readFileSync(sqlFilePath, 'utf-8')


const createDatabase = async () => {
  const defaultPool = new Pool({
    ...defaultConfig,
    database: 'postgres', 
  })

  try {
    // Создаем базу данных
    await defaultPool.query('CREATE DATABASE architecture')
    console.log('База данных architecture успешно создана!')
  } catch (error) {
    if (error.code === '42P04') {
      console.log('База данных architecture уже существует.')
    } else {
      console.error('Ошибка при создании базы данных:', error.message)
    }
  } finally {
    await defaultPool.end()
  }
}

// Создаем таблицы
const createTables = async () => {
  const airplanePool = new Pool({
    ...defaultConfig,
    database: 'architecture', // Подключаемся к созданной БД
  })

  try {
    // Выполняем SQL-скрипт для создания таблиц
    await airplanePool.query(sqlScript)
    console.log('Таблицы успешно созданы!')
  } catch (error) {
    console.error('Ошибка при создании таблиц:', error.message)
  } finally {
    await airplanePool.end()
  }
}

// Основная функция
const initDatabase = async () => {
  await createDatabase()
  await createTables()
}

initDatabase()
