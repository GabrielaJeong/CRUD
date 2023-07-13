require('dotenv').config();

const express = require('express');
const { Sequelize } = require('sequelize');
const postRouter = require('./routes/posts.router');

const app = express();
const PORT = 3000;

// Sequelize 연결 설정
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
});

sequelize.authenticate().then(() => {
    console.log('커넥션 완료.');
}).catch((error) => {
    console.error('데이터 베이스 연결불가:', error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postRouter);

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });
