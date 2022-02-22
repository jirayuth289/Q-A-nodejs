const express = require('express');
const { questionList, answerList } = require('./data');

const app = express();

app.get('/', (req, res, next) => {
    res.send('Q&A REST API');
})

app.get('/question', (req, res, next) => {
    res.json({ object: 'question', rows: questionList })
});

app.get('/question/:id/answer', (req, res, next) => {
    const questionId = req.params.id ?? undefined;
    if (questionId) {
        const answer = answerList.find(item => item.questionId == questionId);
        res.json({ object: 'answer', answer });
    } else {
        res.status(400).json({ object: 'error', message: 'could not found the requested questionId' });
    }
});

const port = 9000;
app.listen(port, () => {
    console.log('Server is running at:', port);
})